# On-chain Payment

## Overview

When data scripts make inquiries from premium data sources, parties that request data from these data scripts must pay additional fees that are proportional to the fees charged by the premium data sources. These data sources collect fees every time a validator requests data. Thus, the final fee charged for a single request is the sum of all data source fees corresponding to the requested data script, multiplied by the number of requested validators.

Since each data source sets its own fees, which can vary, users must specify a `feeLimit` for each request, to prevent any unexpectedly high fees when requesting data. The fee limit defines the amount of tokens allowed to be paid for the total data source fees corresponding to the request. If the fee limit is less than the total fees, then the request becomes invalid, and the associated transaction fails.

The party responsible for paying the fees depends on the origin of the request, whether it is a direct on-chain request or an IBC request from a counterparty chain. The fees are paid directly to treasury accounts owned by each data source.

## Direct Request

### Direct Request Payment Flow

The following is an example of the on-chain payment flow when requesting data directly on BandChain.

A user begins by making a request, providing a specific data script ID and a desired fee limit. Once BandChain receives the request, it fetches the data script and calls the preparation step of the data script.

![onchain-direct](https://i.imgur.com/i0LVLMG.png)

After the preparation step is complete, BandChain obtains all the data sources required for this data script. The provided fee limit is used to ensure that the total fee does not exceed the expected price. If the fee limit is insufficient, the transaction is reverted. Otherwise, the balance of the user account is deducted by the total fee, and the treasury accounts of the data sources receive funds according to their specified fee times the number of requested validators.

## IBC request

To make a data request via IBC, a communication channel must be created between a counterparty chain and BandChain, as stated in [IBC](/core-concepts/cosmos-ibc). The main challenge when requesting from another chain is that the requester is an address on the other chain that cannot pay the data source fees on BandChain. Therefore, the fees are instead paid by the account of a relayer that the counterparty chain uses to send packets.

The relayer account is an address account owned by an entity from another chain, as the chain has to manage the relayer. Note that the method by which users fund the relayer account will depend entirely on the protocol of the counterparty chains.

### IBC Request Payment Flow

![onchain-ibc](https://i.imgur.com/GJMo8Df.jpg)

Once the relayer account is funded, the payment flow for IBC requests is very similar to that of the direct request. The additional layer is that the flow begins with a user on the counterparty chain. The request is then relayed from the counterparty chain to BandChain via a relayer through a specific port and channel.

After BandChain receives the request via a relayer, the payment flow is almost identical to the payment flow of a direct request, except that the account used for paying all the fees is now the relayer account.
