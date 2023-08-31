# TonWatchAds

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`

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
