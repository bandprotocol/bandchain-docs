# Getting started

This guide serves as a quick reference on how to run Falcon.

### Step 1: Prepare an oracle script and data sources

There are two main components on the BandChain in the requesting process:

- [Oracle script](/develop/custom-scripts/oracle-script/introduction)
- [Data source](/develop/custom-scripts/data-source/introduction)

For requesting data from BandChain, you have to deploy both of them in the BandChain first so that your Falcon program can specify the `oracle_script_id` when sending the request.

### Step 2: Prepare Consumer contract

For Falcon to relay data to your contract, it need to implement functions `verifyProofAndHandleResponse(bytes calldata data)` for Falcon to call to relay the data

For example of Consumer contract please refer to the [BandBridgeConsumer](https://github.com/bandprotocol/BandBridgeConsumer)

### Step 3: Initialize and start Falcon

You can install falcon and start using it with this [documentation](https://github.com/bandprotocol/falcon/blob/main/docs/getting_started.md)