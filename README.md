<p align="center">
  <a href="https://adshares.net/">
    <img src="https://adshares.net/logos/ads.svg" alt="Adshares" width=72 height=72>
  </a>
  <h3 align="center"><small>ADS JS Client</small></h3>
  <p align="center">
    <a href="https://github.com/adshares/ads-js-client/issues/new?template=bug_report.md&labels=Bug">Report bug</a>
    ·
    <a href="https://github.com/adshares/ads-js-client/issues/new?template=feature_request.md&labels=New%20Feature">Request feature</a>
    ·
    <a href="https://docs.adshares.net/ads/index.html">Docs</a>
  </p>
</p>

<br>

ADS JS Client is an **JavaScript ES2015** client for the [ADS blockchain](https://github.com/adshares/ads) API.

The module can be used to send basic transactions. ADS JS Client is a free, open-source npm module. It supports both mainnet and testnet.

## Install

```bash
npm install @adshares/ads-client
```
or
```bash
yarn add @adshares/ads-client
```

## Usage

All methods return Promises.

```js
import AdsClient from '@adshares/ads-client';

// pass true to enable testnet
const adsClient = new AdsClient(false);

adsWallet.getInfo().then(info => {})
adsWallet.getNodes().then(nodes => {})
adsWallet.sendTransaction(_DATA_, _SIGNATURE_).then(response => {})

```

### Contributing

Please follow our [Contributing Guidelines](docs/CONTRIBUTING.md)

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/adshares/ads-js-client/tags). 

## Authors

- **[Maciej Pilarczyk](https://github.com/m-pilarczyk)** - _programmer_

See also the list of [contributors](https://github.com/adshares/ads-js-client/contributors) who participated in this project.

### License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## More info

- [ADS Blockchain docs](https://docs.adshares.net/ads/index.html)
- [ADS JS Library](https://github.com/adshares/ads-js)
- [ADS Browser Wallet](https://github.com/adshares/ads-browser-wallet)
- [ADS PHP Client](https://github.com/adshares/ads-php-client)
