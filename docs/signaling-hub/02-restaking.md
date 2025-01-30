# Restaking Mechanism

While BAND's primary usage is to delegate for BandChain's validators to produce blocks and secure the network, the same BAND token may also be used to signal the symbols in BandChain V3. Everyone has the signaling power proportional to the amount of staked BAND token.

## Signal Submission

Anyone can broadcast `MsgVote` to vote for symbols to feed prices on BandChain. Note that once an address has voted, it will not be able to undelegate BAND token such that it as delegated BAND less than the total signaling power. To allow more undelegation, `MsgVote` must be resubbmited to replace the signal list.

```protobuf
message Signal {
  option (gogoproto.equal) = true;

  // ID is the id of the signal.
  string id = 1 [(gogoproto.customname) = "ID"];

  // Power is the power of the corresponding signal id.
  int64 power = 2;
}

message MsgVote {
  option (cosmos.msg.v1.signer) = "voter";
  option (amino.name)           = "feeds/MsgVote";

  // voter is the address of the voter that wants to vote signals.
  string voter = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];

  // signals is a list of submitted signals.
  repeated Signal signals = 2 [(gogoproto.nullable) = false];
}
```

## Liquid Staking Support

In addition to using delegated BAND token for signal submission, stBAND holders who liquid-stake BAND token may also participate in the signaling hub.
