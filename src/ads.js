/* eslint-disable no-bitwise */
import NaCl from 'tweetnacl'
import BigNumber from 'bignumber.js'
import Hex from './hex'
import { TransactionDataError } from './errors'
import Ed25519 from './ed25519'
import TxEncoder from './tx-encoder'
import { TX_FIELDS, TX_TYPES } from './const'
import TxDecoder from './tx-decoder'
import {
  addressChecksum,
  compareAddresses,
  compareAddressesByNode,
  formatAddress,
  formatNumber,
  splitAddress,
  validateAddress,
  validateEthAddress,
  validateKey,
} from './utils'

export default class Ads {

  static BLOCK_LENGTH = 512
  static DIVIDEND_LENGTH = 2048
  static TOTAL_SUPPLY = new BigNumber('3875820600000000000')
  static DERIVATION_PATH = 'm/44\'/311\'/'
  static TX_MIN_FEE = 10000
  static TX_BROADCAST_FEE = 1000
  static TX_CHANGE_KEY_FEE = 10000000
  static TX_LOCAL_TRANSFER_FEE = 0.0005
  static TX_REMOTE_TRANSFER_FEE = 0.0005

  static addressChecksum = addressChecksum
  static compareAddresses = compareAddresses
  static compareAddressesByNode = compareAddressesByNode
  static formatAddress = formatAddress
  static splitAddress = splitAddress
  static validateAddress = validateAddress
  static validateEthAddress = validateEthAddress
  static validateKey = validateKey

  /**
   * Returns public key derived from secret key.
   *
   * @param secretKey secret key (64 hexadecimal characters)
   * @returns {string} public key (64 hexadecimal characters)
   */
  static getPublicKey (secretKey) {
    return Hex.byteToHex(
      Ed25519.getPublicKey(Hex.hexToByte(secretKey), false),
    ).toUpperCase()
  }

  /**
   * Returns secret key derived from seed phrase.
   *
   * @param seed seed phrase
   * @returns {string} secret key (64 hexadecimal characters)
   */
  static getSecretKey (seed) {
    return Hex.byteToHex(
      Ed25519.getSecretKey(seed),
    ).toUpperCase()
  }

  /**
   * Signs data with a secret key.
   *
   * @param secretKey secret key 32 bytes
   * @param publicKey public key 32 bytes
   * @param data data (hexadecimal characters); in case of transaction: `tx.account_hashin` + `tx.data`
   * @returns {string} signature 64 bytes
   */
  static sign (secretKey, publicKey, data) {
    return Hex.byteToHex(NaCl.sign.detached(
      Hex.hexToByte(data),
      Hex.hexToByte(secretKey + publicKey),
    )).toUpperCase()
  }

  /**
   * Validates signature.
   *
   * @param signature (128 hexadecimal characters)
   * @param publicKey (64 hexadecimal characters)
   * @param data data (hexadecimal characters)
   * @returns {boolean}
   */
  static validateSignature (signature, publicKey, data) {
    return NaCl.sign.detached.verify(
      Hex.hexToByte(data),
      Hex.hexToByte(signature),
      Hex.hexToByte(publicKey),
    )
  }

  /**
   * Encodes command data.
   *
   * @param command command data object
   * @returns {string}
   */
  static encodeCommand (command) {
    const encoder = new TxEncoder(command)

    switch (command[TX_FIELDS.TYPE]) {
      case TX_TYPES.BROADCAST:
        encoder.encode(TX_FIELDS.SENDER).
          encode(TX_FIELDS.MESSAGE_ID).
          encode(TX_FIELDS.TIME).
          encode(TX_FIELDS.MSG)
        break

      case TX_TYPES.CHANGE_ACCOUNT_KEY:
        encoder.encode(TX_FIELDS.SENDER).
          encode(TX_FIELDS.MESSAGE_ID).
          encode(TX_FIELDS.TIME).
          encode(TX_FIELDS.PUBLIC_KEY)
        break

      case TX_TYPES.SEND_ONE:
        encoder.encode(TX_FIELDS.SENDER).
          encode(TX_FIELDS.MESSAGE_ID).
          encode(TX_FIELDS.TIME).
          encode(TX_FIELDS.ADDRESS).
          encode(TX_FIELDS.AMOUNT).
          encode(TX_FIELDS.MSG)
        break

      default:
        throw new TransactionDataError('Unknown type of transaction')
    }

    return encoder.encodedData.toUpperCase()
  }

  /**
   * Decodes command data.
   *
   * @param data string encoded command (hexadecimal characters)
   * @returns {object}
   */
  static decodeCommand (data) {
    const decoder = new TxDecoder(data)
    const type = decoder.getType()

    switch (type) {
      case TX_TYPES.BROADCAST:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.MSG_LEN).
          decode(TX_FIELDS.MSG)
        break

      case TX_TYPES.CHANGE_ACCOUNT_KEY:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.PUBLIC_KEY)
        break

      case TX_TYPES.CHANGE_NODE_KEY:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.NODE_ID).
          decode(TX_FIELDS.PUBLIC_KEY)
        break

      case TX_TYPES.CREATE_ACCOUNT:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.NODE_ID).
          skip(8).
          decode(TX_FIELDS.PUBLIC_KEY)
        break

      case TX_TYPES.CREATE_NODE:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.GET_ACCOUNT:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.ADDRESS).
          decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.GET_ACCOUNTS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.BLOCK_ID)// previous block id
          .decode(TX_FIELDS.NODE_ID)
        break

      case TX_TYPES.GET_BLOCK:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.BLOCK_ID)// previous block id
          .decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.GET_BLOCKS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.BLOCK_ID_FROM).
          decode(TX_FIELDS.BLOCK_ID_TO)
        break

      case TX_TYPES.GET_BROADCAST:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.BLOCK_ID).
          decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.GET_LOG:
        decoder.decode(TX_FIELDS.SENDER).decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.GET_MESSAGE:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.BLOCK_ID).
          decode(TX_FIELDS.NODE_ID).
          decode(TX_FIELDS.NODE_MESSAGE_ID)
        break

      case TX_TYPES.GET_MESSAGE_LIST:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.BLOCK_ID)
        break

      case TX_TYPES.GET_SIGNATURES:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.BLOCK_ID)
        break

      case TX_TYPES.GET_TRANSACTION:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.TRANSACTION_ID)
        break

      case TX_TYPES.GET_VIPKEYS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.VIP_HASH)
        break

      case TX_TYPES.LOG_ACCOUNT:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME)
        break

      case TX_TYPES.RETRIEVE_FUNDS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.ADDRESS)
        break

      case TX_TYPES.SEND_MANY:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.WIRE_COUNT).
          decode(TX_FIELDS.WIRES)
        break

      case TX_TYPES.SEND_ONE:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.ADDRESS).
          decode(TX_FIELDS.AMOUNT).
          decode(TX_FIELDS.MSG)
        break

      case TX_TYPES.SET_ACCOUNT_STATUS:
      case TX_TYPES.UNSET_ACCOUNT_STATUS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.ADDRESS).
          decode(TX_FIELDS.STATUS_ACCOUNT)
        break

      case TX_TYPES.SET_NODE_STATUS:
      case TX_TYPES.UNSET_NODE_STATUS:
        decoder.decode(TX_FIELDS.SENDER).
          decode(TX_FIELDS.MESSAGE_ID).
          decode(TX_FIELDS.TIME).
          decode(TX_FIELDS.NODE_ID).
          decode(TX_FIELDS.STATUS_NODE)
        break

      case TX_TYPES.GET_FIELDS:// function `get_fields` does not return `tx.data`
        throw new TransactionDataError('Transaction is not parsable')

      default:
        throw new TransactionDataError('Unknown type of transaction')
    }

    return decoder.decodedData
  }

  /**
   * Decode hex message.
   *
   * @param value message in hex
   * @param onlyPrintable decode only if printable
   * @returns {string}
   */
  static decodeMessage (value, onlyPrintable = true) {
    let hex = value === null || typeof value === 'undefined' ? '0' : value
    hex = hex.toString().trim().replace(/^0x/, '') // force conversion
    let str = ''
    for (let i = 0; i < hex.length; i += 2) {
      const chars = hex.substr(i, 2)
      const code = parseInt(chars, 16)
      if (code !== 0) {
        if (onlyPrintable && (code < 32 || code >= 127)) {
          str = '--- non-printable ---'
          break
        }
        str += String.fromCharCode(code)
      }
    }
    return str.length > 0 ? str : '--- empty ---'
  }

  /**
   * Formats ADS amount
   *
   * @param amount
   * @param precision
   * @param trim
   * @param decimal
   * @param thousand
   * @returns {*}
   */
  static formatAdsMoney (amount, precision = 4, trim = false, decimal = '.', thousand = ',') {
    return formatNumber(amount, precision, trim, decimal, thousand)
  }

  /**
   * Formats ADS amount in clicks
   *
   * @param value
   * @param precision
   * @param trim
   * @param decimal
   * @param thousand
   * @returns {string}
   */
  static formatClickMoney (value, precision = 11, trim = false, decimal = '.', thousand = ',') {
    const p = Math.max(precision, 2)
    let v = value

    v = (`${v || '0'}`).padStart(11, '0')
    const l = v.length - 11
    const a = v.substr(0, l) || '0'
    const j = a.length > 3 ? a.length % 3 : 0
    let b = Math.round(parseInt((`${v}0`).substr(l, p + 1), 10) / 10).
      toString().
      padStart(p, '0')

    if (trim) {
      b = b.replace(/([0-9]{2})0+$/, '$1')
    }

    return (
      (j ? a.substr(0, j) + thousand : '') +
      a.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousand}`) +
      decimal +
      b
    )
  }

  /**
   * Converts ADS amount in clicks from string to number
   *
   * @param value
   * @returns {BigNumber|null}
   */
  static strToClicks (value) {
    const matches = value.match(/^([0-9]*)[.,]?([0-9]{0,11})[0-9]*$/)
    return matches ? new BigNumber(matches[1] + matches[2].padEnd(11, '0')) : null
  }

  /**
   * Calculates transaction fee.
   *
   * @param command command data object
   * @returns {number}
   */
  static calculateFee (command) {
    const encoder = new TxEncoder(command)
    let length
    let fee = 0
    switch (command[TX_FIELDS.TYPE]) {
      case TX_TYPES.BROADCAST:
        length = (encoder.encode(TX_FIELDS.MSG).lastEncodedField.length / 2) - 2
        fee = Ads.TX_MIN_FEE
        if (length > 32) {
          fee += (length - 32) * Ads.TX_BROADCAST_FEE
        }
        break

      case TX_TYPES.CHANGE_ACCOUNT_KEY:
        fee = Ads.TX_CHANGE_KEY_FEE
        break

      case TX_TYPES.SEND_ONE:
        fee = command[TX_FIELDS.AMOUNT] * Ads.TX_LOCAL_TRANSFER_FEE
        if (!Ads.compareAddressesByNode(command[TX_FIELDS.SENDER],
          command[TX_FIELDS.ADDRESS])) {
          fee += command[TX_FIELDS.AMOUNT] * Ads.TX_REMOTE_TRANSFER_FEE
        }
        fee = Math.floor(fee)
        break
      default:
        break
    }

    return Math.max(Ads.TX_MIN_FEE, fee)
  }

  /**
   * Calculates transaction total amount.
   *
   * @param command command data object
   * @returns {number}
   */
  static calculateChargedAmount (command) {
    return Ads.calculateFee(command) + parseInt(command[TX_FIELDS.AMOUNT], 10)
  }

  /**
   * Calculates transaction received amount.
   *
   * @param externalFee external fee in clicks
   * @param command command data object
   * @returns {number}
   */
  static calculateReceivedAmount (externalFee, command) {
    return Math.max(0, parseInt(command[TX_FIELDS.AMOUNT], 10) - parseInt(externalFee, 10))
  }
}

exports.Ads = Ads
exports.TX_TYPES = TX_TYPES
exports.TX_FIELDS = TX_FIELDS
