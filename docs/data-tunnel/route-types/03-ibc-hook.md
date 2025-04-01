# IBC Hook Route

> This route type is coming soon.

## Overview

The **IBC Hook Route** is an extension of the **IBC Route**, used to transmit tunnel packet data from **BandChain** to other **Cosmos SDK-based blockchains**. Unlike the standard IBC Route that sends data to the core Cosmos-based application, the IBC Hook Route utilizes **ICS-20 token transfers** to interact directly with WASM contracts on the destination chain. This enables consumers to create smart contracts that receive real-time price data from BandChain and seamlessly integrate it into their applications.

## Creating an IBC Hook Tunnel

To create an IBC Hook Tunnel using the command-line interface (CLI), execute the following command:

```bash
bandd tx tunnel create-tunnel ibc-hook [channel-id] [destination-contract-address] [initial-deposit] [interval] [signalInfos-json-file]
```

### Parameters:

- **channel-id**: The IBC channel ID used for transmission. This needs to be the channel of the `transfer` port (e.g., `channel-0`).
- **destination-contract-address**: The WASM contract address on the destination chain.
- **initial-deposit**: The initial deposit required to create the tunnel.
- **interval**: The frequency at which price updates are sent.
- **signalInfos-json-file**: A JSON file containing signal information for the tunnel.

This command initializes an IBC Hook Tunnel that facilitates the secure transmission of real-time price data from **BandChain** to a **WASM contract** on another Cosmos SDK-based blockchain.

## Updating an IBC Hook Tunnel

BandChain allows tunnel creators to modify certain route details. In this case, tunnel creators can update the **IBC channel ID** and **destination WASM contract address** using the following command:

```bash
bandd tx tunnel update-route ibc-hook [tunnel-id] [channel-id] [destination-contract-address]
```

## Fee Collection

This route does not require any additional fees. You only need to pay the base fee by sending `uband` to the tunnel fee payer address.

## Implementing a WASM Contract

Below is an example implementation of a WASM contract to support an **IBC Hook Tunnel**. The full implementation will be available in the cw-band repository [Link to be added].

```rust
#[cfg(not(feature = "library"))]
use cw_band::tunnel::packet::{Price, TunnelPacket};

pub fn execute_receive_packet(
    deps: DepsMut,
    info: MessageInfo,
    packet: TunnelPacket,
) -> Result<Response, ContractError> {
    if !SENDERS.has(deps.storage, info.sender) {
        return Err(ContractError::Unauthorized);
    }

    for price in packet.prices {
        let signal_id = &price.signal_id;
        match SIGNAL_PRICE.may_load(deps.storage, signal_id)? {
            // If there is no existing price for this signal, save it
            None => SIGNAL_PRICE.save(deps.storage, signal_id, &price)?,
            // If there is an existing price for this signal, save it only if it is newer
            Some(last_price) if last_price.timestamp < price.timestamp => {
                SIGNAL_PRICE.save(deps.storage, signal_id, &price)?
            }
            // Otherwise, do nothing
            _ => {}
        }
    }

    let res = Response::new()
        .add_attribute("action", "receive_packet")
        .add_attribute("success", "true");
    Ok(res)
}
```
