import { HardhatUserConfig } from "hardhat/types";
import "@shardlabs/starknet-hardhat-plugin";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const config: HardhatUserConfig = {
    starknet: {
        dockerizedVersion: "0.11.2", // alternatively choose one of the two venv options below
        // uses (my-venv) defined by `python -m venv path/to/my-venv`
        // venv: "path/to/my-venv",

        // Instead of using the dockerized Scarb, uses the command you provide here
        // Can be a path or a resolvable command
        // scarbCommand: "scarb",

        // uses the currently active Python environment (hopefully with available Starknet commands!)
        // venv: "active",
        recompile: false,
        // 90s
        requestTimeout: 90_000,
        // the directory containing Cairo 1 compiler binaries
        // cairo1BinDir: "path/to/to/compiler/target/release",
        // network: "integrated-devnet",
        network: "alpha-goerli"
    },
    networks: {
        devnet: {
            url: "http://127.0.0.1:5050"
        },
        integration: {
            url: "https://external.integration.starknet.io"
        },
        integratedDevnet: {
            url: "http://127.0.0.1:5050",
            // venv: "active",
            // dockerizedVersion: "<DEVNET_VERSION>",
            args: [
                // Uncomment the lines below to activate Devnet features in your integrated-devnet instance
                // Read about Devnet options here: https://0xSpaceShard.github.io/starknet-devnet/docs/guide/run
                //
                // *Account predeployment*
                "--seed",
                "42"
                // "--accounts",
                // "1",
                // "--initial-balance", <VALUE>
                //
                // *Forking*
                // "--fork-network",
                // "alpha-goerli2"
                // "--fork-block", <VALUE>
                //
                // *Chain ID*
                // "--chain-id", <VALUE>
                //
                // *Gas price*
                // "--gas-price", <VALUE>
            ]
        },
        hardhat: {}
    }
};
