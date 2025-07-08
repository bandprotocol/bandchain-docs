# High-Level Overview

[Band](https://bandprotocol.com) is a unified data layer aggregating and connecting real-world data and APIs to AI and smart contracts.

Band is known for delivering price data to Web3 since 2018. The protocol is built on top of [BandChain](https://github.com/bandprotocol/chain), a Cosmos-SDK-based blockchain designed to be compatible with most smart contract and blockchain development frameworks.

The network is designed to modularize and offload the task of constatly monitoring price data and react to price changes across all asset classes from the smart contract platforms onto itself. This not only prevents such tasks from congesting or causing high transaction fees on the destination network, but the same data points can be packaged, used, and verified efficiently across multiple blockchains.

Since the [launch of our GuanYu mainnet](https://medium.com/bandprotocol/bandchain-phase-1-successful-mainnet-upgrade-and-guanyu-launch-ac2d0334da77) back in October 2020, we have seen an exponential increase in adoption in a diverse array of use cases. From applications in lending, money markets, gambling, asset, and tokenization, to both on-chain and real-world insurance.

With the **V3 upgrade**, BandChain shifts focus exclusively to price data. This allows BandChain to achieve sub-second price data update across more than hundreds of regularly used symbols. Consumers can specify the interval of price updates they need, possibly with price deviation to react to sudden price movements. BandChain provides options for consumers to receive price data either through the standaized [Inter-Blockchain Communication (IBC)](https://ibc.cosmos.network/) standard or via several well-known third party trustless cross chain communication service. Additionally, BandChain provides native TSS (threshold-signature) based data verification for efficient on-chain verification without reliance on third party. For offchain usage, price data on BandChain are available as public-good for free of charge.
