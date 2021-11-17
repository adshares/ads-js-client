import RPC from 'jsonrpc-lite/jsonrpc'
import Ads from '@adshares/ads'
import { RpcError } from './errors'

const REQUESTS = {
  CREATE_FREE_ACCOUNT: 'create_free_account',
  GET_GATEWAYS: 'get_gateways',
  GET_GATEWAY_FEE: 'get_gateway_fee',
  GET_INFO: 'get_info',
  GET_TIMESTAMP: 'get_timestamp',
  PING: 'ping'
}

export default class AdsClient {
  static MAINNET_RPC_HOST = 'https://rpc.adshares.net/'
  static TESTNET_RPC_HOST = 'https://rpc.e11.click/'

  constructor (testnet = false) {
    this.host = testnet ? AdsClient.TESTNET_RPC_HOST : AdsClient.MAINNET_RPC_HOST
  }

  static uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : ((r & 0x3) | 0x8)
      return v.toString(16)
    })
  }

  send (data) {
    return fetch(this.host, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  request (method, params) {
    return this.send(RPC.request(AdsClient.uuidv4(), method, params))
      .then(response => response.json(), (error) => {
        throw new RpcError('RPC Server Communication Error', error)
      })
      .then((response) => {
        if (response.error) {
          throw new RpcError(
            response.error.data
              ? `${response.error.message} - ${response.error.data}.`
              : response.error.message,
            response.error
          )
        }
        return response.result
      }, (error) => {
        throw new RpcError('RPC Server Malformed Data Error', error)
      })
  }

  getInfo () {
    return this.request(REQUESTS.GET_INFO)
      .then((response) => {
        if (!response || !response.info) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.info
      })
  }

  ping (data) {
    return this.request(REQUESTS.PING, { data })
      .then((response) => {
        if (!response || !response.data) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.data
      })
  }

  getTimestamp () {
    return this.request(REQUESTS.GET_TIMESTAMP)
      .then((response) => {
        if (!response || !response.timestamp) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.timestamp
      })
  }

  getAccount (address) {
    return this.request(Ads.Tx.TX_TYPES.GET_ACCOUNT, {
      address
    })
      .then((response) => {
        if (!response || !response.account) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return {
          address: response.account.address,
          balance: response.account.balance,
          hash: response.account.hash,
          messageId: parseInt(response.account.msid, 10),
          publicKey: response.account.public_key,
          status: parseInt(response.account.status, 10)
        }
      })
  }

  findAccounts (publicKey) {
    return this.request(Ads.Tx.TX_TYPES.FIND_ACCOUNTS, {
      public_key: publicKey
    })
      .then((response) => {
        if (!response || !response.accounts) {
          throw new RpcError('RPC Server Response Error')
        }
        return response.accounts.map(account => ({
          address: account.address,
          balance: account.balance,
          hash: account.hash,
          messageId: parseInt(account.msid, 10),
          publicKey: account.public_key,
          status: parseInt(account.status, 10)
        }))
      })
  }

  getNodes () {
    return this.request(Ads.Tx.TX_TYPES.GET_BLOCK, {
      block: ''
    })
      .then((response) => {
        if (!response || !response.block || !response.block.nodes) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.block.nodes.map(node => ({
          id: node.id,
          ipv4: node.ipv4,
          port: parseInt(node.port, 10),
          status: parseInt(node.status, 10)
        }))
          .filter(node => node.ipv4 !== '0.0.0.0')
      })
  }

  getNode (nodeId) {
    return this.getNodes()
      .then(nodes => nodes.find(node => node.id === nodeId))
  }

  createFreeAccount (publicKey, confirm) {
    return this.request(REQUESTS.CREATE_FREE_ACCOUNT, {
      public_key: publicKey,
      confirm
    })
      .then((response) => {
        if (!response || !response.new_account || !response.new_account.address) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.new_account.address
      })
  }

  sendTransaction (data, signature, host) {
    const sender = Ads.Tx.decodeSender(data)
    return this.getNode(Ads.splitAddress(sender).nodeId)
      .then(node => {
        return this.request(Ads.Tx.TX_TYPES.SEND_AGAIN, {
          data,
          signature,
          _host: node.ipv4
        })
          .then((response) => {
            if (!response || !response.tx) {
              throw new RpcError('RPC Server Response Error', response)
            }
            return {
              id: response.tx.id,
              fee: response.tx.fee,
              accountHash: response.tx.account_hashout,
              accountMessageId: response.tx.account_msid
            }
          })
      })
  }

  getGateways () {
    return this.request(REQUESTS.GET_GATEWAYS)
      .then((response) => {
        if (!response || !response.gateways) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.gateways
      })
  }

  getGatewayFee (gatewayCode, amount, address) {
    return this.request(REQUESTS.GET_GATEWAY_FEE, {
      code: gatewayCode,
      amount: parseInt(amount, 10),
      address
    })
      .then((response) => {
        if (!response || !response.fee) {
          throw new RpcError('RPC Server Response Error', response)
        }
        return response.fee
      })
  }
}
