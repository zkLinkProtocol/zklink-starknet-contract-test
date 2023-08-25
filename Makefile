
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
	cd crates/zklink_test_model && scarb test

fmt:
	cd crates/zklink_test_model && scarb fmt && npm run format

