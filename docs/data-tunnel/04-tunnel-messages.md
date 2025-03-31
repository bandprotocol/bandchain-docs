# Tunnel Messages

## Update Route

The tunnel creator can update the route information by broadcasting a `MsgUpdateRoute` message to BandChain. The fields that can be modified depend on the specific route type that was initially set for the tunnel. Note that the route type itself cannot be changed after tunnel creation - only parameters within the same route type can be updated.

```protobuf
message MsgUpdateRoute {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgUpdateRoute";

  // tunnel_id is the ID of the tunnel to edit.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];
  // route is the route for delivering the signal prices
  google.protobuf.Any route = 2 [(cosmos_proto.accepts_interface) = "RouteI"];
  // creator is the address of the creator.
  string creator = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Withdraw Fee Payer Funds

The tunnel creator can withdraw funds from the tunnel fee payer address by broadcasting a `MsgWithdrawFeePayerFunds` message to BandChain.

```protobuf
message MsgWithdrawFeePayerFunds {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgWithdrawFeePayerFunds";

  // tunnel_id is the ID of the tunnel to withdraw fee payer coins.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];
  // amount is the coins to withdraw.
  repeated cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.nullable)     = false,
    (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins",
    (amino.dont_omitempty)   = true
  ];
  // creator is the address of the creator.
  string creator = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Activate Tunnel

If a tunnel runs out of funds to pay for data delivery fees or if packet production fails, it will be deactivated and stop checking for delivery conditions. To re-enable the tunnel, the creator can send BAND tokens to the tunnel’s deposit address or investigate the packet production failure reason and broadcast a `MsgActivateTunnel` message to BandChain.

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

## Deactivate Tunnel

If a tunnel creator wants to temporarily halt packet production, they can broadcast a `MsgDeactivateTunnel` message to BandChain. This action will prevent the tunnel from sending further packets. To resume packet production, the creator can later broadcast a `MsgActivateTunnel` message.

```protobuf
message MsgDeactivateTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgDeactivateTunnel";

  // tunnel_id is the ID of the tunnel to deactivate.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];
  // creator is the address of the creator.
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Trigger Tunnel

While a tunnel triggers automatically based on its interval and price deviation specification, the tunnel's creator may manually trigger the tunnel's data delivery by broadcasting `MsgTriggerTunnel`.

```protobuf
message MsgTriggerTunnel {
  option (cosmos.msg.v1.signer) = "creator";
  option (amino.name)           = "tunnel/MsgTriggerTunnel";

  // tunnel_id is the ID of the tunnel to manually trigger.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];
  // creator is the address of the creator.
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## Deposit To Tunnel

Anyone can contribute funds to an existing tunnel by broadcasting a `MsgDepositToTunnel` message. This allows the tunnel to reach the required minimum deposit threshold. If needed, funds can also be withdrawn using a `MsgWithdrawFromTunnel` message.

```protobuf
message MsgDepositToTunnel {
  option (cosmos.msg.v1.signer) = "depositor";
  option (amino.name)           = "tunnel/MsgDepositToTunnel";

  // tunnel_id defines the unique id of the tunnel.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];

  // amount to be deposited by depositor.
  repeated cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.nullable)     = false,
    (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins",
    (amino.dont_omitempty)   = true
  ];

  // depositor defines the deposit addresses from the tunnel.
  string depositor = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## **Withdraw from Tunnel**

Anyone who has previously deposited **uband** into a tunnel can withdraw their funds by broadcasting a `MsgWithdrawFromTunnel` message when needed.

> **Note:** If a withdrawal causes the total deposit in the tunnel to fall below the required minimum deposit, the tunnel will be automatically deactivated.

```protobuf
message MsgWithdrawFromTunnel {
  option (cosmos.msg.v1.signer) = "withdrawer";
  option (amino.name)           = "tunnel/MsgWithdrawFromTunnel";

  // tunnel_id defines the unique id of the tunnel.
  uint64 tunnel_id = 1 [(gogoproto.customname) = "TunnelID"];

  // amount to be withdrawn by withdrawer.
  repeated cosmos.base.v1beta1.Coin amount = 2 [
    (gogoproto.nullable)     = false,
    (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins",
    (amino.dont_omitempty)   = true
  ];

  // withdrawer defines the withdraw addresses from the tunnel.
  string withdrawer = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```
