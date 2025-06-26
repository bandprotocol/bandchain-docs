# Overview

## What is Node

A node in the context of the BandChain network refers to any computer equipped with the necessary software to interface with the network. These nodes, by connecting and communicating with one another, play a pivotal role in transmitting information, validating transactions, and maintaining the ledger's overall integrity. Although the terms 'node' and 'client' can be mistakenly interchanged, they represent two distinct components of the blockchain ecosystem. The 'node' denotes the connected computers, while the 'client' is the software running on these computers.

A specific type of node, known as a full-node, carries out more comprehensive tasks within the network. It does not only participate in the information exchange and transaction validation process; it stores and verifies the entire blockchain's state. By maintaining a complete copy of the blockchain, a full-node contributes significantly to the robustness, decentralization, and security of the entire network.

## What is Validator

In the world of blockchain and decentralized finance, a validator plays a crucial role in maintaining the health, security, and smooth operation of the network. Essentially, a validator is a network participant that verifies and validates new transactions and adds them to the blockchain. They do this by running a full node that is constantly synced with the network and participating in the consensus protocol, which can vary from one blockchain to another. In proof-of-stake (PoS), validators are chosen based on the number of tokens they hold and are willing to **stake** as collateral.

Validators are responsible for performing two main functions on the network. First, they are responsible for proposing and committing new blocks to the blockchain. They participate in the block consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key. This is similar to most other Cosmos-based delegated proof-of-stake blockchains.
 
Each validator will have a certain amount of BAND tokens bonded to them. The source of these tokens can either be their own holdings, or the tokens delegated to them by other token owners. In most cases, there will be a large number of parties with tokens staked to them. In that case, the top 100 validator candidates with the most token staked to them will become BandChain’s validators.

## Running a Node

There are two networks you can join.If this is your initial experience operating a validator on BandChain, we advise you to begin by running a node on the testnet.

- [Joining Mainnet](./02-run-node/01-joining-mainnet/01-getting-started.md)
- [Joining Testnet](./02-run-node/02-joining-testnet/01-getting-started.md)

An node is simply any computer running the software needed to connect with the BandChain network. Nodes connect with one another to send information back and forth to validate transactions and store data about the state of the blockchain.

Though the terms are often used interchangeably these connected computers are the nodes and the software that they run is called the client.

A full-node is a node that stores and verifies the entire state of a blockchain.
