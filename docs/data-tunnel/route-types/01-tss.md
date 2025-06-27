# TSS Route

## Overview

The **TSS Route** is one of the tunnel routes used to transmit tunnel packet data from **BandChain** to other chains (currently supporting only EVM-compatible chains). This enables developers to create smart contracts that receive real-time price data from BandChain and seamlessly integrate it into their applications by utilizing both BandChain price data and Tunnel Router bridge.

Data flow of the relaying message can be found on [this document](https://github.com/bandprotocol/tunnel-tss-router-contracts/blob/main/docs/contracts/02-dataflow.md)

## Creating a TSS Tunnel

### Deploying a Target Contract

A target contract must implement the `IDataConsumer` interface to support the `BandTunnelRouter` contract. [This contract](https://holesky.etherscan.io/address/0x4eabfc3cd1d9b1170707debd9fe5ab8f657f7a3f#code) is an example of the `DataConsumer` contract that support `IDataConsumer` interface. The implementation details are provided below:

```solidity
interface IDataConsumer {
    /**
     * @dev Processes the relayed message.
     *
     * The relayed message must be evaluated from the tunnelRouter contract and
     * verified by the tssVerifier contract before forwarding to the target contract.
     *
     * @param data The decoded tss message that is relayed from the tunnelRouter contract.
     */
    function process(PacketDecoder.TssMessage memory data) external;

    /**
     * @dev Activates the tunnel and set the sequence on tunnelRouter contract.
     *
     * This function deposits tokens into the vault and sets the latest sequence on the
     * tunnelRouter contract if the current deposit in the vault contract exceeds a threshold.
     * The transaction is reverted if the threshold is not met.
     *
     * This function should be called by the contract owner.
     *
     * @param latestSeq The new sequence of the tunnel.
     */
    function activate(uint64 latestSeq) external payable;

    /**
     * @dev Returns The tunnelRouter contract address.
     */
    function tunnelRouter() external view returns (address);

    /**
     * @dev Returns The tunnelId of the contract address.
     */
    function tunnelId() external view returns (uint64);
}
```

### Creating a TSS Tunnel in BandChain

To create a TSS Tunnel using the command-line interface (CLI), execute the following command:

```bash
bandd tx tunnel create-tunnel tss [destination-chain-id] [destination-contract-address] [encoder] [initial-deposit] [interval] [signal-deviations-json-file]
```

Parameters:

- **destination-chain-id**: The ID of the destination chain supported by Band Protocol. A list of supported chains will be publicly provided soon.
- **destination-contract-address**: The contract address on the destination chain that implements the `IDataConsumer` interface to support the `BandTunnelRouter` contract.
- **encoder**: The type of data and the method of encoding for that data.
- **initial-deposit**: The initial deposit required to create the tunnel.
- **interval**: The frequency at which price updates are sent.
- **signal-deviations-json-file**: A JSON file containing signal information for the tunnel.

This command initializes a TSS Tunnel, enabling the secure transmission of real-time price data from **BandChain** to a target contract on another blockchain.

Currently, there are 2 types of encoder:
- FIXED_POINT_ABI (1) for requiring abi-encoded decimal price data, in the base of billion (x * 10^9), from the tunnel.
- TICK_ABI (2) for requiring abi-encoded tick price data, in the term of 1.0001^x, where x is in the base of 2^96.

### Setting Up Tunnel ID for the Target Contract

Users must set up the tunnel ID received from the tunnel creation process and activate the contract on the TunnelRouter contract via `.activate(uint64 latestSeq)`. Generally, you may set the latest sequence to 0 as a starting package number.

## Fee Collection

Users must deposit tokens into the tunnel's fee payer address on BandChain to cover the cost of the tunnel base fee and TSS signing fee. 

Moreover, users must deposit tokens (gas tokens) into the Vault contract on destination chain on behalf of the target contract address (via calling a payable function `activate(uint64 latestSeq)`) as a relaying fee to pay the relayer. By calling this the router contract will also set the latest sequence of the consumer contract and relayer will acknowledge which next sequence packet should be delivered.

## Integration Contract Address

| Chain | Contract name | Contract Address |
|---|---|---|
| Holesky Testnet | Router Contract | [0xD3F452702484c9Fe7889F820B01BF7B0E20b221B](https://holesky.etherscan.io/address/0xd3f452702484c9fe7889f820b01bf7b0e20b221b) |
| Holesky Testnet | TssVerifier Contract | [0x78f92C2f938E4cd51480D2D93786b74302b1e94F](https://holesky.etherscan.io/address/0x78f92C2f938E4cd51480D2D93786b74302b1e94F) |
| Holesky Testnet | Vault Contract | [0x3Ee1AACa9619c63133D9C340032e933C88aA49d3](https://holesky.etherscan.io/address/0x3Ee1AACa9619c63133D9C340032e933C88aA49d3) |
