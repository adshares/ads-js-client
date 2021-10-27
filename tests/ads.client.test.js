const Ads = require('../dist/index.cjs')

beforeEach(() => {
  fetch.resetMocks()
})

rpcResponse = (data) => JSON.stringify({ id: '1', jsonrpc: '2.0', result: { ...data } })

test('get timestamp', async () => {
  fetch.mockResponseOnce(rpcResponse({ 'timestamp': 1635334957 }))
  const client = new Ads.Client()
  const response = await client.getTimestamp()
  expect(response).toBe(1635334957)
})

test('get timestamp - invalid reposnse', async () => {
  fetch.mockResponseOnce(rpcResponse({ foo: 123123123 }))
  const client = new Ads.Client()
  await expect(client.getTimestamp()).rejects.toThrow('RPC Server Response Error')
})
