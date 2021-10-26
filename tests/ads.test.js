const { Ads } = require('../dist')

test('parse broadcast', () => {
  // {"run":"broadcast","message":"00"}
  const data = '0301000000000001000000A1679B5B010000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('broadcast')
  expect(parsedData[Ads.TX_FIELDS.MSG]).toBe('00')
  expect(parsedData[Ads.TX_FIELDS.MSG_LEN]).toBe(1)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536911265 * 1000))
})

test('parse change_account_key', () => {
  // {"run":"change_account_key",
  // "public_key":"EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E",
  // "confirm":
  // "1F0571D30661FB1D50BE0D61A0A0E97BAEFF8C030CD0269ADE49438A4AD4CF897
  // 367E21B100C694F220D922200B3AB852A377D8857A64C36CB1569311760F303"}
  const data = '090100000000000500000077CE485BEAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('change_account_key')
  expect(parsedData[Ads.TX_FIELDS.PUBLIC_KEY]).toBe(
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
  )
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(5)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531498103 * 1000))
})

test('parse change_node_key', () => {
  // {"run":"change_node_key",
  // "public_key":"EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E"}
  const data = '0A010000000000010000005CC2485B0000EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('change_node_key')
  expect(parsedData[Ads.TX_FIELDS.PUBLIC_KEY]).toBe(
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
  )
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531495004 * 1000))
})

test('parse create_account', () => {
  // {"run":"create_account"}
  const data = '0601000000000004000000AB989B5B'
    + '010000000000A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('create_account')
  expect(parsedData[Ads.TX_FIELDS.PUBLIC_KEY]).toBe(
    'A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363',
  )
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(4)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536923819 * 1000))
})

test('parse create_node', () => {
  // {"run":"create_node"}
  const data = '070100000000000100000047C9485B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('create_node')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531496775 * 1000))
})

test('parse get_account', () => {
  // {"run":"get_account","address":"0001-00000000-9B6F"}
  const data = '100100000000000100010000001E6A9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_account')
  expect(parsedData[Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536911902 * 1000))
})

test('parse get_accounts', () => {
  // {"run":"get_accounts","node":2}
  const data = '180100000000009EA49B5B60A49B5B0200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_accounts')
  expect(parsedData[Ads.TX_FIELDS.NODE_ID]).toBe('0002')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('5B9BA460')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536926878 * 1000))
})

test('parse get_block', () => {
  // {"run":"get_block"}
  const data = '1701000000000000AC9B5B27AC9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_block')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('5B9BAC00')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536928807 * 1000))
})

test('parse get_blocks', () => {
  // {"run":"get_blocks"}
  const data = '130100000000003AAD9B5B20AD9B5B00000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_blocks')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID_FROM]).toBe('5B9BAD20')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID_TO]).toBe('00000000')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536929082 * 1000))
})

test('parse get_broadcast', () => {
  // {"run":"get_broadcast"}
  const data = '12010000000000000000006FC39B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_broadcast')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('00000000')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536934767 * 1000))
})

test('parse get_fields', () => {
  // {"run":"get_fields","type":"get_broadcast"}
  const data = '1B'
  expect(() => {
    Ads.decodeCommand(data)
  }).toThrow('Transaction is not parsable')
})

test('parse get_log', () => {
  // {"run":"get_log"}
  const data = '11010000000000E3C59B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_log')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536935395 * 1000))
})

test('parse get_message', () => {
  // {"run":"get_message", "block":"5B4893C0", "node":2, "node_msid":73}
  const data = '1A020001000000E693485BC093485B020049000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_message')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('5B4893C0')
  expect(parsedData[Ads.TX_FIELDS.NODE_ID]).toBe('0002')
  expect(parsedData[Ads.TX_FIELDS.NODE_MESSAGE_ID]).toBe(73)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531483110 * 1000))
})

test('parse get_message_list', () => {
  // {"run":"get_message_list", "block":"5B4893C0"}
  const data = '19020001000000E693485BC093485B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_message_list')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('5B4893C0')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531483110 * 1000))
})

test('parse get_signatures', () => {
  // {"run":"get_signatures","block":"5B9BBF20"}
  const data = '1601000000000005CF9B5B20BF9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_signatures')
  expect(parsedData[Ads.TX_FIELDS.BLOCK_ID]).toBe('5B9BBF20')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536937733 * 1000))
})

test('parse get_transaction', () => {
  // {"run":"get_transaction", "txid":"0001:00000007:0002"}
  const data = '140100000000009253475B0100070000000200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_transaction')
  expect(parsedData[Ads.TX_FIELDS.TRANSACTION_ID]).toBe('0001:00000007:0002')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531401106 * 1000))
})

test('parse get_vipkeys', () => {
  // {"run":"get_vipkeys",
  // "viphash":"2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507"}
  const data = '150100000000008ECD9B5B2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('get_vipkeys')
  expect(parsedData[Ads.TX_FIELDS.VIP_HASH]).toBe('2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1536937358 * 1000))
})

test('parse log_account', () => {
  // {"run":"log_account"}
  const data = '0F02000100000001000000D99E485B000000000000000000000000000000000000000000000000000000000000000000'
    + '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    + '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('log_account')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531485913 * 1000))
})

test('parse retrieve_funds', () => {
  // {"run":"retrieve_funds", "address":"0002-00000001-659C"}
  const data = '0801000000000002000000BBC4485B020001000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('retrieve_funds')
  expect(parsedData[Ads.TX_FIELDS.ADDRESS]).toBe('0002-00000001-659C')
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(2)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531495611 * 1000))
})

test('parse send_many', () => {
  // {"run":"send_many", "wires":{"0001-00000001-8B4E":"100","0001-00000002-BB2D":"100"}}
  const data = '050100000000000400000069C0485B020001000100000000A0724E1809000001000200000000A0724E18090000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('send_many')
  expect(parsedData[Ads.TX_FIELDS.WIRE_COUNT]).toBe(2)

  const wires = parsedData[Ads.TX_FIELDS.WIRES]
  expect(wires[0][Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  expect(wires[0][Ads.TX_FIELDS.AMOUNT].toNumber()).toEqual(100 * 100000000000)
  expect(wires[1][Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000002-BB2D')
  expect(wires[1][Ads.TX_FIELDS.AMOUNT].toNumber()).toEqual(100 * 100000000000)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(4)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1531494505 * 1000))
})

test('parse send_one', () => {
  // {"run":"send_one","address":"0001-00000001-8B4E","amount":"100000"}
  const data = '04010000000000010000006F0A645B0100010000000000C16FF2862300000'
    + '0000000000000000000000000000000000000000000000000000000000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('send_one')
  expect(parsedData[Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  expect(parsedData[Ads.TX_FIELDS.AMOUNT].toNumber()).toEqual(10000000000000000)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1533282927 * 1000))
})

test('parse set_account_status', () => {
  // {"run":"set_account_status", "address":"0001-00000000-9B6F", "status":"2"}
  const data = '0B01000000000001000000A1B2285B0100000000000200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('set_account_status')
  expect(parsedData[Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.STATUS_ACCOUNT]).toBe(2)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1529393825 * 1000))
})

test('parse set_node_status', () => {
  // {"run":"set_node_status", "node":"14", "status":"2147483648"}
  const data = '0C0100000000007900000084B4285B0E0000000080'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('set_node_status')
  expect(parsedData[Ads.TX_FIELDS.NODE_ID]).toBe('000E')
  expect(parsedData[Ads.TX_FIELDS.STATUS_NODE]).toBe(2147483648)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(121)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1529394308 * 1000))
})

test('parse unset_account_status', () => {
  // {"run":"unset_account_status", "address":"0001-00000000-9B6F", "status":"32"}
  const data = '0D0100000000000A000000A4B2285B0100000000002000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('unset_account_status')
  expect(parsedData[Ads.TX_FIELDS.ADDRESS]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.STATUS_ACCOUNT]).toBe(32)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(10)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1529393828 * 1000))
})

test('parse unset_node_status', () => {
  // {"run":"unset_node_status", "node":"3", "status":"2"}
  const data = '0E01000100000025000000C7B4285B030002000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[Ads.TX_FIELDS.TYPE]).toBe('unset_node_status')
  expect(parsedData[Ads.TX_FIELDS.NODE_ID]).toBe('0003')
  expect(parsedData[Ads.TX_FIELDS.STATUS_NODE]).toBe(2)
  // sender
  expect(parsedData[Ads.TX_FIELDS.SENDER]).toBe('0001-00000001-8B4E')
  expect(parsedData[Ads.TX_FIELDS.MESSAGE_ID]).toBe(37)
  expect(parsedData[Ads.TX_FIELDS.TIME]).toEqual(new Date(1529394375 * 1000))
})

test('error `Unknown type`', () => {
  const data = 'FF00'
  expect(() => {
    Ads.decodeCommand(data)
  }).toThrow('Unknown type')
})

test('error `Invalid transaction data length`', () => {
  const data = '0E0100010000'
  expect(() => {
    Ads.decodeCommand(data)
  }).toThrow('Invalid transaction data length')
})

test('sign empty string', () => {
  const publicKey = '47B6D484EA5D40716720FE448018BCC08C53FEA96FB8749FE5BFFCB7CF57B112'
  const secretKey = '9F7D754820842E3D141FA7BCF6A3BA731EFE77914AC67E00D1D223E7ADB6FA48'
  const data = ''
  const expSignature = 'bb4946aec4c1be7e1bcb11b27b3cfb13b3234417fcdc96356ceb910c233423b5692b93196471c75d1bdb9e8fe2bcad184e1a0b37976bdf228ff5a60d5173f80b'

  expect(Ads.sign(secretKey, publicKey, data)).toBe(expSignature)
})

test('sign transaction', () => {
  // secret key is concatenation of private and public key
  const publicKey = 'A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363'
  const secretKey = 'BB3425F914CA9F661CA6F3B908E07092B5AFB7F2FDAE2E94EDE12C83207CA743'
  const hashin = '71BD0607F5B874B2B4ECC442A76D0FD7544FE12CD32BDDB6BA7F3D5755C40A1A'
  const txData = '04010000000000010000000100000001000000000000E87648170000000000000000000000000000000000000000000000000000000000000000000000'
  const data = hashin + txData
  const expSignature = 'f9c975d060d84ebca286e7c9e4aa68f0b77d005b98067c17e00aa93a102d48bb49a20233a37cbf3ba8bb1a8a8b94fc4832bc286b59ee66aa0ba01e2d3aa8cf0a'

  expect(Ads.sign(secretKey, publicKey, data)).toBe(expSignature)
})

test('invalid key length', () => {
  const secretKey = ''
  const publicKey = ''
  const data = ''
  expect(() => {
    Ads.sign(secretKey, publicKey, data)
  }).toThrow()
})

test('create private key from seed', () => {
  const seed = 'a'
  const expSecretKey = 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
  const expPublicKey = 'eae1c8793b5597c4b3f490e76ac31172c439690f8ee14142bb851a61f9a49f0e'
  const expSg = '1f0571d30661fb1d50be0d61a0a0e97baeff8c030cd0269ade49438a4ad4cf897367e21b100c694f220d922200b3ab852a377d8857a64c36cb1569311760f303'

  const secretKey = Ads.getSecretKey(seed)
  const publicKey = Ads.getPublicKey(secretKey)
  const sg = Ads.sign(secretKey, publicKey, '')

  expect(secretKey).toBe(expSecretKey)
  expect(publicKey).toBe(expPublicKey)
  expect(expSg).toBe(sg)
})

test('validate signature', () => {
  expect(Ads.validateSignature(
    '1F0571D30661FB1D50BE0D61A0A0E97BAEFF8C030CD0269ADE49438A4AD4CF897367E21B100C694F220D922200B3AB852A377D8857A64C36CB1569311760F303',
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
    '',
  )).toBe(true)
  expect(Ads.validateSignature(
    'A21AB5345F0604940A92C8BE74E13ED832E25A59B03D87D9E77B036571EE22B15D58FE51B09A2A54DDD22B3F92EBE65E58840B1CB2711A3623F9C008902B860C',
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
    '666F6F',
  )).toBe(true)
  expect(Ads.validateSignature(
    'a21ab5345f0604940a92c8be74e13ed832e25a59b03d87d9e77b036571ee22b15d58fe51b09a2a54ddd22b3f92ebe65e58840b1cb2711a3623f9c008902b860c',
    'eae1c8793b5597c4b3f490e76ac31172c439690f8ee14142bb851a61f9a49f0e',
    '666f6f',
  )).toBe(true)
  expect(Ads.validateSignature(
    '1F0571D30661FB1D50BE0D61A0A0E97BAEFF8C030CD0269ADE49438A4AD4CF897367E21B100C694F220D922200B3AB852A377D8857A64C36CB1569311760F303',
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
    '666F6F',
  )).toBe(false)
  expect(Ads.validateSignature(
    'A21AB5345F0604940A92C8BE74E13ED832E25A59B03D87D9E77B036571EE22B15D58FE51B09A2A54DDD22B3F92EBE65E58840B1CB2711A3623F9C008902B860C',
    'A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363',
    '666F6F',
  )).toBe(false)
})

test('address checksum', () => {
  expect(Ads.addressChecksum('0000', '00000000')).toBe('313E')
  expect(Ads.addressChecksum('0001', '00000001')).toBe('8B4E')
  expect(Ads.addressChecksum('0005', '0000047E')).toBe('41F4')
  expect(Ads.addressChecksum('00ab', '00000a7e')).toBe('8737')
  expect(Ads.addressChecksum('0xFFFF', '0xFFFFFFFF')).toBe('A6E1')
})

test('compare addresses', () => {
  expect(Ads.compareAddresses('0005-0000047E-41F4', '0005-0000047E-41F4')).toBe(true)
  expect(Ads.compareAddresses('0005-0000047E-41F4', '0005-0000047e-41f4')).toBe(true)
  expect(Ads.compareAddresses('0005-0000047E-41F4', '0005-0000047E-XXXX')).toBe(true)
  expect(Ads.compareAddresses('0005-0000047E-XXXX', '0005-0000047E-XXXX')).toBe(true)
  expect(Ads.compareAddresses('0005-0000047E-41F4', '0005-0000047E-2222')).toBe(true)
  expect(Ads.compareAddresses('0005-0000047E-41F4', '0005-00000001-XXXX')).toBe(false)
  expect(Ads.compareAddresses('0002-0000047E-2620', '0005-0000047E-41F4')).toBe(false)
})

test('compare addresses by node', () => {
  expect(Ads.compareAddressesByNode('0005-0000047E-41F4', '0005-0000047E-41F4')).toBe(true)
  expect(Ads.compareAddressesByNode('0005-0000047E-41F4', '0005-00000002-322B')).toBe(true)
  expect(Ads.compareAddressesByNode('0002-0000047E-2620', '0005-0000047E-41F4')).toBe(false)
})

test('format address', () => {
  expect(Ads.formatAddress('0000', '00000000')).toBe('0000-00000000-313E')
  expect(Ads.formatAddress('0005', '0000047E')).toBe('0005-0000047E-41F4')
  expect(Ads.formatAddress('0x00ab', '0x00000a7e')).toBe('00AB-00000A7E-8737')
})

test('split address', () => {
  expect(Ads.splitAddress('foo_address')).toBe(null)
  expect(Ads.splitAddress('0002:0000047E:2620')).toBe(null)

  const parts1 = Ads.splitAddress('0005-0000047E-41F4')
  expect(parts1.nodeId).toBe('0005')
  expect(parts1.userAccountId).toBe('0000047E')
  expect(parts1.checksum).toBe('41F4')

  const parts2 = Ads.splitAddress('00ab-00000a7e-8737')
  expect(parts2.nodeId).toBe('00AB')
  expect(parts2.userAccountId).toBe('00000A7E')
  expect(parts2.checksum).toBe('8737')
})

test('validate address', () => {
  expect(Ads.validateAddress('0000-00000000-313E')).toBe(true)
  expect(Ads.validateAddress('0002-0000047E-2620')).toBe(true)
  expect(Ads.validateAddress('0002-0000047E-XXXX')).toBe(true)
  expect(Ads.validateAddress('00ab-00000a7e-8737')).toBe(true)
  expect(Ads.validateAddress('0002-0000047E-1111')).toBe(false)
  expect(Ads.validateAddress(null)).toBe(false)
  expect(Ads.validateAddress('')).toBe(false)
  expect(Ads.validateAddress('foo_address')).toBe(false)
})

test('validate ETH address', () => {
  expect(Ads.validateEthAddress('0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a')).toBe(true)
  expect(Ads.validateEthAddress('0xCFCECFE2BD2FED07A9145222E8A7AD9CF1CCD22A')).toBe(true)
  expect(Ads.validateEthAddress('cfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a')).toBe(true)
  expect(Ads.validateEthAddress('0xcfcecfe2bd2fed07a9145222e')).toBe(false)
  expect(Ads.validateEthAddress('cfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a2bd2fed07a')).toBe(false)
  expect(Ads.validateEthAddress(null)).toBe(false)
  expect(Ads.validateEthAddress('')).toBe(false)
  expect(Ads.validateEthAddress('foo_address')).toBe(false)
})

test('validate key', () => {
  expect(Ads.validateKey('cfcaecfe2bd2fed07a91d9c45222e8a7ad9cf5222e8a7ad9cf1ccd22a1ccd22a')).toBe(true)
  expect(Ads.validateKey('CFCAECFE2BD2FED07A91D9C45222E8A7AD9CF5222E8A7AD9CF1CCD22A1CCD22A')).toBe(true)
  expect(Ads.validateKey('cfcecfe2bd2fed07a9145222e')).toBe(false)
  expect(Ads.validateKey('cfcecfe2bd7a9145222e8a7ad9cf2fed07a9145222e8a7ad97a9145222e8a7ad9cfcf1ccd22a2bd2fed07a')).
    toBe(false)
  expect(Ads.validateKey(null)).toBe(false)
  expect(Ads.validateKey('')).toBe(false)
  expect(Ads.validateKey('foo_key')).toBe(false)
})

const hexSeed = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'

test('master key from seed', () => {
  /* Chain m
   * fingerprint: 00000000
   * chain code: ef70a74db9c3a5af931b5fe73ed8e1a53464133654fd55e7a66f8570b8e33c3b
   * private: 171cb88b1b3c1db25add599712e36245d75bc65a1a5c9e18d76f9f2b1eab4012
   * public: 008fe9693f8fa62a4305a140b9764c5ee01e455963744fe18204b4fb948249308a
   */
  const chain = Ads.getMasterKey(hexSeed)
  expect(chain.key).toBe('171cb88b1b3c1db25add599712e36245d75bc65a1a5c9e18d76f9f2b1eab4012')
  expect(chain.chainCode).toBe('ef70a74db9c3a5af931b5fe73ed8e1a53464133654fd55e7a66f8570b8e33c3b')
  expect(Ads.getPublicKey(chain.key)).toBe('8fe9693f8fa62a4305a140b9764c5ee01e455963744fe18204b4fb948249308a')
})

test('derivePath m/0\' from seed', () => {
  /* Chain m/0H
   * fingerprint: 31981b50
   * chain code: 0b78a3226f915c082bf118f83618a618ab6dec793752624cbeb622acb562862d
   * private: 1559eb2bbec5790b0c65d8693e4d0875b1747f4970ae8b650486ed7470845635
   * public: 0086fab68dcb57aa196c77c5f264f215a112c22a912c10d123b0d03c3c28ef1037
   */
  const chain = Ads.getNextKey('m/0\'', hexSeed)
  expect(chain.key).toBe('1559eb2bbec5790b0c65d8693e4d0875b1747f4970ae8b650486ed7470845635')
  expect(chain.chainCode).toBe('0b78a3226f915c082bf118f83618a618ab6dec793752624cbeb622acb562862d')
  expect(Ads.getPublicKey(chain.key)).toBe('86fab68dcb57aa196c77c5f264f215a112c22a912c10d123b0d03c3c28ef1037')
})

test('derivePath m/0\'/2147483647\' from seed', () => {
  /* Chain m/0H/2147483647H
   * fingerprint: 1e9411b1
   * chain code: 138f0b2551bcafeca6ff2aa88ba8ed0ed8de070841f0c4ef0165df8181eaad7f
   * private: ea4f5bfe8694d8bb74b7b59404632fd5968b774ed545e810de9c32a4fb4192f4
   * public: 005ba3b9ac6e90e83effcd25ac4e58a1365a9e35a3d3ae5eb07b9e4d90bcf7506d
   */
  const chain = Ads.getNextKey('m/0\'/2147483647\'', hexSeed)
  expect(chain.key).toBe('ea4f5bfe8694d8bb74b7b59404632fd5968b774ed545e810de9c32a4fb4192f4')
  expect(chain.chainCode).toBe('138f0b2551bcafeca6ff2aa88ba8ed0ed8de070841f0c4ef0165df8181eaad7f')
  expect(Ads.getPublicKey(chain.key)).toBe('5ba3b9ac6e90e83effcd25ac4e58a1365a9e35a3d3ae5eb07b9e4d90bcf7506d')
})

test('derivePath m/0\'/2147483647\'/1\' from seed', () => {
  /* Chain m/0H/2147483647H/1H
   * fingerprint: fcadf38c
   * chain code: 73bd9fff1cfbde33a1b846c27085f711c0fe2d66fd32e139d3ebc28e5a4a6b90
   * private: 3757c7577170179c7868353ada796c839135b3d30554bbb74a4b1e4a5a58505c
   * public: 002e66aa57069c86cc18249aecf5cb5a9cebbfd6fadeab056254763874a9352b45
   */
  const chain = Ads.getNextKey('m/0\'/2147483647\'/1\'', hexSeed)
  expect(chain.key).toBe('3757c7577170179c7868353ada796c839135b3d30554bbb74a4b1e4a5a58505c')
  expect(chain.chainCode).toBe('73bd9fff1cfbde33a1b846c27085f711c0fe2d66fd32e139d3ebc28e5a4a6b90')
  expect(Ads.getPublicKey(chain.key)).toBe('2e66aa57069c86cc18249aecf5cb5a9cebbfd6fadeab056254763874a9352b45')
})

test('derivePath m/0\'/2147483647\'/1\'/2147483646\' from seed', () => {
  /* Chain m/0H/2147483647H/1H/2147483646H
   * fingerprint: aca70953
   * chain code: 0902fe8a29f9140480a00ef244bd183e8a13288e4412d8389d140aac1794825a
   * private: 5837736c89570de861ebc173b1086da4f505d4adb387c6a1b1342d5e4ac9ec72
   * public: 00e33c0f7d81d843c572275f287498e8d408654fdf0d1e065b84e2e6f157aab09b
   */
  const chain = Ads.getNextKey('m/0\'/2147483647\'/1\'/2147483646\'', hexSeed)
  expect(chain.key).toBe('5837736c89570de861ebc173b1086da4f505d4adb387c6a1b1342d5e4ac9ec72')
  expect(chain.chainCode).toBe('0902fe8a29f9140480a00ef244bd183e8a13288e4412d8389d140aac1794825a')
  expect(Ads.getPublicKey(chain.key)).toBe('e33c0f7d81d843c572275f287498e8d408654fdf0d1e065b84e2e6f157aab09b')
})

test('derivePath m/0\'/2147483647\'/1\'/2147483646\'/2\' from seed', () => {
  /* Chain m/0H/2147483647H/1H/2147483646H/2H
   * fingerprint: 422c654b
   * chain code: 5d70af781f3a37b829f0d060924d5e960bdc02e85423494afc0b1a41bbe196d4
   * private: 551d333177df541ad876a60ea71f00447931c0a9da16f227c11ea080d7391b8d
   * public: 0047150c75db263559a70d5778bf36abbab30fb061ad69f69ece61a72b0cfa4fc0
   */
  const chain = Ads.getNextKey('m/0\'/2147483647\'/1\'/2147483646\'/2\'', hexSeed)
  expect(chain.key).toBe('551d333177df541ad876a60ea71f00447931c0a9da16f227c11ea080d7391b8d')
  expect(chain.chainCode).toBe('5d70af781f3a37b829f0d060924d5e960bdc02e85423494afc0b1a41bbe196d4')
  expect(Ads.getPublicKey(chain.key)).toBe('47150c75db263559a70d5778bf36abbab30fb061ad69f69ece61a72b0cfa4fc0')
})

test('get secret key', () => {
  expect(Ads.getSecretKey('a')).toBe('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb')
  expect(Ads.getSecretKey('foo')).toBe('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')
})

test('get public key', () => {
  expect(Ads.getPublicKey('CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB')).
    toBe('eae1c8793b5597c4b3f490e76ac31172c439690f8ee14142bb851a61f9a49f0e')
  expect(Ads.getPublicKey('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')).
    toBe('34d26579dbb456693e540672cf922f52dde0d6532e35bf06be013a7c532f20e0')
})
