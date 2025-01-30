# BandChain TSS Group

## Core Concept
The corecept of TSS is **TSS Group**. A TSS group consists of a set of signers and a specified signing threshold. Whenever a signing is requested, the signature will be successfully generated only if a chosen threshold-size set of signers participate in the signing.

In BandChain, exactly one official TSS group exists at any given time, representing the official TSS verification signature. A group can be proposed or replaced through BandChain's governance module.

```protobuf
message MsgCreateGroup {
  option (cosmos.msg.v1.signer) = "authority";
  option (amino.name)           = "bandtss/MsgCreateGroup";

  // members is a list of members in this group.
  repeated string members = 1;
  // threshold is a minimum number of members required to produce a signature.
  uint64 threshold = 2;
  // authority is the address that controls the module (defaults to x/gov unless overwritten).
  string authority = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

message MsgReplaceGroup {
  option (cosmos.msg.v1.signer) = "authority";
  option (amino.name)           = "bandtss/MsgReplaceGroup";

  // new_group_id is the ID of the group that want to replace.
  uint64 new_group_id = 1 [
    (gogoproto.customname) = "NewGroupID",
    (gogoproto.casttype)   = "github.com/bandprotocol/chain/v2/pkg/tss.GroupID"
  ];
  // exec_time is the time that will be substituted in place of the group.
  google.protobuf.Timestamp exec_time = 2 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
  // authority is the address that controls the module (defaults to x/gov unless overwritten).
  string authority = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

## TSS Group Member Incentive
As a member of the TSS group, the signers are responsible for submitting the signatures whenever requested. In return, the earn the portion of BandChain's block rewards directly to compensate for the work. In addition, the signers are responsible for continously submiting the health check message.
