# Supported Blockchains

:::caution

- We recommend experimenting with using our solution on a test network first before proceeding to mainnet.
- Please ONLY use the proxy contract as in the case that the base contract is updated, the proxy contract will always
  point to the correct base contract and show the most updated price feeds.

:::

Currently, our `StdReferenceProxy` smart contracts are available on the following networks:

## Testnets

| Blockchain        |                                                      `StdReferenceProxy` Contract Address                                                      |
| ----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------: |
| Astar (Shibuya)   |        [0x2Bf9a731f9A56C59DeB4DF1369286A3E69F5b418](https://blockscout.com/shibuya/address/0x2Bf9a731f9A56C59DeB4DF1369286A3E69F5b418)         |
| Bitgert           |    [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://testnet-explorer.brisescan.com/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)     |
| BitTorrent Chain  |         [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://testnet.bttcscan.com/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)          |
| Celo (Alfajores)  | [0x3d00deA966314E47aC3D4ACd2f00121351Cec1C5](https://alfajores-blockscout.celo-testnet.org/address/0x3d00deA966314E47aC3D4ACd2f00121351Cec1C5) |
| Cronos            |         [0xD0b2234eB9431e850a814bCdcBCB18C1093F986B](https://testnet.cronoscan.com/address/0xD0b2234eB9431e850a814bCdcBCB18C1093F986B)         |
| Cronos zkEVM      |   [0x712f9E98E72E1EB7aA7E3B58eC6F9a93FB5bfc46](https://explorer.zkevm.cronos.org/testnet/address/0x712f9e98e72e1eb7aa7e3b58ec6f9a93fb5bfc46)   |
| Coti              | [0xb6256dcb23cee06eda2408e73945963606fdddd7](https://testnet.cotiscan.io/address/0xb6256dcb23cee06eda2408e73945963606fdddd7?tab=transactions)  |
| Godwoken          |         [0x0c2362c9a0586dd7295549c65a4a5e3afe10a88a](https://v1.betanet.gwscan.com/address/0x0c2362c9a0586dd7295549c65a4a5e3afe10a88a)         |
| Harmony           |           [0xD0b2234eB9431e850a814bCdcBCB18C1093F986B](https://explorer.pops.one/address/0xd0b2234eb9431e850a814bcdcbcb18c1093f986b)           |
| Horizen (Gobi)    |       [0xdE2022A8aB68AE86B0CD3Ba5EFa10AaB859d0293](https://gobi-explorer.horizen.io/address/0xdE2022A8aB68AE86B0CD3Ba5EFa10AaB859d0293)        |
| Icon (Berlin)     |    [cxd2bac764a0277efb9a6861fa991be4e5a46f16a2](https://berlin.tracker.solidwallet.io/contract/cxd2bac764a0277efb9a6861fa991be4e5a46f16a2)     |
| Icon (Lisbon)     |    [cx734512ad03efdcedb69e0526415a7ce21340e0db](https://lisbon.tracker.solidwallet.io/contract/cx734512ad03efdcedb69e0526415a7ce21340e0db)     |
| Meter             |      [0xe1bCC505f2Bdd02C9480C924856f5080834A3897](https://scan-warringstakes.meter.io/address/0xe1bCC505f2Bdd02C9480C924856f5080834A3897)      |
| Monad             |       [0xb6256dcb23cee06eda2408e73945963606fdddd7](https://testnet.monadexplorer.com/address/0xb6256dcb23cee06eda2408e73945963606fdddd7)       |
| Nibiru            |        [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://evm-explorer.nibiru.fi/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)         |
| Oasis (Emerald)   |  [0x61704EFB8b8120c03C210cAC5f5193BF8c80852a](https://testnet.explorer.emerald.oasis.dev/address/0x61704EFB8b8120c03C210cAC5f5193BF8c80852a)   |
| Oasis (Sapphire)  |  [0x0c2362c9A0586Dd7295549C65a4A5e3aFE10a88A](https://testnet.explorer.sapphire.oasis.dev/address/0x0c2362c9A0586Dd7295549C65a4A5e3aFE10a88A)  |
| PlatON            |      [0xb6256DCb23CEE06eDa2408E73945963606fdddd7](https://devnet2scan.platon.network/address/0xb6256DCb23CEE06eDa2408E73945963606fdddd7)       |
| Secret (Pulsar-3) |     [secret14swdnnllsfvtnvwmtvnvcj2zu0njsl9cdkk5xp](https://secretnodes.com/pulsar/accounts/secret14swdnnllsfvtnvwmtvnvcj2zu0njsl9cdkk5xp)     |
| Soneium Minato    |     [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://explorer-testnet.soneium.org/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)      |
| Sonic             |         [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://testnet.soniclabs.com/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)         |

## Mainnets

| Blockchain         |                                                          `StdReferenceProxy` Contract Address                                                          |
| ------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
| Astar (Astar)      |             [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://blockscout.com/astar/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)              |
| Astar (Shiden)     |               [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://shiden.subscan.io/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)               |
| BitTorrent Chain   |                 [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://bttcscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)                  |
| BNB                |                  [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://bscscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)                  |
| Celo               |               [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://explorer.celo.org/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)               |
| Cronos             |                 [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://cronoscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)                 |
| Cronos zkEVM       |           [0x4ef80a75ac964d9eb366263a065ed35c842efe40](https://explorer.zkevm.cronos.org/address/0x4ef80a75ac964d9eb366263a065ed35c842efe40)           |
| Ethereum           |                 [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://etherscan.io/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)                  |
| Flow               |                                       [0x6801a6222ebf784a](https://www.flowdiver.io/account/0x6801a6222ebf784a)                                        |
| Godwoken           |                 [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://v1.gwscan.com/account/0xda7a001b254cd22e46d3eab04d937489c93174c3)                 |
| Horizen (EON)      |          [0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1](https://eon-explorer.horizenlabs.io/address/0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1)          |
| Harmony            |             [0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1](https://explorer.harmony.one/address/0xA55d9ef16Af921b70Fed1421C1D298Ca5A3a18F1)              |
| Icon (Java)        |            [cxe647e0af68a4661566f5e9861ad4ac854de808a2](https://tracker.icon.community/contract/cxe647e0af68a4661566f5e9861ad4ac854de808a2)            |
| Meter              |                 [0x861C20f77f194EEa4f86e0d39069D789265A3A82](https://scan.meter.io/address/0x861C20f77f194EEa4f86e0d39069D789265A3A82)                 |
| Moonriver          |             [0x75B01902D9297fD381bcF3B155a8cEAC78F5A35E](https://moonriver.moonscan.io/address/0x75B01902D9297fD381bcF3B155a8cEAC78F5A35E)             |
| Nibiru             |                  [0x9503d502435f8e228b874Ba0F792301d4401b523](https://nibiscan.io/address/0x9503d502435f8e228b874Ba0F792301d4401b523)                  |
| Oasis (Emerald)    |          [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://explorer.emerald.oasis.dev/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)           |
| Oasis (Sapphire)   |      [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://explorer.oasis.io/mainnet/sapphire/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)       |
| Optimism           |            [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://optimistic.etherscan.io/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)            |
| PlatON             |              [0xDA7a001b254CD22e46d3eAB04d937489c93174C3](https://scan.platon.network/address/0xda7a001b254cd22e46d3eab04d937489c93174c3)              |
| Secret 4           | [secret1ezamax2vrhjpy92fnujlpwfj2dpredaafss47k](https://secretnodes.com/secret/chains/secret-4/accounts/secret1ezamax2vrhjpy92fnujlpwfj2dpredaafss47k) |
| Sonic              |                 [0x506085050Ea5494Fe4b89Dd5BEa659F506F470Cc](https://sonicscan.org/address/0x506085050Ea5494Fe4b89Dd5BEa659F506F470Cc)                 |
| XRPL EVM Sidechain |         [0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68](https://explorer.testnet.xrplevm.org/address/0x8c064bCf7C0DA3B3b090BAbFE8f3323534D84d68)          |
