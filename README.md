# Zklink-starknet-contract-test

This project is designed to test zklink starknet contract with starknet hardhat plugin

## Get started

#### Clone this repo

```shell
git clone --recursive https://github.com/zkLinkProtocol/zklink-starknet-contract-test.git
cd zklink-starknet-contract-test
```

#### Install dependencies

```shell
npm ci or npm install
```

#### Install scarb

```shell
make scarb
```

#### Compile contract

```shell
make build
```

### Set up environment variables

Some scripts require environment variables (search for usage of `ensureEnvVar` in the repo). You can define these variables in an `.env` file in the project root.

#### Run a test that interacts with the compiled contract

```shell
npx hardhat test test/***.ts or
npx hardhat test scripts/***.ts
```

## Supported `starknet-hardhat-plugin` version

`package.json` is fixed to use the latest `starknet-hardhat-plugin` version this example repository is synced with.

## Troubleshooting

If you're having issues trying to use this example repo with the Starknet plugin, try running `npm install` or `npm update`, as it may be due to version mismatch in the dependencies.

## Branches

- `master` - latest stable

