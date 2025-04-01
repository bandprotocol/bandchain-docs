# IBC Route

> This route type is currently only available on BandChain v3 testnet.

## Overview

The **IBC Route** is one of the tunnel routes used to transmit tunnel packet data from **BandChain** to other **Cosmos SDK-based blockchains**. To utilize this route, consumers have two options:

1. **Core Application Implementation**: Implement the `OnRecvPacket` function within the core application. This method requires Cosmos applications to update their chain to support the IBC tunnel.
2. **WASM Contract Implementation**: Implement a WASM contract to support the IBC tunnel. This method requires Cosmos applications to support WASM contracts.

## Creating an IBC Tunnel

Setting up an IBC tunnel requires two main steps:

1. First, create the tunnel using the following command:

   ```bash
   bandd tx tunnel create-tunnel ibc [initial-deposit] [interval] [signalInfos-json-file]
   ```

   Parameters:

   - **initial-deposit**: The initial deposit amount required to create the tunnel.
   - **interval**: The time interval at which data updates are sent.
   - **signalInfos-json-file**: A JSON file containing signal information for the tunnel.

2. After creating the tunnel, you **must** establish an IBC channel between BandChain and your destination chain. The port ID on BandChain needs to be: `tunnel.[your-tunnel-id]`

   > **Important**: The tunnel will not function until both steps are completed. The IBC channel must be properly established using the correct port format and the route must be updated with the correct channel ID.

   Once the channel is established, update the tunnel with the channel ID using:

   ```bash
   bandd tx tunnel update-route ibc [tunnel-id] [channel-id]
   ```

## Updating an IBC Route

BandChain allows tunnel creators to edit some route details. In this case, the tunnel creator can update the IBC channel ID by executing the following command:

```bash
bandd tx tunnel update-route ibc [tunnel-id] [channel-id]
```

## Fee Collection

This route does not require any additional fees. You only need to pay the base fee by sending `uband` to the tunnel fee payer address.

## Core App Implementation

Below is an example implementation of the `OnRecvPacket` function to support the IBC Tunnel on the destination chain. The complete implementation can be found in the [tunnel-consumer](https://github.com/bandprotocol/tunnel-consumer) repository.

```go
// OnRecvPacket implements the IBCModule interface
func (im IBCModule) OnRecvPacket(
	ctx sdk.Context,
	modulePacket channeltypes.Packet,
	relayer sdk.AccAddress,
) ibcexported.Acknowledgement {

	// Verify if the source channel is allowed in the parameters.
	if !slices.Contains(im.keeper.GetParams(ctx).ChannelIds, modulePacket.SourceChannel) {
		return channeltypes.NewErrorAcknowledgement(types.ErrInvalidChannelID)
	}

	var tunnelPacket tunneltypes.Packet

	// Unmarshal the data from the module packet into the Tunnel Packet object.
	if err := types.ModuleCdc.UnmarshalJSON(modulePacket.GetData(), &tunnelPacket); err != nil {
		return channeltypes.NewErrorAcknowledgement(err)
	}

	// Process each price update in the received tunnel packet.
	for _, tunnelPacketPrice := range tunnelPacket.Prices {
		price := types.Price{
			Status:    types.PriceStatus(tunnelPacketPrice.Status),
			SignalID:  tunnelPacketPrice.SignalID,
			Price:     tunnelPacketPrice.Price,
			Timestamp: tunnelPacketPrice.Timestamp,
		}
		im.keeper.SetPrice(ctx, price)
	}

	return channeltypes.NewResultAcknowledgement(nil)
}
```

## WASM Contract Implementation

Below is an example of implementing a WASM contract to support the IBC tunnel. The full example is available at [cw-band](https://github.com/bandprotocol/cw-band/blob/main/contracts/tunnel-consumer).

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_receive(
    deps: DepsMut,
    env: Env,
    msg: IbcPacketReceiveMsg,
) -> Result<IbcReceiveResponse, Never> {
    let packet = msg.packet;

    do_ibc_packet_receive(deps, env, &packet).or_else(|err| {
        Ok(
            IbcReceiveResponse::new(ack_fail(err.to_string())).add_attributes(vec![
                attr("action", "receive"),
                attr("success", "false"),
                attr("error", err.to_string()),
            ]),
        )
    })
}
```
