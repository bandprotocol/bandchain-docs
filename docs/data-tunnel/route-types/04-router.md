# Router Route

> This route type is coming soon.

## Overview

The **Router Route** leverages IBC hooks and the Router Bridge Protocol to transmit packet data from **BandChain** to other EVM-compatible chains. This enables developers to create smart contracts that receive real-time price data from BandChain and seamlessly integrate it into their applications by utilizing both BandChain price data and the Router Protocol bridge.

## Creating a Router Tunnel

To create a Router Tunnel using the command-line interface (CLI), execute the following command:

```bash
bandd tx tunnel create-tunnel router [destination-chain-id] [destination-contract-address] [destination-gas-limit] [initial-deposit] [interval] [signalDeviations-json-file]
```

### Parameters:

- **destination-chain-id**: The ID of the destination chain supported by the Router Protocol. A list of supported chains is available [here](https://docs.routerprotocol.com/networks/supported-chains/).
- **destination-contract-address**: The contract address on the destination chain that implements the `iReceive` interface to support the Router middleware contract (implementation details are provided below).
- **destination-gas-limit**: The gas limit for transactions on the destination chain. The Router chain automatically calculates the gas price.
- **initial-deposit**: The initial deposit required to create the tunnel.
- **interval**: The frequency at which price updates are sent.
- **signalInfos-json-file**: A JSON file containing signal information for the tunnel.

This command initializes a Router Tunnel, enabling the secure transmission of real-time price data from **BandChain** to an **EVM smart contract** on another blockchain.

## Updating a Router Tunnel

BandChain allows tunnel creators to modify certain route parameters. Specifically, tunnel creators can update the **destination chain ID**, **destination contract address**, and **destination gas limit** using the following command:

```bash
bandd tx tunnel router [tunnel-id] [destination-chain-id] [destination-contract-address] [destination-gas-limit]
```

## Fee Collection

Since this route uses the Router Bridge Protocol, users must deposit **route tokens** into the Band Router integration contract on the Router chain. This is done by executing the `RegisterFeePayerOrFund` function with the `band_fee_payer` parameter and providing funds.

- The **minimum deposit** required to register a fee payer is **10,000,000,000 uRoute**.
- Users can add more funds by sending a transaction with an empty `band_fee_payer` parameter.

Additionally, users must pay a base fee by sending `uband` to the Tunnel Fee Payer address.

### Band Router Integration Contract Address

- **Testnet:** `router1v8evlcrtu4peer2fk5tnkau3qd0r0vtn8ll86qep4sgp89t6l9fqkvsue6`

### Band Fee Payer Address on Router Chain

The fee payer address on the Router Chain is derived from the Tunnel Fee Payer address on BandChain. This is done by hashing the Destination IBC channel and the Destination chain bech32Prefix into a Router-compatible address.

**Hashing Process:**

```go
import (
    sdk "github.com/cosmos/cosmos-sdk/types"
    "github.com/cosmos/cosmos-sdk/types/address"

    "github.com/osmosis-labs/osmosis/x/ibc-hooks/types"
)

// DeriveIntermediateSender derives the sender address to be used when calling wasm hooks
func DeriveIntermediateSender(destChannel, originalSender, bech32Prefix string) (string, error) {
    senderStr := fmt.Sprintf("%s/%s", destChannel, originalSender)
    senderHash32 := address.Hash(types.SenderPrefix, []byte(senderStr))
    sender := sdk.AccAddress(senderHash32[:])
    return sdk.Bech32ifyAddressBytes(bech32Prefix, sender)
}
```

## Implementing the `iReceive` Interface

To receive tunnel packet data on the destination contract, developers must implement the `iReceive` interface. Below is an example EVM smart contract that supports a **Router Tunnel**.

The full implementation will be available in the cw-band repository [Link to be added].

```solidity
/// @notice Handles cross-chain requests received from another chain.
/// @param requestSender The address of the source chain contract that created the request.
/// @param packet The payload sent by the source chain contract.
/// @param srcChainId The chain ID of the source chain.
function iReceive(
    string calldata requestSender,
    bytes calldata packet,
    string calldata srcChainId
) external onlyGateway returns (bytes memory) {
    // Decode the router payload
    PacketDecoder.RouterPayload memory routerPayload = packet.decodeRouterPayload();

    // Validate the incoming message
    _validateMessage(requestSender, srcChainId, routerPayload);

    PacketDecoder.Packet memory tunnelPacket = routerPayload.packet;

    // Process signal prices received in the packet
    uint256 length = tunnelPacket.SignalPrices.length;
    for (uint256 i; i < length; ) {
        bytes32 signalID = tunnelPacket.SignalPrices[i].SignalID;
        prices[signalID] = Price({
            price: tunnelPacket.SignalPrices[i].Price,
            timestamp: tunnelPacket.CreatedAt
        });
        emit SignalPriceUpdated(
            signalID,
            tunnelPacket.SignalPrices[i].Price,
            tunnelPacket.CreatedAt
        );
        unchecked {
            ++i;
        }
    }

    // Update sequence number
    sequence = tunnelPacket.Sequence;
    return "";
}
```

This contract ensures that incoming data from BandChain is properly validated, decoded, and processed before being used in applications.
