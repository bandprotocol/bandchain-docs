# Tunnel Creation

Anyone can broadcast `MsgCreateTunnel` to create a new data tunnel on BandChain. The formal specification of the message is given below:

```protobuf
message SignalInfo {
  option (gogoproto.equal) = true;

  string signal_id     = 1 [(gogoproto.customname) = "SignalID"];
  uint64 deviation_bps = 2 [(gogoproto.customname) = "DeviationBPS"];
  int64  interval      = 3;
}

message MsgCreateTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgCreateTunnel";

  repeated SignalInfo signal_infos = 1 [(gogoproto.nullable) = false];
  google.protobuf.Any route = 2 [(cosmos_proto.accepts_interface) = "Route"];
  feeds.v1beta1.FeedType feed_type = 3;
  repeated cosmos.base.v1beta1.Coin deposit = 4
      [(gogoproto.nullable) = false, (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins"];
  string creator = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Signal Specification

When creating, the creator provides the list of `SignalInfo` objects to specify the price symbols together with the time interval and price deviation to feed price data.

| Field | Description |
| -- | - |
| signal_id | The signal id (symbol) to feed price |
| deviation_bps | Addtional price deviation threshold (in basis point) |
| interval | The default feeding interval in seconds |

## Tunnel Route and Feed Type

The creator also specifies the **route** to deliver price data to the destination, currently [TSS](./05-tss-integration.md), [IBC](./06-ibc-intergation.md), and [Axelar](./07-axelar-integration.md) routes are supported. Additionally, the creator specifies the encoding scheme to encode price data as `feed_type`. The current supported values are fixed point decimal encoding and tick encoding.

## Initial Deposit

Lastly, the creator must seed the initial BAND token deposit to the tunnel. This allows the tunnel to instantly be ready to operate the moment it is created. Once a tunnel is created, a dedicated BandChain address will be created and anyone can send BAND token to the address to fund the tunnel. As specified in [the previous section](./02-tunnel-architecture.md), every message sent from a tunnel will incur various fees. If the tunnel runs out of BAND token, it will temporarily stop the operation until more BAND is sent and the creator broadcast `MsgActivateTunnel`.
