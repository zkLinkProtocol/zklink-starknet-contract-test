#[starknet::contract]
mod ZklinkTestModel {
    use starknet::ContractAddress;
    use zklink::utils::data_structures::DataStructures::{
        StoredBlockInfo, CommitBlockInfo, ProofInput, Token, CompressedBlockExtraInfo,
        ExecuteBlockInfo
    };
    use zklink::utils::bytes::Bytes;

    /// Storage
    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[external(v0)]
    #[generate_trait]
    impl SimpleTestModel of SimpleTestModelTrait {
        fn get_contract_name(self: @ContractState) -> felt252 {
            'zklinkTestModel'
        }

        fn test_stored_block_info(
            self: @ContractState, stored_block_info: StoredBlockInfo
        ) -> StoredBlockInfo {
            stored_block_info
        }

        fn test_commit_block_info(
            self: @ContractState, commit_block_info: CommitBlockInfo
        ) -> CommitBlockInfo {
            commit_block_info
        }

        fn test_compressed_block_extra_info(
            self: @ContractState, compressed_block_extra_info: CompressedBlockExtraInfo
        ) -> CompressedBlockExtraInfo {
            compressed_block_extra_info
        }

        fn test_execute_block_info(
            self: @ContractState, execute_block_info: ExecuteBlockInfo
        ) -> ExecuteBlockInfo {
            execute_block_info
        }

        fn test_proof_input(self: @ContractState, proof_input: ProofInput) -> ProofInput {
            proof_input
        }

        fn test_token(self: @ContractState, token: Token) -> Token {
            token
        }

        fn test_bytes(self: @ContractState, bytes: Bytes) -> Bytes {
            bytes
        }

        fn test_contract_address(
            self: @ContractState, address: ContractAddress
        ) -> ContractAddress {
            address
        }
    }
}
