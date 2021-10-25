/* eslint-disable no-proto */
export function TransactionDataError (message) {
  this.constructor.prototype.__proto__ = Error.prototype
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  }
  this.name = this.constructor.name
  this.message = message
}

export function RpcError (message, data) {
  this.constructor.prototype.__proto__ = Error.prototype
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  }
  this.name = this.constructor.name
  this.message = message
  this.data = data
}
