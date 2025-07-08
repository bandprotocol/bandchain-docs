# What is Data Tunnel?

In BandChain v3, price data is constantly and automatically updated through the concurrent price stream module. This price data is publicly accessible and can be used off-chain without any charge. However, to utilize the price data on a different blockchain, the price data needs to be passed through a **data tunnel** to ensure data integrity.

BandChain allows developers to create a tunnel specifying the pricing symbols (signals), the feeding interval, and the price deviation triggering condition. Once registered, BandChain continuously and automatically checks for data delivery conditions, which are met if any of the following occurs:

- The time since the last feeding interval delivery exceeds the specified feeding interval.
- The last fed price of the signal differs from the current price by more than the specified price deviation.

Each time price data is delivered, BandChain incurs a cost to the tunnel creator. Tunnel creators are responsible for monitoring the tunnel’s balance and depositing more BAND to ensure continuous availability. If the tunnel runs out of funds, it will be deactivated and stop triggering price feeds.
