# Falcon Architecture

There are 5 main components

1. BandChain Client
    - Provide query client for retrieving tunnel information and packet information.

2. Chain Provider
    - Abstract level of keys management
        - Manages key operations such as adding, deleting, listing related keys.
    - Transaction Creation 
        - Constructs calldata for packet relaying.
        - Dynamically calculates gas fees for both EIP-1559 and Legacy transactions.
    - Transaction Execution
        - Broadcasts transactions to the blockchain. 
        - Verifies transaction success with a receipt check.

3. Scheduler
    - Execute tasks for each tunnel relayer periodically.
    - Synchronize with BandChain periodically to fetch new tunnel (if it is in all-tss-tunnel mode).

4. Tunnel Relayer
    - Fetche tunnel information and packet by BandChain Client and chain provider
    - Handle the packet relaying process
        - Validate tunnel state (e.g., active status, latest sequence).
        - Fetche unrelayed packets from BandChain client.
        - Submit packet to chain provider to continue on transaction process.

5. Wallet
    - Manage keys store.
    - Signs transactions using keys from the senders pool.


## ⚙️ How It Works

1. **Connect to BandChain**: Falcon connects to the BandChain to poll a new data from tss tunnel.
2. **Connect to Destination Chain**: Falcon connects to the destination chain to retrieve current state and packet sequence of the target contract associated with the TSS tunnel.
3. **Retrieve Data**: Falcon fetches the next-sequence packet required by the target contract from BandChain.
4. **Contract Interaction**: Using a pre-configured RPC endpoint and wallet key, Falcon submits a transaction containing the relevant data to the target smart contract.
5. **Retry & Logging**: Falcon supports automatic retries on failure and logs all relayed events for traceability.


