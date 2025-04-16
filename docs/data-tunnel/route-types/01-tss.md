# TSS Route

## Overview

The **TSS Route** is one of the tunnel routes used to transmit tunnel packet data from **BandChain** to other chains (currently supporting only EVM-compatible chains). This enables developers to create smart contracts that receive real-time price data from BandChain and seamlessly integrate it into their applications by utilizing both BandChain price data and Tunnel Router bridge.

## Creating a TSS Tunnel

### Deploying a Target Contract

A target contract must implement the `IDataConsumer` interface to support the `BandTunnelRouter` contract. The implementation details are provided below:

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
bandd tx tunnel create-tunnel tss [destination-chain-id] [destination-contract-address] [encoder] [initial-deposit] [interval] [signalDeviations-json-file]
```

Parameters:

- **destination-chain-id**: The ID of the destination chain supported by Band Protocol. A list of supported chains will be publicly provided soon.
- **destination-contract-address**: The contract address on the destination chain that implements the `IDataConsumer` interface to support the `BandTunnelRouter` contract.
- **encoder**: The type of data and the method of encoding for that data. Currently, we support FIXED_POINT_ABI (1) and TICK_ABI (2).
- **initial-deposit**: The initial deposit required to create the tunnel.
- **interval**: The frequency at which price updates are sent.
- **signalDeviations-json-file**: A JSON file containing signal information for the tunnel.

This command initializes a TSS Tunnel, enabling the secure transmission of real-time price data from **BandChain** to a target contract on another blockchain.

### Setting Up Tunnel ID for the Target Contract

Users must set up the tunnel ID received from the tunnel creation process and activate the contract on the TunnelRouter contract via `.activate(uint64 latestSeq)`. Generally, you may set the latest sequence to 0 as a starting package number.

## Fee Collection

Users must deposit tokens into the tunnel's fee payer address to cover the cost of the tunnel base fee and TSS signing fee.

Users must deposit tokens (gas tokens) into the Vault contract on behalf of the target contract address as a relaying fee to pay the relayer.

### Integration Contract Address

TBD
