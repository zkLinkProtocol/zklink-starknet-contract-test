

build:
	scarb build
	npx hardhat starknet-build --scarb-command scarb crates/zklink_test_model

clean:
	npx hardhat clean
	scarb clean
	rm -rf cache starknet-artifacts

scarb:
	curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

dep:
	npm i


buildAll:
	scarb buildAll

test:
	cd crates/zklink_test_model && scarb test

fmt:
	cd crates/zklink_test_model && scarb fmt && npm run format

