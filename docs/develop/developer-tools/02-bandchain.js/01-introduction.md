# Introduction

[**BandChain.js**](https://github.com/bandprotocol/bandchain.js) is a comprehensive TypeScript library designed for seamless interaction with BandChain and Cosmos SDK blockchains. Built with modern web standards and developer experience in mind, it provides a complete toolkit for both blockchain queries and transaction execution.

## Core Capabilities

**🔍 Query Client**

- **REST & gRPC Integration**: Built on gRPC-web protocol, sending HTTP/1.5 or HTTP/2 requests through a gRPC proxy server
- **Multi-Protocol Support**: Access both Band Protocol-specific data (oracle requests, price feeds, TSS operations) and standard Cosmos modules (bank balances, staking info, governance proposals)
- **Type-Safe Queries**: Fully typed query interfaces with auto-completion and compile-time validation
- **Cross-Platform**: Native support for both Node.js environments and modern browsers

**⚡ Message Composer**

- **Type-Safe Transaction Building**: Compose complex multi-message transactions with full TypeScript support
- **Dual Composition Patterns**: Choose between `fromPartial` (message data only) and `withTypeUrl` (complete protobuf messages) based on your needs
- **Comprehensive Module Support**: Pre-built message composers for all Band Protocol modules (oracle, feeds, tss, tunnel) and Cosmos SDK modules (bank, staking, governance, distribution, authz)
- **Batch Operations**: Combine multiple operations in a single transaction for gas efficiency

**🔐 Transaction Management**

- **Wallet Integration**: Seamless integration with popular Cosmos wallets (Keplr, Cosmostation, WalletConnect)
- **Signing Flexibility**: Support for both online and offline signing workflows
- **Fee Estimation**: Automatic gas estimation and fee calculation
- **Error Handling**: Robust error handling with detailed transaction failure information

## Technical Architecture

The library is implemented using:

- **Protocol Buffer Code Generation**: Automated TypeScript bindings generated from official proto definitions using [@cosmology/telescope](https://github.com/cosmology-tech/telescope)
- **CosmJS Integration**: Built on top of the battle-tested CosmJS ecosystem for maximum compatibility
- **Dual Build System**: Supports both CommonJS and ESM module formats for universal compatibility
- **Modern TypeScript**: Full TypeScript 5.x support with strict type checking and comprehensive IDE support

The library supports both Node.js server environments and browser-based applications, making it the go-to solution for any TypeScript project interacting with BandChain or Cosmos SDK blockchains.
