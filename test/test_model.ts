import { assert, expect } from "chai";
import { starknet } from "hardhat";
import { TIMEOUT } from "../util/constants";
import { getOZAccount } from "../util/util";
import { StarknetContractFactory, StarknetContract, Account } from "hardhat/types/runtime";
import { uint256 } from "starknet";

describe("Test zklink model serde", function () {
    this.timeout(TIMEOUT);

    let contractFactory: StarknetContractFactory;
    let account: Account;
    let contract: StarknetContract;
    // const contractAddress = "0x55f401918c59cebd2286ada8a2c1e56d6a67bf2f686629914560f0c2964496a";
    // const contractAddress = "0x6d67cdc67835c42d5f844e21b16f085135898a0f8285e557deac587e88b9cb5";
    // const contractAddress = "0x22f2def3cc0967e88b629db9416990d821900173e5d16ebab928c68d1e504a3";
    // const contractAddress = "0x301526ae23193461f15ebab162dcc5efaf999f615798d353a87a0e6734b0cc1";
    const contractAddress = "0x4648902037b57010a607c2c3011b688e63111af1884e707aa3df8112eaef5c";

    before(async function () {
        account = await getOZAccount();
        contractFactory = await starknet.getContractFactory("zklink_test_model_ZklinkTestModel");
        console.log(`Using account at ${account.address} with public key ${account.publicKey}`);
        contract = contractFactory.getContractAt(contractAddress);
    });

    it("Call get_contract_name method on ZklinkTestModel starknet test contact", async function () {
        const name = await contract.call("get_contract_name");
        const expect = starknet.shortStringToBigInt("zklinkTestModel");
        assert(BigInt(String(name)) === expect);
    });

    // Caused by: StarknetPluginError: Type core::array::Array::<core::integer::u128> not present in ABI.
    // https://0xspaceshard.github.io/starknet-hardhat-plugin/docs/intro#interact-through-account
    // https://www.starknetjs.com/docs/guides/define_call_message#types-of-data
    it("Call test_bytes method on ZklinkTestModel starknet test contact", async function () {
        const args = {
            size: 32n,
            data: [10000000n]
        };
        const ret = await contract.call("test_bytes", { bytes: args }, { rawInput: true });
        expect(ret).to.deep.equal(args);
    });

    it("Call test_proof_input method on ZklinkTestModel starknet test contact", async function () {
        const args = {
            recursiveInput: [uint256.bnToUint256(12)],
            proof: [uint256.bnToUint256("0xac1234b12a")],
            commitments: [uint256.bnToUint256(12134512)],
            vkIndexes: [12, 12, 3, 4, 5, 53, 2],
            subproofsLimbs: [uint256.bnToUint256(12122233333333)]
        };
        const { recursiveInput, proof, commitments, vkIndexes, subproofsLimbs } = await contract.call(
            "test_proof_input",
            { proof_input: args },
            { rawInput: true }
        );
        console.log(recursiveInput);
        console.log(proof);
        console.log(commitments);
        console.log(vkIndexes);
        console.log(subproofsLimbs);
        expect(recursiveInput).to.deep.equal([12n]);
        expect(proof).to.deep.equal([BigInt("0xac1234b12a")]);
        expect(commitments).to.deep.equal([12134512n]);
        expect(vkIndexes).to.deep.equal([12n, 12n, 3n, 4n, 5n, 53n, 2n]);
        expect(subproofsLimbs).to.deep.equal([12122233333333n]);
    });

    it("Invoke addPriorityRequest method on ZklinkTestModel starknet test contact", async function () {
        const txHash = await account.invoke(contract, "addPriorityRequest");
        console.log(txHash);
        const status = await contract.provider.getTransactionStatus(txHash);
        console.log(status);
        const receipt = await starknet.getTransactionReceipt(txHash);
        console.log(receipt);
        const events = contract.decodeEvents(receipt.events);
        console.log(events);
    });

    it("Call event on ZklinkTestModel starknet test contact", async function () {
        const txHash = "0x001fd563ed0bae5244790d92e3482cf914dc9bfcf4e77ded26464429a4cbfe78";
        const status = await contract.provider.getTransactionStatus(txHash);
        console.log(status);
        const receipt = await starknet.getTransactionReceipt(txHash);
        console.log(receipt);
        const events = contract.decodeEvents(receipt.events);
        console.log(events[0]);
        assert(events[0].name === "NewPriorityRequest");
        assert(events[0].data.serialId === 1n);
        assert(events[0].data.opType === 1n);
        assert(events[0].data.expirationBlock === 100n);
        expect(events[0].data.pubData).to.deep.equal({
            size: 3n,
            data: [1n, 2n, 3n]
        });
    });
});
