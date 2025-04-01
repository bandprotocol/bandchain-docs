# Getting Started with Data Tunnel

This guide provides a quick reference on how to use Data Tunnel to send price data to a destination.

## Step 1: Prepare the Consumer Contract

To send packet data from BandChain to the destination chain, the client must implement a contract based on the destination chain and the selected route type. Choose your preferred route type to learn more about implementation details:

- [TSS Route](./route-types/01-tss.md)
- [IBC Route](./route-types/02-ibc.md)
- [IBC Hook Route](./route-types/03-ibc-hook.md)
- [Router Route](./route-types/04-router.md)

## Step 2: Create a Tunnel

Before creating a tunnel, you should understand the common parameters required for all tunnel types:

### Common Parameters

- `[initial-deposit]`: The initial amount of uband tokens to deposit into the tunnel.
- `[interval]`: The time interval (in seconds) between each forced price transmission. The tunnel will send updates when prices exceed their deviation thresholds
- `[signalInfos-json-file]`: A JSON file specifying the price feed configurations, including:
  - `signal_id`: The symbol/identifier of the price feed (e.g., "CS:BTC-USD")
  - `deviation_bps`: The threshold (in basis points) that triggers a price update. For example, 100 basis points equals 1%. When price movement exceeds this threshold, the tunnel will send an update.

Example `signalInfos.json`:

```json
{
  "signal_deviations": [
    {
      "signal_id": "CS:BTC-USD",
      "deviation_bps": 200
    },
    {
      "signal_id": "CS:ETH-USD",
      "deviation_bps": 400
    }
  ]
}
```

### Route-Specific Creation

Choose your route type to learn about specific parameters and creation steps:

- [Creating a TSS Tunnel](./route-types/01-tss.md)
- [Creating an IBC Tunnel](./route-types/02-ibc.md#creating-an-ibc-tunnel)
- [Creating an IBC Hook Tunnel](./route-types/03-ibc-hook.md#creating-an-ibc-hook-tunnel)
- [Creating a Router Tunnel](./route-types/04-router.md#creating-a-router-tunnel)

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
