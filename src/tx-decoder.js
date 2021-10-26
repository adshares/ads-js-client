import BigNumber from 'bignumber.js'
import { TX_FIELDS, TX_TYPES, TX_TYPES_MAP } from './const'
import { TransactionDataError } from './errors'
import Hex from './hex'
import { formatAddress } from './utils'

export default class TxDecoder {
  constructor (data) {
    this.data = data
    this.resp = {}
    this.parsed = null
    this.decode(TX_FIELDS.TYPE)
  }

  getType () {
    return this.resp[TX_FIELDS.TYPE]
  }

  decode (fieldName) {
    let parsed
    switch (fieldName) {
      case TX_FIELDS.ADDRESS:
      case TX_FIELDS.SENDER: {
        this.validateLength(12)
        const node = Hex.fixByteOrder(this.data.substr(0, 4))
        const user = Hex.fixByteOrder(this.data.substr(4, 8))
        parsed = formatAddress(node, user)
        this.data = this.data.substr(12)
        break
      }
      case TX_FIELDS.AMOUNT: {
        this.validateLength(16)
        parsed = Hex.fixByteOrder(this.data.substr(0, 16))
        // parsed = formatMoney(parseInt(parsed, 16) / 100000000000, 11);
        // eslint-disable-next-line new-cap,no-undef
        parsed = new BigNumber(`0x${parsed}`)
        this.data = this.data.substr(16)
        break
      }
      case TX_FIELDS.BLOCK_ID:
      case TX_FIELDS.BLOCK_ID_FROM:
      case TX_FIELDS.BLOCK_ID_TO: {
        this.validateLength(8)
        parsed = Hex.fixByteOrder(this.data.substr(0, 8))
        // parsed = new Date(parseInt(parsed, 16) * 1000);
        this.data = this.data.substr(8)
        break
      }
      case TX_FIELDS.TIME: {
        this.validateLength(8)
        const time = Hex.fixByteOrder(this.data.substr(0, 8))
        parsed = new Date(parseInt(time, 16) * 1000)
        this.data = this.data.substr(8)
        break
      }
      case TX_FIELDS.MSG: {
        const expectedLength = (this.resp[TX_FIELDS.TYPE] === TX_TYPES.SEND_ONE) ? 64 : this.resp[TX_FIELDS.MSG_LEN] * 2
        this.validateLength(expectedLength)
        parsed = this.data
        this.data = ''
        break
      }
      case TX_FIELDS.MSG_LEN: {
        this.validateLength(4)
        parsed = Hex.fixByteOrder(this.data.substr(0, 4))
        parsed = parseInt(parsed, 16)
        this.data = this.data.substr(4)
        break
      }
      case TX_FIELDS.MESSAGE_ID:
      case TX_FIELDS.NODE_MESSAGE_ID: {
        this.validateLength(8)
        parsed = Hex.fixByteOrder(this.data.substr(0, 8))
        parsed = parseInt(parsed, 16)
        this.data = this.data.substr(8)
        break
      }
      case TX_FIELDS.NODE_ID: {
        this.validateLength(4)
        parsed = Hex.fixByteOrder(this.data.substr(0, 4))
        this.data = this.data.substr(4)
        break
      }
      case TX_FIELDS.PUBLIC_KEY:
      case TX_FIELDS.VIP_HASH: {
        this.validateLength(64)
        // intentional lack of reverse - key and hash are not reversed
        parsed = this.data.substr(0, 64)
        this.data = this.data.substr(64)
        break
      }
      case TX_FIELDS.STATUS_ACCOUNT: {
        this.validateLength(4)
        parsed = Hex.fixByteOrder(this.data.substr(0, 4))
        parsed = parseInt(parsed, 16)
        this.data = this.data.substr(4)
        break
      }
      case TX_FIELDS.STATUS_NODE: {
        this.validateLength(8)
        parsed = Hex.fixByteOrder(this.data.substr(0, 8))
        // node status has 32 bits
        // operation ' | 0' changes parsed type to int32
        /* eslint no-bitwise: ["error", { "int32Hint": true }] */
        parsed = parseInt(parsed, 16)
        this.data = this.data.substr(8)
        break
      }
      case TX_FIELDS.TRANSACTION_ID: {
        this.validateLength(16)
        const node = Hex.fixByteOrder(this.data.substr(0, 4))
        const msgId = Hex.fixByteOrder(this.data.substr(4, 8))
        const txOffset = Hex.fixByteOrder(this.data.substr(12, 4))
        parsed = `${node}:${msgId}:${txOffset}`
        this.data = this.data.substr(16)
        break
      }
      case TX_FIELDS.TYPE: {
        this.validateLength(2)
        // intentional lack of reverse - 1 byte does not need to be reversed
        const type = this.data.substr(0, 2)
        parsed = TX_TYPES_MAP[type]
        this.data = this.data.substr(2)
        break
      }
      case TX_FIELDS.WIRE_COUNT: {
        this.validateLength(4)
        const count = Hex.fixByteOrder(this.data.substr(0, 4))
        parsed = parseInt(count, 16)
        this.data = this.data.substr(4)
        break
      }
      case TX_FIELDS.WIRES: {
        const count = this.resp[TX_FIELDS.WIRE_COUNT]
        const expLength = count * 28// 4+8+16(node+user+amount)
        this.validateLength(expLength)

        parsed = []
        for (let i = 0; i < count; i += 1) {
          const node = Hex.fixByteOrder(this.data.substr(0, 4))
          const user = Hex.fixByteOrder(this.data.substr(4, 8))
          const amount = Hex.fixByteOrder(this.data.substr(12, 16))
          const address = formatAddress(node, user)
          parsed.push({
            [TX_FIELDS.ADDRESS]: address,
            // eslint-disable-next-line new-cap,no-undef
            [TX_FIELDS.AMOUNT]: new BigNumber(`0x${amount}`),
          })
          this.data = this.data.substr(28)
        }
        break
      }

      default:
        throw new TransactionDataError('Invalid transaction field type')
    }

    this.resp[fieldName] = parsed
    this.parsed = parsed

    return this
  }

  skip (charCount) {
    this.parsed = this.data.substr(0, charCount)
    this.data = this.data.substr(charCount)
    return this
  }

  get lastDecodedField () {
    return this.parsed
  }

  get decodedData () {
    return this.resp
  }

  validateLength (expectedLength) {
    if (this.data.length < expectedLength) {
      throw new TransactionDataError('Invalid transaction data length')
    }
  }
}
