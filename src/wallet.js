import Hex from './hex'

export default class Wallet {
  constructor (chromeExtensionId, mozillaExtensionId, testnet = false) {
    this.chromeExtensionId = chromeExtensionId
    this.mozillaExtensionId = mozillaExtensionId
    this.testnet = testnet
    this.port = null
    this.initialized = false
    this.queue = []
  }

  #extensionUrl () {
    return typeof InstallTrigger !== 'undefined' ?
      'moz-extension://' + this.mozillaExtensionId :
      'chrome-extension://' + this.chromeExtensionId
  }

  #init () {
    return new Promise((resolve, reject) => {
      const isChromium = typeof window.chrome !== 'undefined'
      if (!isChromium) {
        reject('Your browser is not supported')
      }
      if (this.port) {
        return this.initialized ?
          resolve(this.port) :
          reject('ADS Wallet is not ready yet')
      }

      let channel = new MessageChannel()
      this.port = channel.port1
      let timer

      let onReady = (message) => {
        // when the iframe is ready to receive messages, it will send the string 'ready'
        clearTimeout(timer)
        if (message.data && message.data === 'ready') {
          this.port.removeEventListener('message', onReady)
          const base = this
          this.port.onmessage = (event) => base.#onMessage(event)
          this.initialized = true
          resolve(this.port)
        } else {
          reject('Failed to initialize connection with ADS Wallet')
        }
      }
      this.port.addEventListener('message', onReady)
      this.port.start()

      // create the iframe
      let iframe = document.createElement('iframe')
      iframe.src = this.#extensionUrl() + '/proxy.html'
      iframe.setAttribute('style', 'display:none')
      document.body.appendChild(iframe)
      iframe.addEventListener('error', (event) => {
        clearTimeout(timer)
        reject('ADS Wallet is not installed')
      })
      iframe.addEventListener('load', (event) => {
        // pass the port of message channel to the iframe
        timer = setTimeout(() => reject('ADS Wallet is not installed'), 100)
        iframe.contentWindow.postMessage('init', this.#extensionUrl(), [channel.port2])
      })
    })
  }

  #onMessage (event) {
    if (!event.data || !event.data.id) {
      throw new Error('ADS Wallet: malformed message')
    }
    const item = this.queue.find(r => r.id === event.data.id)
    if (event.data.error) {
      if (!item || !item.reject) {
        throw new Error(`ADS Wallet: cannot reject message ${event.data.id}`)
      }
      item.reject(`${event.data.error.code}: ${event.data.error.message}`)
    } else if (!item || !item.resolve) {
      throw new Error(`ADS Wallet: cannot resolve message ${event.data.id}`)
    }
    item.resolve(event.data.data)
  }

  #sendMessage (type, data, options = {}) {
    return new Promise((resolve, reject) => {
      this.#init().then(() => {
        const id = Hex.uuidv4()
        this.queue.push({
          id,
          resolve,
          reject
        })
        this.port.postMessage({
          id,
          testnet: this.testnet,
          type,
          data,
          options,
        })
      }, reject)
    })
  }

  ping (data) {
    return this.#sendMessage('ping', data)
  }

  getInfo () {
    return this.#sendMessage('info')
  }

  authenticate (nonce, hostname, newTab = false) {
    return this.#sendMessage('authenticate', {
      nonce,
      hostname
    }, { newTab })
  }

  signTransaction (data, hash, publicKey, newTab = false) {
    return this.#sendMessage('sign', {
      data,
      hash,
      publicKey
    }, { newTab })
  }

  broadcast (message) {
    return this.#sendMessage('broadcast', { message })
  }

  sendOne (address, amount, message) {
    return this.#sendMessage('send_one', {
      address,
      amount,
      message
    })
  }
}
