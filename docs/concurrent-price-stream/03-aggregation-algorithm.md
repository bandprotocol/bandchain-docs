# Aggregation Algorithm

The aggregation algorithm in BandChain is designed to balance the amount of voting power required to influence the final medianized price data with the system’s ability to respond quickly to rapid price movements. Validators report data independently within the specified interval, which means that price data does not arrive simultaneously from all validators.

At any given time, the registered price for a symbol is the weighted median value of the prices reported by all validators who report `AVAILABLE` price. Price data is weighted by the validator’s voting power, with additional multipliers applied to prioritize more recent submissions.
BandChain applies multipliers to the most recent price points to ensure greater influence. The voting power is adjusted as follows:

| Percentile of Voting Power | Multiplier |
| -------------------------- | ---------- |
| 0-3.125%                   | 6x         |
| 3.125-9.375%               | 4x         |
| 9.375-21.875%              | 2x         |
| 21.875-46.875%             | 1.1x       |
| 46.875-100%                | 1x         |

Note that if the majority voting power of validators submits `UNSUPPORTED`, the aggregated final price will not be available, and the symbol will be registered as `INVALID`.
