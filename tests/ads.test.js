const { Ads, TX_FIELDS } = require('../dist')

test('parse broadcast', () => {
  // {"run":"broadcast","message":"00"}
  const data = '0301000000000001000000A1679B5B010000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('broadcast')
  expect(parsedData[TX_FIELDS.MSG]).toBe('00')
  expect(parsedData[TX_FIELDS.MSG_LEN]).toBe(1)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536911265 * 1000))
})

test('parse change_account_key', () => {
  // {"run":"change_account_key",
  // "public_key":"EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E",
  // "confirm":
  // "1F0571D30661FB1D50BE0D61A0A0E97BAEFF8C030CD0269ADE49438A4AD4CF897
  // 367E21B100C694F220D922200B3AB852A377D8857A64C36CB1569311760F303"}
  const data = '090100000000000500000077CE485BEAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('change_account_key')
  expect(parsedData[TX_FIELDS.PUBLIC_KEY]).toBe(
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
  )
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(5)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531498103 * 1000))
})

test('parse change_node_key', () => {
  // {"run":"change_node_key",
  // "public_key":"EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E"}
  const data = '0A010000000000010000005CC2485B0000EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('change_node_key')
  expect(parsedData[TX_FIELDS.PUBLIC_KEY]).toBe(
    'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E',
  )
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531495004 * 1000))
})

test('parse create_account', () => {
  // {"run":"create_account"}
  const data = '0601000000000004000000AB989B5B'
    + '010000000000A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('create_account')
  expect(parsedData[TX_FIELDS.PUBLIC_KEY]).toBe(
    'A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363',
  )
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(4)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536923819 * 1000))
})

test('parse create_node', () => {
  // {"run":"create_node"}
  const data = '070100000000000100000047C9485B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('create_node')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531496775 * 1000))
})

test('parse get_account', () => {
  // {"run":"get_account","address":"0001-00000000-9B6F"}
  const data = '100100000000000100010000001E6A9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_account')
  expect(parsedData[TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536911902 * 1000))
})

test('parse get_accounts', () => {
  // {"run":"get_accounts","node":2}
  const data = '180100000000009EA49B5B60A49B5B0200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_accounts')
  expect(parsedData[TX_FIELDS.NODE_ID]).toBe('0002')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('5B9BA460')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536926878 * 1000))
})

test('parse get_block', () => {
  // {"run":"get_block"}
  const data = '1701000000000000AC9B5B27AC9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_block')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('5B9BAC00')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536928807 * 1000))
})

test('parse get_blocks', () => {
  // {"run":"get_blocks"}
  const data = '130100000000003AAD9B5B20AD9B5B00000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_blocks')
  expect(parsedData[TX_FIELDS.BLOCK_ID_FROM]).toBe('5B9BAD20')
  expect(parsedData[TX_FIELDS.BLOCK_ID_TO]).toBe('00000000')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536929082 * 1000))
})

test('parse get_broadcast', () => {
  // {"run":"get_broadcast"}
  const data = '12010000000000000000006FC39B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_broadcast')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('00000000')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536934767 * 1000))
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
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_log')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536935395 * 1000))
})

test('parse get_message', () => {
  // {"run":"get_message", "block":"5B4893C0", "node":2, "node_msid":73}
  const data = '1A020001000000E693485BC093485B020049000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_message')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('5B4893C0')
  expect(parsedData[TX_FIELDS.NODE_ID]).toBe('0002')
  expect(parsedData[TX_FIELDS.NODE_MESSAGE_ID]).toBe(73)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531483110 * 1000))
})

test('parse get_message_list', () => {
  // {"run":"get_message_list", "block":"5B4893C0"}
  const data = '19020001000000E693485BC093485B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_message_list')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('5B4893C0')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531483110 * 1000))
})

test('parse get_signatures', () => {
  // {"run":"get_signatures","block":"5B9BBF20"}
  const data = '1601000000000005CF9B5B20BF9B5B'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_signatures')
  expect(parsedData[TX_FIELDS.BLOCK_ID]).toBe('5B9BBF20')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536937733 * 1000))
})

test('parse get_transaction', () => {
  // {"run":"get_transaction", "txid":"0001:00000007:0002"}
  const data = '140100000000009253475B0100070000000200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_transaction')
  expect(parsedData[TX_FIELDS.TRANSACTION_ID]).toBe('0001:00000007:0002')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531401106 * 1000))
})

test('parse get_vipkeys', () => {
  // {"run":"get_vipkeys",
  // "viphash":"2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507"}
  const data = '150100000000008ECD9B5B2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('get_vipkeys')
  expect(parsedData[TX_FIELDS.VIP_HASH]).toBe('2A4831F1459C42E2CCF5C4E202C3301F94C381B6FB253DFED21DD015180D9507')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1536937358 * 1000))
})

test('parse log_account', () => {
  // {"run":"log_account"}
  const data = '0F02000100000001000000D99E485B000000000000000000000000000000000000000000000000000000000000000000'
    + '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    + '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('log_account')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0002-00000001-659C')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531485913 * 1000))
})

test('parse retrieve_funds', () => {
  // {"run":"retrieve_funds", "address":"0002-00000001-659C"}
  const data = '0801000000000002000000BBC4485B020001000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('retrieve_funds')
  expect(parsedData[TX_FIELDS.ADDRESS]).toBe('0002-00000001-659C')
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(2)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531495611 * 1000))
})

test('parse send_many', () => {
  // {"run":"send_many", "wires":{"0001-00000001-8B4E":"100","0001-00000002-BB2D":"100"}}
  const data = '050100000000000400000069C0485B020001000100000000A0724E1809000001000200000000A0724E18090000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('send_many')
  expect(parsedData[TX_FIELDS.WIRE_COUNT]).toBe(2)

  const wires = parsedData[TX_FIELDS.WIRES]
  expect(wires[0][TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  expect(wires[0][TX_FIELDS.AMOUNT].toNumber()).toEqual(100 * 100000000000)
  expect(wires[1][TX_FIELDS.ADDRESS]).toBe('0001-00000002-BB2D')
  expect(wires[1][TX_FIELDS.AMOUNT].toNumber()).toEqual(100 * 100000000000)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(4)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1531494505 * 1000))
})

test('parse send_one', () => {
  // {"run":"send_one","address":"0001-00000001-8B4E","amount":"100000"}
  const data = '04010000000000010000006F0A645B0100010000000000C16FF2862300000'
    + '0000000000000000000000000000000000000000000000000000000000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('send_one')
  expect(parsedData[TX_FIELDS.ADDRESS]).toBe('0001-00000001-8B4E')
  expect(parsedData[TX_FIELDS.AMOUNT].toNumber()).toEqual(10000000000000000)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1533282927 * 1000))
})

test('parse set_account_status', () => {
  // {"run":"set_account_status", "address":"0001-00000000-9B6F", "status":"2"}
  const data = '0B01000000000001000000A1B2285B0100000000000200'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('set_account_status')
  expect(parsedData[TX_FIELDS.ADDRESS]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.STATUS_ACCOUNT]).toBe(2)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(1)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1529393825 * 1000))
})

test('parse set_node_status', () => {
  // {"run":"set_node_status", "node":"14", "status":"2147483648"}
  const data = '0C0100000000007900000084B4285B0E0000000080'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('set_node_status')
  expect(parsedData[TX_FIELDS.NODE_ID]).toBe('000E')
  expect(parsedData[TX_FIELDS.STATUS_NODE]).toBe(2147483648)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(121)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1529394308 * 1000))
})

test('parse unset_account_status', () => {
  // {"run":"unset_account_status", "address":"0001-00000000-9B6F", "status":"32"}
  const data = '0D0100000000000A000000A4B2285B0100000000002000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('unset_account_status')
  expect(parsedData[TX_FIELDS.ADDRESS]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.STATUS_ACCOUNT]).toBe(32)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000000-9B6F')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(10)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1529393828 * 1000))
})

test('parse unset_node_status', () => {
  // {"run":"unset_node_status", "node":"3", "status":"2"}
  const data = '0E01000100000025000000C7B4285B030002000000'
  const parsedData = Ads.decodeCommand(data)
  expect(parsedData[TX_FIELDS.TYPE]).toBe('unset_node_status')
  expect(parsedData[TX_FIELDS.NODE_ID]).toBe('0003')
  expect(parsedData[TX_FIELDS.STATUS_NODE]).toBe(2)
  // sender
  expect(parsedData[TX_FIELDS.SENDER]).toBe('0001-00000001-8B4E')
  expect(parsedData[TX_FIELDS.MESSAGE_ID]).toBe(37)
  expect(parsedData[TX_FIELDS.TIME]).toEqual(new Date(1529394375 * 1000))
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
  const expSignature = 'BB4946AEC4C1BE7E1BCB11B27B3CFB13B3234417FCDC96356CEB910C233423B5692B93196471C75D1BDB9E8FE2BCAD184E1A0B37976BDF228FF5A60D5173F80B'

  expect(Ads.sign(secretKey, publicKey, data)).toBe(expSignature)
})

test('sign transaction', () => {
  // secret key is concatenation of private and public key
  const publicKey = 'A9C0D972D8AAB73805EC4A28291E052E3B5FAFE0ADC9D724917054E5E2690363'
  const secretKey = 'BB3425F914CA9F661CA6F3B908E07092B5AFB7F2FDAE2E94EDE12C83207CA743'
  const hashin = '71BD0607F5B874B2B4ECC442A76D0FD7544FE12CD32BDDB6BA7F3D5755C40A1A'
  const txData = '04010000000000010000000100000001000000000000E87648170000000000000000000000000000000000000000000000000000000000000000000000'
  const data = hashin + txData
  const expSignature = 'F9C975D060D84EBCA286E7C9E4AA68F0B77D005B98067C17E00AA93A102D48BB49A20233A37CBF3BA8BB1A8A8B94FC4832BC286B59EE66AA0BA01E2D3AA8CF0A'

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
  const expSecretKey = 'CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB'
  const expPublicKey = 'EAE1C8793B5597C4B3F490E76AC31172C439690F8EE14142BB851A61F9A49F0E'
  const expSg = '1F0571D30661FB1D50BE0D61A0A0E97BAEFF8C030CD0269ADE49438A4AD4CF897367E21B100C694F220D922200B3AB852A377D8857A64C36CB1569311760F303'

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
