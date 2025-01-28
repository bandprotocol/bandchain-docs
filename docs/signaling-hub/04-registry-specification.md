# Registry Specification

Registry is used to manage the sources of cryptocurrency prices and the operations to be performed on the prices obtained from these sources. The registry is a YAML file that specifies the sources and operations for each cryptocurrency.

Each Signal is associated with a single file and is contained in a directory for each category. Categories are classified by their processor functions and type. For example, CS (crypto spot price) would be a category and contain Signals like ETH-USD.

An example for the `CS.yaml` in CS would be:

```yaml
processor:
  function: weighted_median
  params:
    source_weights:
      binance: 1
      bybit: 1
      coinbase: 1
      coingecko: 1
      coinmarketcap: 1
      cryptocompare: 1
      htx: 1
      kraken: 1
      okx: 1
    minimum_cumulative_weight: 1
```

The processor field specifies the operation to be performed on the prices obtained from all sources. The function field in the processor object is a string that specifies the operation (e.g., "median", "weighted_median"), and the params field is an object that specifies the parameters for the operation.

Here is an example of an entry in the registry for Signal ID `CS/ETH-USD.yaml`:

```yaml
sources:
  - source_id: binance
    id: ethusdt
    routes:
    - signal_id: CS:USDT-USD
      operation: '*'
  - source_id: coingecko
    id: ethereum
```

In the above example, the `sources` field specifies the sources from which the prices of Ethereum will be fetched. Each source is represented by an object that contains the `source_id` and `id` fields. The `source_id` field is a string that identifies the source (e.g., "binance" or "coingecko"), and the `id` field is a string that identifies the cryptocurrency on the source (e.g., "ethusdt" on Binance or "ethereum" on CoinGecko).

The `routes` field in each source specifies the operations to be performed on the prices obtained from the source. Each operation is represented by an object that contains the `signal_id` and `operation` fields. The `signal_id` field is a string that identifies another cryptocurrency whose price will be used in the operation, and the `operation` field is a string that specifies the operation to be performed (e.g., "*" for multiplication).
