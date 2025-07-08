# Grogu and Bothan

## Grogu

Grogu is a program that is used by BandChain's validator nodes to automatically get send price data for Feeds module(Price Stream service).

Since a subset of validators who are selected for Price Stream service need to maintain to price of all current feeds by providing price data with a `MsgSubmitSignalPrices` transaction to BandChain for every specified interval to fulfill their duty.

Although the transaction can be sent manually by user, it is not convenient, and would be rather time-consuming.
Furthermore, most data providers already have APIs that can be used to query data automatically by another software.
Therefore, we have developed [Bothan](#bothan) to help validators to automatically query data from data providers, then Grogu to submit the result to fulfill the Price Stream.

Grogu's execution flow consists of the following steps

1. Query chain on current feeds, validator status and its latest submitted prices.
2. Get prices of required signals from Bothan.
3. Calculate on which signals are required to be updated.
4. Collect price data and store in local pending list.
5. Pack price data and send to BandChain.

Grogu usually run as a process alongside the main BandChain daemon process. It holds multiple wallet (private key) accounts called a `feeder account`, which is owned by validator account. The feeder account is used to help validator submit
transactions of price data.

The reason of using feeder account instead of validator account is to maintain security of validator's private key.
If Grogu's server is compromised, then feeder's private key may be exposed but not validator's private key.
Moreover, most validators use hardware wallets, which is not designed for server that runs 24/7.

![Grogu's diagram](https://i.imgur.com/FmH2xxH.png)

The image above represents high-level mechanism of Grogu.

### 1. Query chain on current feeds, validator status and its latest submitted prices

Grogu first queries the chain for its required feeds, validator status, and the latest submitted prices. It then uses the validator status to determine whether price data submission is required. If submission is not needed, it simply waits for the validator status to become valid before proceeding.

### 2. Get prices of required signals from Bothan

After querying the required feeds, Grogu filters out signals that are already pending in the submission process. It then retrieves the prices for the remaining signals from Bothan.

### 3. Calculate on which signals are required to be updated

After getting prices data from Bothan, it filters the signals to include only those that need to be sent based on their interval, deviation and price status.

### 4. Collect price data and store in local pending list

Once the price data is filtered, Grogu appends them to a pending queue. Since submitting a transaction takes time and signing multiple transactions simultaneously is not possible, the pending list may accumulate over time.

### 5. Pack price data and send to BandChain.

When Grogu's feeder account is ready to sign a transaction, it constructs a `MsgSubmitSignalPrices` message using all pending price data in the queue. It then creates a transaction, which the feeder account signs and submits to BandChain.

Grogu also has the responsibility of updating the Bothan registry. It does this by querying the chain for the latest registry IPFS hash and version, then updating Bothan accordingly.

## Bothan

Bothan is an independent program designed for querying and interacting with various cryptocurrency price data APIs.

Its primary goal is to serve as the go-to price hub and cache for Grogu, reducing delay times and efficiently streamlining and summarizing price data from multiple sources.

## Bothan flow

Bothan's execution flow consists of the following steps

1. Validate and register Bothan registry.
2. Start each source API workers.
3. Query all source via REST/Websocket by signals in the registry and update the price.
4. Receive price request and return requested price data.
5. Send record to Bothan monitoring.

### Bothan registry

Bothan uses a system of registries to manage the sources of cryptocurrency prices and the operations to be performed on the prices obtained from these sources. The registry is a YAML file that specifies the sources and operations for each cryptocurrency.

The registry specification is defined at [Registry Specification](../signaling-hub/04-registry-specification.md)

If Bothan is requested to provide a signal that is not in the registry, it will return the status `STATUS_UNSUPPORTED`. To add new signals or make changes to existing ones, you can create a pull request at the [registry](https://github.com/bandprotocol/registry).

### Bothan monitoring

Bothan Monitoring is a dedicated service provided by Band to ensure the smooth operation and reliability of Bothan. It serves two primary purposes:

1. Health Check Monitoring:
   The service continuously tracks the health status of the Bothan program, ensuring that all its components are functioning correctly. This includes monitoring uptime, performance metrics, API connectivity, and the status of all workers interacting with various price data sources.

2. Price Data Tracking:
   Bothan Monitoring also logs and tracks all price data entries processed by Bothan. This ensures that data is being collected, cached, and updated accurately. It provides transparency and accountability by maintaining a detailed record of prices received from different sources and their subsequent updates.

By leveraging Bothan Monitoring, Band ensures the system is robust, reliable, and capable of delivering accurate price data to users while minimizing downtime and data inconsistencies.
