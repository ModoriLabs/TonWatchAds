# TonWatchAds

This is smartcontract code for TonWatchAd
It is written by TACT, Blueprint

### Deploy non-interactive

.env

```
WALLET_MNEMONIC=""
WALLET_VERSION="" // use "v4" for v4 versions
```

### Test Scenario

```
yarn blueprint run deployNftCollection --testnet --mnemonic;
yarn blueprint run mint --testnet --mnemonic;
yarn blueprint run getCurrentNftAddress --testnet --mnemonic;
yarn blueprint run getNftItemData --testnet --mnemonic;
yarn blueprint run claim --testnet --mnemonic;
```

## Repositories

Contract

-   https://github.com/ModoriLabs/TonWatchAds

TWA interface

-   https://github.com/ModoriLabs/telegram-web-app-interface.git

Bot server

-   https://github.com/ModoriLabs/ton-bootcamp.git
