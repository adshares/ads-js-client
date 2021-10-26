import createHmac from 'create-hmac'
import NaCl from 'tweetnacl'
import { sha256 } from 'js-sha256'

export default class Ed25519 {

  static ED25519_CURVE = 'ed25519 seed'
  static HARDENED_OFFSET = 0x80000000
  static pathRegex = new RegExp('^m(\\/[0-9]+\')+$')

  static replaceDerive = val => (val.replace('\'', ''))

  static ckdPriv = ({ key, chainCode }, index) => {
    const indexBuffer = Buffer.allocUnsafe(4)
    indexBuffer.writeUInt32BE(index, 0)
    const data = Buffer.concat([Buffer.alloc(1, 0), key, indexBuffer])
    const I = createHmac('sha512', chainCode).update(data).digest()
    const IL = I.slice(0, 32)
    const IR = I.slice(32)
    return {
      key: IL,
      chainCode: IR,
    }
  }

  static getMasterKeyFromSeed = (seed) => {
    const hmac = createHmac('sha512', Ed25519.ED25519_CURVE)
    const I = hmac.update(Buffer.from(seed, 'hex')).digest()
    const IL = I.slice(0, 32)
    const IR = I.slice(32)
    return {
      key: IL,
      chainCode: IR,
    }
  }

  static getSecretKey = (seed) => {
    return sha256.update(seed).array()
  }

  static getPublicKey = (secretKey, withZeroByte = true) => {
    const { publicKey } = NaCl.sign.keyPair.fromSeed(secretKey)
    const zero = Buffer.alloc(1, 0)
    return withZeroByte ?
      Buffer.concat([zero, Buffer.from(publicKey)]) :
      Buffer.from(publicKey)
  }

  static isValidPath = (path) => {
    if (!Ed25519.pathRegex.test(path)) {
      return false
    }
    return !path.split('/').slice(1).map(Ed25519.replaceDerive).some(isNaN)
  }

  static derivePath = (path, seed) => {
    if (!Ed25519.isValidPath(path)) {
      throw new Error('Invalid derivation path')
    }
    const { key, chainCode } = Ed25519.getMasterKeyFromSeed(seed)
    const segments = path.split('/').
      slice(1).
      map(Ed25519.replaceDerive).
      map(el => parseInt(el, 10))
    return segments.reduce(
      (parentKeys, segment) => Ed25519.ckdPriv(parentKeys,
        segment + Ed25519.HARDENED_OFFSET),
      { key, chainCode },
    )
  }
}

exports.Ed25519 = Ed25519
