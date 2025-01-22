# Tunnel Messages

## Activate Tunnel

If a tunnel runs out of funds to pay for data delivery fees, it will be deactivated and stop checking for delivery conditions. To re-enable the tunnel, the creator can send BAND to the tunnel’s deposit address and broadcast `MsgActivateTunnel` to BandChain.

```protobuf
message MsgActivateTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgActivateTunnel";

  // tunnel_id is the ID of the tunnel to activate.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];
  // creator is the address of the creator.
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Manual Trigger Tunnel

While a tunnel triggers automatically based on its interval and price deviation specification, the tunnel's creator may manually trigger the tunnel's data delivery by broadcasting `MsgManualTriggerTunnel`.

```protobuf
message MsgManualTriggerTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgManualTriggerTunnel";

  // tunnel_id is the ID of the tunnel to manually trigger.
  uint64 id = 1 [(gogoproto.customname) = "TunnelID"];
  // creator is the address of the creator.
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Remove Tunnel

The creator can broadcast `MsgRemoveTunnel` to sunset the tunnel. Doing so will stop further data deliveries and return the remaining balance in the tunnel’s deposit address to the creator.

```protobuf
message MsgManualRemoveTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgRemoveTunnel";

  // tunnel_id is the ID of the tunnel to manually trigger.
  uint64 id = 1 [(gogoproto.customname) = "TunnelID"];
  // creator is the address of the creator.
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```
