# Getting Started

BandChain.js provides two primary interaction patterns for working with the BandChain blockchain:

1. **Query Client** - Make read-only queries to fetch data from BandChain
2. **Message Composer** - Create messages and use `signAndBroadcast` to mutate BandChain state

## Installation

Before getting started, install BandChain.js and its peer dependencies:

```bash
npm install @bandprotocol/bandchain.js

# or

yarn add @bandprotocol/bandchain.js
```

## Simple Query

The query client allows you to read data from the blockchain without needing a wallet or paying transaction fees. This is perfect for fetching account balances, oracle data, validator information, and more.

> **Note**: This example is for demonstration purposes only. Do not use in production. Please see examples at https://github.com/bandprotocol/bandchain.js/tree/master/example

```ts
import { band } from '@bandprotocol/bandchain.js'

const { createRPCQueryClient } = band.ClientFactory
const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })

// now you can query the cosmos modules
const balance = await client.cosmos.bank.v1beta1.allBalances({
  address: 'band1njaq8de79s99g6tqwnfmgeqjw35lqrxtx8t5mc',
})
```

### What's happening in this query example:

1. **Import the band module**: The `band` object contains all BandChain-specific functionality
2. **Create RPC Query Client**: Uses `band.ClientFactory.createRPCQueryClient()` to create a read-only client that connects to a BandChain RPC endpoint
3. **Execute queries**: Access both Cosmos SDK modules (`cosmos.bank.v1beta1`) and Band Protocol modules (`band.oracle.v1`) through the client
4. **Type safety**: All query methods are fully typed, providing autocomplete and compile-time validation

The `RPC_ENDPOINT` should point to a BandChain RPC server. For available endpoints, please see [API Endpoints](/develop/api-endpoints).

Other query examples you can try:

- `client.band.oracle.v1.oracleScript({ oracleScriptId: BigInt(37) })` - Get oracle script info
- `client.cosmos.staking.v1beta1.validators({ status: 'BOND_STATUS_BONDED' })` - Get active validators
- `client.cosmos.gov.v1beta1.proposals({})` - Get governance proposals

## Simple Transaction

Transactions require a signing client that can create, sign, and broadcast messages to modify blockchain state. This includes operations like sending tokens, requesting oracle data, staking, voting on proposals, and more.

> **Note**: This example is for demonstration purposes only. Do not use in production. Please see examples at https://github.com/bandprotocol/bandchain.js/tree/master/example

```ts
import { cosmos, getSigningBandClient } from '@bandprotocol/bandchain.js'

// Import DirectSecp256k1HdWallet from the bundled cosmjs in bandchain.js
const { DirectSecp256k1HdWallet } = await import(
  '@bandprotocol/bandchain.js/node_modules/@cosmjs/proto-signing'
)

// Create a signer using the compatible DirectSecp256k1HdWallet
// not recommend using this signer in production. please use cosmos-kit instead
const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
  prefix: 'band',
})

const [account] = await signer.getAccounts()

// Create a signing client
const client = await getSigningBandClient({
  rpcEndpoint: rpcEndpoint,
  signer: signer,
})

// Send tokens
const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl
const msg = send({
  fromAddress: account.address,
  toAddress: 'band1njaq8de79s99g6tqwnfmgeqjw35lqrxtx8t5mc',
  amount: [{ denom: 'uband', amount: '1000000' }],
})

const fee = { amount: [{ denom: 'uband', amount: '5000' }], gas: '200000' }
const result = await client.signAndBroadcast(account.address, [msg], fee)

return result
```

### What's happening in this transaction example:

1. **Import signing functionality**: Import both the message composers (`cosmos`) and client creation function (`getSigningBandClient`)

2. **Create wallet from bundled CosmJS**: The code uses the bundled CosmJS version that comes with BandChain.js to ensure compatibility. This avoids version conflicts between different CosmJS packages.

3. **Initialize wallet**: Create a signing wallet from a mnemonic phrase with the `band` address prefix. This wallet will be used to sign transactions.

4. **Get account info**: Extract the first account from the wallet, which provides the address needed for transactions.

5. **Create signing client**: Initialize a `SigningStargateClient` that combines the RPC connection with the wallet signer.

6. **Compose message**: Use `cosmos.bank.v1beta1.MessageComposer.withTypeUrl` to create a properly formatted send message. The `withTypeUrl` method includes the protobuf type information needed for transaction encoding.

7. **Set transaction fee**: Define the fee in `uband` (micro-BAND) and gas limit. The example sends 1 BAND (1,000,000 uband) with a fee of 0.005 BAND (5,000 uband).

8. **Broadcast transaction**: Send the signed transaction to the network and return the result, which includes the transaction hash and execution status.

### Key concepts:

- **Message Composers**: BandChain.js provides two patterns:

  - `fromPartial` - Creates message objects without type URLs (for advanced use cases)
  - `withTypeUrl` - Creates complete messages ready for broadcasting (recommended for most cases)

- **Fee calculation**: Fees are paid in the chain's native token (BAND). You can estimate gas using `client.simulate()` before broadcasting.

- **Error handling**: Check `result.code === 0` to verify transaction success. Failed transactions will have error details in `result.rawLog`.

## Next Steps

Now that you understand the basics, you can:

- **Query more data**: Explore oracle requests, validator info, governance proposals, and staking rewards
- **Create complex transactions**: Combine multiple messages, interact with Band Protocol modules (oracle, feeds, TSS)
- **Handle errors**: Implement proper error handling and transaction confirmation waiting
- **Integrate with wallets**: Connect to browser wallets like Keplr for user-friendly dApp development
