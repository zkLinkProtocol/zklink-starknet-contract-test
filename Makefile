

build:
	scarb build

clean:
	npx hardhat clean
	rm -rf cache starknet-artifacts

scarb:
	curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

dep:
	npm i


buildAll:

