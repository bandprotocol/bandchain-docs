# Introduction

## What is staking

In a Proof-of-Stake (PoS) blockchain protocol, block creation is reliant on validators. These entities bond the native asset (in this case, BAND) to the network and take part in the consensus protocol by broadcasting cryptographic signatures, or votes, to agree upon the next block. In exchange for their contributions to the network, validators are awarded transaction fees. These fees are then distributed proportionately among the stakeholders who have bonded their BAND. Staking is an integral part of PoS protocols as it motivates honest participation in the network and bolsters the network's security.

Validators are required to operate and maintain a software referred to as a node (see [Running a node](../node-validators/overview) for further details). However, you have the option to delegate your BAND to a validator and receive a portion of the staking rewards in line with your staked amount.

## Risks of Slashing

There must be some penalty imposed on the validators for any intentional or unintentional deviation from the sanctioned protocol. Some evidence is immediately admissible, such as a double-sign at the same height and round, or a violation of “prevote-the-lock” (a rule of the Tendermint consensus protocol). Such evidence will result in the validator losing its good standing and its bonded atoms as well its proportionate share of tokens in the reserve pool – collectively called its “stake” – will get slashed.

The slashing mechanism is a fundamental component of PoS protocols, including the Band Protocol. It acts as a preventive measure against malicious activities and violations within the network. Validators, by staking their BAND tokens, are motivated to operate in the best interest of the network. However, if they contravene these expectations, they stand to lose a part or all of their staked tokens

There are two primary conditions under which a validator can get slashed.

#### 1. Double Signing:

Double signing refers to the act of a validator signing two blocks at the same height on two different chains. This is considered a severe violation of the network protocol, and it can cause instability and uncertainty in the blockchain.

To deter this, Band Protocol imposes a significant penalty. If a validator is caught double signing, they face a slashing penalty of 5% of their staked and delegated BAND tokens.

What's critical to understand is that the penalty isn't limited to validators. If you've delegated your BAND tokens to a validator, and they engage in double signing, your staked tokens are also at risk. The 5% penalty also applies to the BAND tokens you've staked with that validator.

#### 2. Downtime:

A robust and reliable network necessitates active and consistent participation from validators. Validators in the Band Protocol have a duty to be online and operational to validate transactions and add new blocks to the blockchain.

If a validator is offline and misses a certain number of blocks, in this case, 30,000 blocks, they face a downtime penalty. A slashing penalty of 0.01% is imposed, and the validator is put into **jail**. This means they are prevented from signing any further blocks until they can prove they're back online and operational.

Again, if you've delegated your tokens to a validator and they're jailed due to downtime, your staked tokens also face the 0.01% slashing penalty.

These slashing risks underline the importance of due diligence when choosing a validator. You need to assess their security measures, reliability, and track record to ensure you don't inadvertently put your staked tokens at risk. Moreover, it highlights the importance of understanding the technicalities and rules of the protocol before staking or delegating your BAND tokens.

## How to choose a validator

On the Validators page, you will encounter a table that outlines various validators. This table is made up of 6 columns:

![validators page](/img/staking/all_validators_page.png)

- **Column 1 — Rank:** Represents the sequence of validators based on the number of tokens bonded to each validator.
- **Column 2 — Validator:** Name of validator
- **Column 3 — Voting Power:** Denotes the number of tokens bonded to a particular validator.
- **Column 4 — Commission:** Every validator charge commission on the rewards earned by the delegators on their behalf.
- **Column 5 — Uptime:** Demonstrates the proportion of blocks a validator has been active within the last 100 blocks.
- **Column 6 — Oracle Status:** shows that is this validator working as an oracle provider or not.

There are three factors you should consider when choosing a validator:

1. **Voting Power:** It's critical to distribute Voting Power across all validators for network security. You can contribute to strengthening the BandChain network by choosing validators with lower voting power.
2. **Commission:** A lower commission implies that you'll retain more rewards.
3. **Uptime:** As we discussed earlier in the Staking Risks section, validators with lower uptime are at a greater risk of getting slashed.

In conclusion, the decision on which validator to stake with requires careful consideration of these factors.
