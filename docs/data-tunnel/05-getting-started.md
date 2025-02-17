# Getting Started with Data Tunnel

This guide provides a quick reference on how to use Data Tunnel to send price data to a destination.

## Step 1: Prepare the Consumer Contract

To send packet data from BandChain to the destination chain, the client must implement a contract based on the destination chain and the selected route type. The implementation details vary for each integration method. For example, refer to [IBC Hook Integration - Implementing a WASM Contract](./08-ibc-hook-integration.md#implementing-a-wasm-contract).

## Step 2: Create a Tunnel

Each tunnel route has specific requirements for tunnel creation. For example, creating an IBC Hook tunnel requires specifying the `[channel-id]` and `[destination-contract-address]`.

However, every tunnel must include the following parameters:

- `[initial-deposit]`
- `[interval]`
- `[signalInfos-json-file]`

IBC Hook Tunnel CLI Example:

```bash
bandd tx tunnel create-tunnel ibc-hook [channel-id] [destination-contract-address] [initial-deposit] [interval] [signalInfos-json-file]
```

## Step 3: Deposit to the Tunnel

If the initial deposit at the time of tunnel creation does not meet the minimum deposit requirement, additional deposits can be made by anyone to reach the minimum threshold. Use the following command:

```bash
bandd tx tunnel deposit-to-tunnel [tunnel-id] [amount]
```

## Step 4: Top Up Tunnel Fee Payer Funds

After successfully creating the tunnel, you must top up the tunnel fee payer account to cover the costs of producing packets. If the tunnel fee payer runs out of funds, the tunnel will be deactivated.

> Note: Some routes require funding beyond just the fee payer account.

### Query the Tunnel Fee Payer Address

```bash
bandd query tunnel tunnel [tunnel-id]
```

This will return the `fee_payer` address, for example:

```bash
fee_payer: band1qzjexehgqq6g97au43d423ty7jpwwwzw530utmxkskp5pgwuaydququj6d
```

Send `uband` to this address to fund the tunnel.

## Step 5: Activate the Tunnel

⚠️ **Before activating the tunnel, ensure that you have successfully implemented the route integration and funded the route fee if necessary.**

Once the setup is complete, activate the tunnel to start producing packets based on the chosen destination route. Use the following command:

```bash
bandd tx tunnel activate-tunnel [tunnel-id]
```
