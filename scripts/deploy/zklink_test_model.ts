import hardhat from "hardhat";
import { getOZAccount } from "../../util/util";

async function main() {
    const account = await getOZAccount();
    const contractFactory = await hardhat.starknet.getContractFactory("zklink_test_model_ZklinkTestModel");

    // Class with hash is already declared
    const txHash = await contractFactory.getClassHash();
    if (txHash === undefined) {
        await account.declare(contractFactory);
    }
    console.log("Declaration tx hash: ", txHash);
    const contract = await account.deploy(contractFactory);
    console.log("Deployment tx hash: ", contract.deployTxHash);
    console.log("Deployed to: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

/**
 *
 * ~/ npx hardhat run scripts/deploy.ts
 *  Starknet plugin using dockerized environment (shardlabs/cairo-cli:0.11.2)
 *  Using network alphaGoerli at https://alpha4.starknet.io
 *  Starknet plugin using dockerized environment (shardlabs/cairo-cli:0.11.2)
 *  Declaration tx hash:  0x14cc1b7a95393a0d7f192351e3d64610389f0cfedb52873e431b9539d501c9e
 *  Deployment tx hash:  0x20d6358e90794b92da0c69d94ddfd328d687693e41b152dc525ff3bc3579e0a
 *  Deployed to:  0x55f401918c59cebd2286ada8a2c1e56d6a67bf2f686629914560f0c2964496a
 *
 *  ~/ npx hardhat run scripts/deploy.ts                                                                                              suyanlong@suyanlongdeMacBook-Pro-2
 *  Starknet plugin using dockerized environment (shardlabs/cairo-cli:0.11.2)
 *  Using network alphaGoerli at https://alpha4.starknet.io
 *  Starknet plugin using dockerized environment (shardlabs/cairo-cli:0.11.2)
 *  Declaration tx hash:  0x14cc1b7a95393a0d7f192351e3d64610389f0cfedb52873e431b9539d501c9e
 *  Deployment tx hash:  0x2b4591807fa7a0d005c3b1cfd42e46997dfd5606911a524fd5486e6907dee8e
 *  Deployed to:  0x79c0ed8e6351618d72473d6e3ca7170c495d1042b9f16ac9c680a6fd9dd8ccf
 *
 */
