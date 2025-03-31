# Tunnel Creation

Anyone can broadcast `MsgCreateTunnel` to create a new data tunnel on BandChain. The formal specification of the message is given below:

```protobuf
// SignalDeviation is the type for a signal with soft and hard deviation
message SignalDeviation {
  option (gogoproto.equal) = true;

  // signal_id is the signal ID
  string signal_id = 1 [(gogoproto.customname) = "SignalID"];
  // deviation_bps is the deviation in basis points
  uint64 deviation_bps = 2 [(gogoproto.customname) = "HardDeviationBPS"];
}


// MsgCreateTunnel is the transaction message to create a new tunnel.
message MsgCreateTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgCreateTunnel";

  // signal_deviations is the list of signal deviations.
  repeated SignalDeviation signal_deviations = 1 [(gogoproto.nullable) = false];
  // interval is the interval for delivering the signal prices in seconds.
  uint64 interval = 2;
  // route is the route for delivering the signal prices
  google.protobuf.Any route = 3 [(cosmos_proto.accepts_interface) = "RouteI"];
  // initial_deposit is the deposit value that must be paid at tunnel creation.
  repeated cosmos.base.v1beta1.Coin initial_deposit = 4 [
    (gogoproto.nullable)     = false,
    (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins",
    (amino.dont_omitempty)   = true
  ];
  // creator is the address of the creator.
  string creator = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Signal Specification

When creating a tunnel, the creator provides a list of `SignalDeviation` objects to specify the price deviation thresholds that trigger data feeds.

| Field         | Description                                    |
| ------------- | ---------------------------------------------- |
| signal_id     | The signal id (symbol) to feed price           |
| deviation_bps | The price deviation threshold (in basis point) |

## Tunnel Route

The creator also specifies the **route** to deliver price data to the destination. Currently, [TSS](./06-tss-route.md) and [IBC](./07-ibc-route.md) routes are supported, with [IBC Hook](./08-ibc-hook-route.md) and [Router](./09-router-route.md) routes coming soon.

## Initial Deposit

The creator must seed the initial BAND token deposit to the tunnel. This initial deposit ensures that the tunnel is ready to operate immediately upon creation, provided it meets the minimum deposit requirements specified in the Tunnel Params. If the tunnel's balance falls below the required amount, others can send deposits to the tunnel by broadcasting a `MsgDepositTunnel` message to increase the total deposit of the tunnel by `TunnelID`.

## Fee Payer Funds

Lastly, once a tunnel is created, a dedicated BandChain address will be generated as the fee payer. Anyone can send BAND tokens to this address to fund the tunnel for operations. Every message sent from a tunnel will incur various fees for data transmission and processing. If the tunnel runs out of BAND tokens, it will temporarily stop operating until more BAND tokens are sent and the creator broadcasts a `MsgActivateTunnel` message.
