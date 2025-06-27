# BandChain TSS Group

## Core Concept

A BandChain TSS group consists of a set of signers and a specified signing threshold. Whenever a signing is requested, it is assigned to a threshold-size subset of members, who are responsible for generating and submitting their signatures to the chain.

At any given time, there is a single official primary BandChain TSS group, representing the network's official verification signature. This group can be replaced by submitting a proposal through BandChain's governance module, providing flexibility and enabling community-driven oversight.

## Group Creation / Transition Process

The process of forming and transitioning a BandChain TSS group involves multiple steps, ensuring secure member participation and proper validation before the group is fully established.

### 1. Initiating a TSS Group Proposal

There are two types of proposals related to a BandChain TSS group transitions: one for creating and activating a new group `MsgTransitionGroup`, which is triggered after governance approval, and another for forcing a transition `MsgForceTransitionGroup`, used when the newly created group is not activated due to a lack of approval from the existing group.

In case of normal transition, a BandChain TSS group creation proposal is initiated to request the formation of a new group. Once approved by the governance mechanism, the system triggers the `MsgTransitionGroup` message, officially starting the group creation process.

If the new group is successfully created but not activated due to the lack of approval from the current group, which will explain later, a force transition proposal (`MsgForceTransitionGroup`) can be initiated to override the existing group.

```protobuf
// MsgTransitionGroup is the Msg/TransitionGroup request type.
message MsgTransitionGroup {
  option (cosmos.msg.v1.signer) = "authority";
  option (amino.name)           = "bandtss/MsgTransitionGroup";

  // members is a list of members in this group.
  repeated string members = 1;
  // threshold is a minimum number of members required to produce a signature.
  uint64 threshold = 2;
  // exec_time is the time that will be substituted in place of the group.
  google.protobuf.Timestamp exec_time = 3 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
  // authority is the address that controls the module (defaults to x/gov unless overwritten).
  string authority = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

// MsgForceTransitionGroup is the Msg/ForceTransitionGroup request type.
message MsgForceTransitionGroup {
  option (cosmos.msg.v1.signer) = "authority";
  option (amino.name)           = "bandtss/ForceTransitionGroup";

  // incoming_group_id is the ID of the group that the module want to transition to.
  uint64 incoming_group_id = 1 [
    (gogoproto.customname) = "IncomingGroupID",
    (gogoproto.casttype)   = "github.com/bandprotocol/chain/v3/pkg/tss.GroupID"
  ];
  // exec_time is the time that will be substituted in place of the group.
  google.protobuf.Timestamp exec_time = 2 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
  // authority is the address that controls the module (defaults to x/gov unless overwritten).
  string authority = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

### 2. Submitting Group Creation Information

Once `MsgTransitionGroup` is triggered, BandChain stores the group and member information (e.g., group ID, assigned members, threshold parameters). After that, BandChain emits an event to inform selected members that they must submit the required data within a specified deadline.

Upon receiving this event, the selected members must submit the following information in sequential rounds to complete the group creation process:

- `MsgSubmitDKGRound1`: Contains the encrypted public key and partial commitment, serving as proof that the member has generated their partial private key.
- `MsgSubmitDKGRound2`: Includes the encrypted secret key, derived from the member’s encrypted public key and partial commitment, ensuring secure data exchange.
- `MsgConfirm` or `MsgComplain`: Submitted with a digital signature of the member’s key to verify the correctness of the provided data. Alternatively, if malicious activity or incorrect information is detected, the member submits a `MsgComplain` to report the issue, causing the group creation process to fail.

```protobuf
// MsgSubmitDKGRound1 is the Msg/MsgSubmitDKGRound1 request type.
message MsgSubmitDKGRound1 {
  option (cosmos.msg.v1.signer) = "sender";
  option (amino.name)           = "tss/MsgSubmitDKGRound1";

  // group_id is ID of the group.
  uint64 group_id = 1
      [(gogoproto.customname) = "GroupID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.GroupID"];
  // round1_info is all data that require to handle round 1.
  Round1Info round1_info = 2 [(gogoproto.nullable) = false];
  // sender is the user address that submits the group creation information;
  // must be a member of this group.
  string sender = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

// MsgSubmitDKGRound2 is the Msg/SubmitDKGRound2 request type.
message MsgSubmitDKGRound2 {
  option (cosmos.msg.v1.signer) = "sender";
  option (amino.name)           = "tss/MsgSubmitDKGRound2";

  // group_id is ID of the group.
  uint64 group_id = 1
      [(gogoproto.customname) = "GroupID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.GroupID"];
  // round2_info is all data that is required to handle round 2.
  Round2Info round2_info = 2 [(gogoproto.nullable) = false];
  // sender is the user address that submits the group creation information;
  // must be a member of this group.
  string sender = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

// MsgConfirm is a message used to confirm own public key.
message MsgConfirm {
  option (cosmos.msg.v1.signer) = "sender";
  option (amino.name)           = "tss/MsgConfirm";

  // group_id is ID of the group.
  uint64 group_id = 1
      [(gogoproto.customname) = "GroupID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.GroupID"];
  // member_id is ID of the sender.
  uint64 member_id = 2
      [(gogoproto.customname) = "MemberID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.MemberID"];
  // own_pub_key_sig is a signature of the member_i on its own PubKey to confirm
  // that the address is able to derive the PubKey.
  bytes own_pub_key_sig = 3 [(gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.Signature"];
  // sender is the user address that submits the group creation information;
  // must be a member of this group.
  string sender = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

// MsgComplain is a message used to complain about malicious actors in the group.
message MsgComplain {
  option (cosmos.msg.v1.signer) = "sender";
  option (amino.name)           = "tss/MsgComplaint";

  // group_id is ID of the group.
  uint64 group_id = 1
      [(gogoproto.customname) = "GroupID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.GroupID"];
  // complaints is a list of complaints.
  repeated Complaint complaints = 2 [(gogoproto.nullable) = false];
  // sender is the user address that submits the group creation information;
  // must be a member of this group.
  string sender = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

### 3. Requesting an Approval from the Existing Group

If a previous BandChain TSS group exists, the new group must obtain approval through a signing process. Members of the current group are required to sign a transition message, confirming their acknowledgment and approval of the group's transition. Once approved, the new group is designated as the incoming group, prepared to sign messages but not yet eligible for incentives. The incoming group officially replaces the existing group when the execution time arrives.

## TSS Group Member Incentive

As members of the BandChain TSS group, signers are responsible for submitting signatures whenever requested. In return, they earn a portion of BandChain's block rewards as compensation for their participation, along with a signing fee for those randomly selected to sign a specific task. Failure to submit a signature within the required time frame may result not receiving any reward and exclusion from future signing tasks.
