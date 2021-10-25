/* eslint-disable no-plusplus */

class Hex {

  /**
   * @param byteArray Uint8Array
   * @returns {*}
   */
  static byteToHex (byteArray) {
    // parseInt is needed for eliminating invalid number of arguments warning
    // for toString function
    return byteArray.reduce(
      (output, elem) => (output +
        (`0${parseInt(elem, 10).toString(16)}`).slice(-2)),
      '',
    )
  }

  /**
   * @param str string
   * @returns {Uint8Array}
   */
  static hexToByte (str) {
    if (!str) {
      return new Uint8Array(0)
    }

    const a = []
    for (let i = 0, len = str.length; i < len; i += 2) {
      a.push(parseInt(str.substr(i, 2), 16))
    }

    return new Uint8Array(a)
  }

  /**
   * @param str
   * @returns {string}
   */
  static stringToHex (str) {
    const result = []
    let hex
    for (let i = 0; i < str.length; i++) {
      hex = Number(str.charCodeAt(i)).toString(16).padStart(2, '0')
      result.push(hex)
    }

    return result.join('')
  }

  /**
   * @param str string
   * @returns {string}
   */
  static sanitizeHex (str) {
    return str.replace(/^0x/, '').toUpperCase()
  }

  /**
   * @param str string
   * @returns {string}
   */
  static sanitize0xHex (str) {
    return `0x${this.sanitizeHex(str)}`
  }

  /**
   * Changes hex string from little-endian to big-endian.
   *
   * @param {string} data
   * @returns {string | *}
   */
  static fixByteOrder (data) {
    // match - splits string to array of 2 characters
    // reverse - changes order of chunks
    // join - combines chunks to string
    return data.match(/.{1,2}/g).reverse().join('')
  }

  /**
   * Generate pseudo UUID v4.
   *
   * @returns {string}
   */
  static uuidv4 () {
    /*eslint no-bitwise: ["error", { "allow": ["|", "&" ] }]*/
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : ((r & 0x3) | 0x8)
      return v.toString(16)
    })
  }
}

export default Hex
