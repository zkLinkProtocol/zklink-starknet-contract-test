#[starknet::contract]
mod ZklinkTestModel {
    use array::ArrayTrait;
    use starknet::{
        ContractAddress, contract_address_const, Felt252TryIntoContractAddress,
        get_contract_address, get_caller_address, get_block_info, get_block_timestamp
    };
    use zklink::utils::data_structures::DataStructures::{
        StoredBlockInfo, CommitBlockInfo, ProofInput, Token, CompressedBlockExtraInfo,
        ExecuteBlockInfo
    };
    use zklink::utils::bytes::Bytes;
    use zklink::utils::operations::Operations::OpType;

    /// Storage
    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState) {}

    // New priority request event. Emitted when a request is placed into mapping
    #[derive(Drop, starknet::Event)]
    struct NewPriorityRequest {
        sender: ContractAddress,
        serialId: u64,
        opType: OpType,
        pubData: Bytes,
        expirationBlock: u64
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        NewPriorityRequest: NewPriorityRequest,
    }

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

        fn addPriorityRequest(ref self: ContractState) {
            let sender = get_caller_address();
            let mut arr: Array<u128> = ArrayTrait::new();
            arr.append(1);
            arr.append(2);
            arr.append(3);
            self
                .emit(
                    Event::NewPriorityRequest(
                        NewPriorityRequest {
                            sender: sender,
                            serialId: 1,
                            opType: OpType::Deposit(()),
                            pubData: Bytes { size: 3, data: arr, },
                            expirationBlock: 100
                        }
                    )
                );
        }
    }
}
