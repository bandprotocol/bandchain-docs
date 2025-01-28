# Data Feeding Guarantee

## Feeding Interval Algorithm
To incentivize BAND holders to vote their desired price symbols and to optimize the load on BandChain, a symbol’s feeding interval is calculated based on the total power it receives, governed by several parameters:

- `MIN_INTERVAL`: The minimum possible feeding interval for a symbol.
- `MAX_INTERVAL`: The maximum possible feeding interval for a symbol.
- `POWER_STEP`: The voting power required for a symbol to move to the next feeding interval step.

The feeding interval algorithm operates as follows:
1. A symbol is eligible for price feeding if its power exceeds the POWER STEP.
2. The symbol’s power factor is determined by dividing the power by POWER STEP and rounding down.
3. The feeding interval is calculated as MAX INTERVAL divided by the power factor, capped at MIN INTERVAL.

Validators are responsible for updating the price data of each symbol according to its feeding interval. Validators must submit price updates at least once per interval. Given that there are a hundred validators on BandChain, price updates occur much more frequently in practice. Developers of decentralized applications must vote for the necessary symbols to ensure their availability with adequate feeding intervals.

## Current Feeds Update

At intervals defined by the `UPDATE_INTERVAL` governance parameter, the list of supported symbols and their feeding intervals are updated. To maintain data quality and efficient block space usage, only the top symbols, up to the maximum count specified by the `MAX_SUPPORTED_FEEDS` governance parameter, will be supported. This parameter may be adjusted by the community as needed and as more performant hardware becomes available to handle increased throughput. During the feeds update period, validators must update their software configurations to include potentially new signals with their respective feeding intervals.
