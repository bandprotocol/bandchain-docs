---
sidebar_position: 2
---

# Gas and Fees

:::info Pre-Requisite Readings

- [Cosmos SDK Gas](https://docs.cosmos.network/main/basics/gas-fees)

:::

## Introduction to Gas and Network Fees

In the Cosmos SDK, gas is a unit that is used to track the consumption of resources during process execution. It is typically consumed during read/write operations, or whenever a computationally expensive operation is performed.

The purpose of gas is twofold:

1. To prevent blocks from consuming excessive resources, thus ensuring that the block will be finalized
2. To prevent abuse from a malicious actor on the user side

Gas consumed during message execution is typically priced, resulting in a fee

```
fee = gas * gasPrice
```

Fees generally have to be paid by the sender of the message.

Meanwhile, each block validator can subjectively establish the minimum gas fee that must be reached for them to process the transaction and choose whatever transactions it wants to include in the block that it is proposing, as long as the total gas limit is not exceeded.

## Gas Estimation

This section we will compare gas usage on each message type to compare how many fee that user need to pay to do these actions.

| Message                                                      | Estimated fee |
| ------------------------------------------------------------ | ------------- |
| MsgSend                                                      | ~70k          |
| MsgDelegate                                                  | ~120k         |
| MsgWithdrawReward                                            | ~100k         |
| MsgTransfer(IBC)                                             | ~85k          |
| MsgUpdateClient + MsgReceivePacket (Transfer packet)         | ~350k         |
| MsgRequestData\*                                             | >500k upto 5m |
| MsgUpdateClient + MsgReceivePacket (Data request packet)\*   | >560k upto 5m |
| MsgCreateDataSource / MsgEditDataSource\*\*                  | 30k - 100k    |
| MsgCreateOracleScript / MsgEditOracleScript\*\*              | 500k - 2m     |

(\*) The gas is used on MsgRequestData or process request packet based on complexity of data script and how many validator need to query data on this request.

(\*\*) Based on size of data source and data script mostly data source should be smaller than data script.
