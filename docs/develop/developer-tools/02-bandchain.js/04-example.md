# Common Usage Examples

This page demonstrates practical usage examples of BandChain.js for common blockchain operations. All examples use the signing client setup shown below, which is suitable for development and testing purposes only.

> **Important**: These examples are for development and demonstration purposes only. Do not use these patterns in production applications. For production-ready examples, see the [official repository examples](https://github.com/bandprotocol/bandchain.js/tree/master/example).

## Setup Functions

The examples below use these helper functions to create signing clients:

```js
import { getOfflineSignerAmino as getOfflineSigner } from 'cosmjs-utils'
import { getSigningClient } from '@bandprotocol/bandchain.js'

const mnemonic =
  'other clutch garage magic remind gentle hamster viable crash youth rebuild peasant' // SECURITY: Add mnemonic to your .env file - DO NOT use this default mnemonic in production!
const rpcEndpoint = 'https://rpc.band-v3-testnet.bandchain.org' // Testnet RPC endpoint

// Creates a standard Cosmos signing client for basic operations
const getSignerClient = async () => {
  const signer = await getOfflineSigner({
    mnemonic,
    chain: {
      bech32_prefix: 'band', // Band address prefix
      slip44: 494, // Band coin type
    },
  })

  const cosmosClient = await getSigningClient({
    rpcEndpoint,
    signer,
  })

  return cosmosClient
}

// Creates a Band specific signing client with additional Band modules
const getBandSignerClient = async () => {
  const signer = await getOfflineSigner({
    mnemonic,
    chain: {
      bech32_prefix: 'band', // Band address prefix
      slip44: 494, // Band coin type
    },
  })

  const [account] = await signer.getAccounts()

  console.log(account) // Log the account for debugging

  const bandClient = await getSigningBandClient({
    rpcEndpoint,
    signer,
  })

  return bandClient
}
```

## Vote on Signal

This example demonstrates how to vote on price feed signals using BandChain feeds module. Signal voting is used in Band's price feed system to indicate which price feeds validators should support.

```js
import { band } from '@bandprotocol/bandchain.js'

async function voteSignal() {
  const signer = await getBandSignerClient()

  const fromAddress = 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k' // Voter's address

  const fee = {
    amount: [
      {
        denom: 'uband', // Fee denomination in micro-BAND
        amount: '5000', // Fee amount (0.005 BAND)
      },
    ],
    gas: '200000', // Gas limit for the transaction
  }

  // Import the vote message composer from Band's feeds module
  const { vote } = band.feeds.v1beta1.MessageComposer.withTypeUrl

  // Create a vote message with signal preferences
  const msgvote = band.feeds.v1beta1.MsgVote.fromPartial({
    voter: 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k', // Must match fromAddress
    signals: [
      {
        id: 'CS:BTC-USD', // Signal ID for BTC-USD price feed
        power: BigInt(100), // Voting power allocation (higher = more preference)
      },
      {
        id: 'CS:ETH-USD', // Signal ID for ETH-USD price feed
        power: BigInt(50), // Voting power allocation
      },
    ],
  })

  // Convert to properly formatted message with type URL
  const msg = vote(msgvote)

  // Sign and broadcast the transaction
  const response = await signer.signAndBroadcast(fromAddress, [msg], fee)

  return response
}
```

## Send BAND Token

This example shows how to send BAND tokens from one address to another using the Cosmos SDK bank module.

```js
import { cosmos } from '@bandprotocol/bandchain.js'

const sendToken = async () => {
  const signer = await getSignerClient()

  const fromAddress = 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k' // Sender's address
  const toAddress = 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k' // Recipient's address (sending to itself in this example)

  const fee = {
    amount: [
      {
        denom: 'uband', // Fee denomination in micro-BAND
        amount: '5000', // Fee amount (0.005 BAND)
      },
    ],
    gas: '200000', // Gas limit for the transaction
  }

  // Import the send message composer from Cosmos SDK bank module
  const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl

  // Create a send message
  const msgSend = cosmos.bank.v1beta1.MsgSend.fromPartial({
    fromAddress,
    toAddress,
    amount: [
      {
        denom: 'uband', // Token denomination in micro-BAND
        amount: '1000000', // Amount to send (1 BAND = 1,000,000 uband)
      },
    ],
  })

  // Convert to properly formatted message with type URL
  const msg = send(msgSend)

  // Sign and broadcast the transaction
  const response = await signer.signAndBroadcast(fromAddress, [msg], fee)

  return response
}
```

## Get Tunnels

This example demonstrates how to query tunnel information from BandChain tunnel module. Tunnels are used for cross-chain communication and data routing in BandChain infrastructure.

```js
const getTunnels = async () => {
  // Create a read-only query client (no wallet required)
  const { createRPCQueryClient } = band.ClientFactory
  const client = await createRPCQueryClient({ rpcEndpoint })

  // Query tunnels with filtering and pagination
  const response = await client.band.tunnel.v1beta1.tunnels({
    statusFilter: 1, // Filter by tunnel status (1 = active tunnels)
    pagination: {
      key: new Uint8Array(), // Pagination key (empty for first page)
      offset: BigInt(0), // Number of items to skip
      limit: BigInt(100), // Maximum number of items to return
      countTotal: true, // Whether to count total items
      reverse: false, // Whether to reverse the order
    },
  })

  return response // Returns tunnel data with pagination info
}
```

## Get TSS Groups

This example shows how to query Threshold Signature Scheme (TSS) groups from BandChain TSS module. TSS groups are used for distributed key management and multi-party computation in BandChain security infrastructure.

```js
const getTSSGroups = async () => {
  // Create a read-only query client (no wallet required)
  const { createRPCQueryClient } = band.ClientFactory
  const client = await createRPCQueryClient({ rpcEndpoint })

  // Query TSS groups with pagination
  const response = await client.band.tss.v1beta1.groups({
    pagination: {
      key: new Uint8Array(), // Pagination key (empty for first page)
      offset: BigInt(0), // Number of items to skip
      limit: BigInt(100), // Maximum number of items to return
      countTotal: true, // Whether to count total items
      reverse: false, // Whether to reverse the order
    },
  })

  return response // Returns TSS group data including member information and thresholds
}
```

## Get Feeds Data

This example demonstrates how to query price feed data from BandChain feeds module using a read-only client. No wallet or transaction fees are required for queries.

```js
const getFeedPrices = async () => {
  // Create a read-only query client (no wallet required)
  const { createRPCQueryClient } = band.ClientFactory
  const client = await createRPCQueryClient({ rpcEndpoint })

  // Query all available price feed data from Band
  const prices = await client.band.feeds.v1beta1.allPrices()

  return prices // Returns array of price feed data with symbols, prices, and timestamps
}
```

## Send BAND Token via IBC Transfer

This example shows how to transfer BAND tokens to another blockchain using the Inter-Blockchain Communication (IBC) protocol. This enables cross-chain token transfers between Band and other Cosmos SDK chains.

> **Note**: You can view all active testnet channels at https://band-v3-testnet.cosmoscan.io/channel?port=transfer&channel=channel-8

```js
const sendIBC = async () => {
  const signer = await getSignerClient()

  const fromAddress = 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k' // Sender's address on BandChain

  const fee = {
    amount: [
      {
        denom: 'uband', // Fee denomination in micro-BAND
        amount: '5000', // Fee amount (0.005 BAND)
      },
    ],
    gas: '200000', // Gas limit for the transaction
  }

  // Import the IBC transfer message composer
  const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl

  // Create an IBC transfer message
  const msgTransfer = ibc.applications.transfer.v1.MsgTransfer.fromPartial({
    sourcePort: 'transfer', // Standard IBC transfer port
    sourceChannel: 'channel-8', // IBC channel ID for the destination chain
    token: {
      denom: 'uband', // Token denomination to transfer
      amount: '1000000', // Amount to transfer (1 BAND = 1,000,000 uband)
    },
    sender: fromAddress, // Sender's address on BandCahin
    receiver: 'osmo1yrku9wh2amtsfxsegj4082k609cd8p85dsnsjd', // Recipient's address on destination chain (Osmosis in this example)
    timeoutHeight: {
      revisionNumber: BigInt(1), // Chain revision number
      revisionHeight: BigInt(1000000), // Block height timeout (far in future)
    },
    timeoutTimestamp: BigInt(0), // Timestamp timeout (0 = use height timeout only)
  })

  // Convert to properly formatted message with type URL
  const msg = transfer(msgTransfer)

  // Sign and broadcast the transaction
  const response = await signer.signAndBroadcast(fromAddress, [msg], fee)

  return response
}
```

## Delegate to Validator

This example demonstrates how to delegate BAND tokens to a validator for staking. Delegation allows token holders to participate in network security and earn staking rewards while supporting validator operations.

```js
const delegateStaking = async () => {
  const signer = await getSignerClient()

  const fromAddress = 'band1qjte252y5wk3vj0tk2cmgw64pwkxsg0n22pa4k' // Delegator's address
  const validatorAddress = 'bandvaloper1uu9ajlendcxzem8hdkfac40pl9umekamw32emt' // Validator's operator address

  const fee = {
    amount: [
      {
        denom: 'uband', // Fee denomination in micro-BAND
        amount: '5000', // Fee amount (0.005 BAND)
      },
    ],
    gas: '200000', // Gas limit for the transaction
  }

  // Import the delegate message composer from Cosmos SDK staking module
  const { delegate } = cosmos.staking.v1beta1.MessageComposer.withTypeUrl

  // Create a delegation message
  const msgDelegate = cosmos.staking.v1beta1.MsgDelegate.fromPartial({
    delegatorAddress: fromAddress, // Address of the token holder delegating
    validatorAddress, // Validator's operator address (starts with 'bandvaloper')
    amount: {
      denom: 'uband', // Token denomination in micro-BAND
      amount: '1000000', // Amount to delegate (1 BAND = 1,000,000 uband)
    },
  })

  // Convert to properly formatted message with type URL
  const msg = delegate(msgDelegate)

  // Sign and broadcast the transaction
  const response = await signer.signAndBroadcast(fromAddress, [msg], fee)

  return response // Returns transaction result with delegation details
}
```
