# Restaking Mechanism

While BAND's primary usage is to delegate for BandChain's validators to produce blocks and secure the network, the same BAND token may also be used to signal the symbols in BandChain V3. Everyone has the signaling power proportional the the amount of staked BAND token.

## Signal Submission

Anyone can broadcast `MsgSubmitSignals` to signal supports for symbols to feed prices on BandChain. Note that once an address has active signal supports, it will not be able to undelegate BAND token such that it as delegated BAND less than the total signaling power. To allow more undelegation, `MsgSubmitSignals` must be resubbmited to replace the signal list.

```protobuf
message Signal {
  option (gogoproto.equal) = true;

  // ID is the id of the signal.
  string id = 1 [(gogoproto.customname) = "ID"];

  // Power is the power of the corresponding signal id.
  int64 power = 2;
}

message MsgSubmitSignals {
  option (cosmos.msg.v1.signer) = "delegator";
  option (amino.name)           = "feeds/MsgSubmitSignals";

  // Delegator is the address of the delegator that want to submit signals
  string delegator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // Signals is a list of submitted signal
  repeated Signal signals = 2 [(gogoproto.nullable) = false];
}
```

## Liquid Staking Support

In addition to using delegated BAND token for signal submission, stBAND holders who liquid-stake BAND token may also participate in the signaling hub.
