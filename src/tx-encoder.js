import Hex from './hex'
import { TransactionDataError } from './errors'
import { TX_FIELDS, TX_TYPES, TX_TYPES_MAP } from './const'
import { splitAddress } from './utils'

export default class TxEncoder {
  constructor (obj) {
    this.obj = obj
    this.data = ''
    this.parsed = null
    this.encode(TX_FIELDS.TYPE)
  }

  encode (fieldName) {
    let data
    const val = this.obj[fieldName]
    switch (fieldName) {
      case TX_FIELDS.ADDRESS:
      case TX_FIELDS.SENDER: {
        const address = splitAddress(val)
        const node = Hex.fixByteOrder(this.pad(address.nodeId, 4))
        const user = Hex.fixByteOrder(this.pad(address.userAccountId, 8))
        data = node + user
        break
      }
      case TX_FIELDS.AMOUNT: {
        data = Hex.fixByteOrder(this.pad(val.toString(16), 16))
        break
      }
      case TX_FIELDS.MESSAGE_ID:
      case TX_FIELDS.NODE_MESSAGE_ID: {
        data = Hex.fixByteOrder(this.pad(val.toString(16), 8))
        break
      }
      case TX_FIELDS.MSG: {
        if (this.obj[TX_FIELDS.TYPE] === TX_TYPES.SEND_ONE) {
          data = this.pad(val, 64)
        }
        else {
          let msg = val
          let len = msg.length
          if (len % 2 !== 0) {
            len += 1
            msg = `0${msg}`
          }
          len /= 2
          data = Hex.fixByteOrder(this.pad(len.toString(16), 4))
          data += msg
        }
        break
      }
      case TX_FIELDS.PUBLIC_KEY: {
        data = this.pad(val, 64)
        break
      }
      case TX_FIELDS.TIME: {
        const date = typeof val === 'object' ? val : new Date(val)
        const time = Math.floor(date.getTime() / 1000)
        data = Hex.fixByteOrder(this.pad(time.toString(16), 8))
        break
      }
      case TX_FIELDS.TYPE: {
        const type = Object.keys(TX_TYPES_MAP).
          find(key => TX_TYPES_MAP[key] === val)
        data = this.pad(type, 2)
        break
      }
      default:
        throw new TransactionDataError('Invalid transaction field type')
    }
    this.parsed = data
    this.data += data

    return this
  }

  get lastEncodedField () {
    return this.parsed
  }

  get encodedData () {
    return this.data
  }

  pad = (field, length) => field.padStart(length, '0')
}
