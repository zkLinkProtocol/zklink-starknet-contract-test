.PHONY: test fmt lint buildAll scarb dep all clean build_zklink_starknet_contracts build_zklink_test_model

buildAll: build_zklink_test_model build_zklink_starknet_contracts
	scarb build

build_zklink_test_model:
	npx hardhat starknet-build --scarb-command scarb crates/zklink_test_model

build_zklink_starknet_contracts:
	npx hardhat starknet-build --scarb-command scarb crates/zklink_starknet_contracts

clean:
	npx hardhat clean
	scarb clean
	rm -rf cache starknet-artifacts

scarb:
	curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

dep:
	npm i

all:
	scarb all

test:
	#cd crates/zklink_test_model && scarb test
	npx hardhat test test/*

fmt:
	cd crates/zklink_test_model && scarb fmt && npm run format

lint:
	npm run lint
