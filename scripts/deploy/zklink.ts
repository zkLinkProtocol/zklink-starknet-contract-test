import hardhat from "hardhat";
import { getOZAccount } from "../../util/util";
import axios, { AxiosError } from "axios";

async function main() {
    const account = await getOZAccount();
    const contractFactory = await hardhat.starknet.getContractFactory("zklink_Zklink");
    // Class with hash is already declared
    const txHash = await contractFactory.getClassHash().catch((e: AxiosError) => {
        // really AxiosError?
        console.log(e.message);
    });
    if (txHash) {
        console.log(`Warning: Class with hash ${txHash} is already declared!`);
    } else {
        await account.declare(contractFactory);
    }
    console.log("Declaration tx hash: ", txHash);

    /**
     *  _verifierAddress: ContractAddress,
     *  _networkGovernor: ContractAddress,
     *  _blockNumber: u64,
     *  _timestamp: u64,
     *  _stateHash: u256,
     *  _commitment: u256,
     *  _syncHash: u256
     */

    // Build contract constructor arguments
    const param = {
        _verifierAddress: account.address,
        _networkGovernor: account.address,
        _blockNumber: 0,
        _timestamp: 0,
        _stateHash: BigInt(0),
        _commitment: BigInt(0),
        _syncHash: BigInt(0)
    };

    const contract = await account.deploy(contractFactory, param);
    console.log("Deployment tx hash: ", contract.deployTxHash);
    console.log("Deployed to: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
