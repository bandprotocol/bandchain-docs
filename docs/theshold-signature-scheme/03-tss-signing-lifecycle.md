# TSS Signing Lifecycle

The Threshold Signature Scheme (TSS) Signing Process on BandChain enables a decentralized group of signers to collectively generate digital signatures without any single participant possessing the full private key. This mechanism ensures security, decentralization, and fault tolerance while allowing efficient transaction signing.

## Signing Execution Flow

The TSS signing process consists of several key steps:

### 1. Generating Public Signing Nonce

Before a signing request occurs, signers generate and submit their public signing nonces (public DEs) to BandChain. These nonces are used as part of the signing process to ensure secure and deterministic signature computation.

```protobuf
// DE contains the public parts of a member's decryption and encryption keys.
message DE {
  // pub_d is the public value of own commitment (D).
  bytes pub_d = 1 [(gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.Point"];
  // pub_e is the public value of own commitment (E).
  bytes pub_e = 2 [(gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.Point"];
}

message MsgSubmitDEs {
  option (cosmos.msg.v1.signer) = "sender";
  option (amino.name)           = "tss/MsgSubmitDEs";

  // des is a list of DE objects.
  repeated DE des = 1 [(gogoproto.customname) = "DEs", (gogoproto.nullable) = false];
  // sender is the user address that submits DE objects.
  string sender = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

### 2. Randomly Selecting Member for a New Requested Message.

When a user requests a signature, BandChain:

- Randomly selects signers from the active TSS group.
- Uses the stored public nonces to initialize signing data.
- Publishes a signing request event to notify selected signers.

Each participating signer must listen for these events and prepare to sign the requested message.

### 3. Signing the Requested Message

Once a signer receives a signing request, they must:

1. Retrieve the signing request details from BandChain.
2. Compute their partial signature using their private key share and the provided signing data.
3. Submit `MsgSubmitSignature` to BandChain within the designated time frame.

```protobuf
// MsgSubmitSignature is a message used to submitting signature data.
message MsgSubmitSignature {
  option (cosmos.msg.v1.signer) = "signer";
  option (amino.name)           = "tss/MsgSubmitSignature";

  // signing_id is the unique identifier of the signing process.
  uint64 signing_id = 1 [
    (gogoproto.customname) = "SigningID",
    (gogoproto.casttype)   = "github.com/bandprotocol/chain/v3/pkg/tss.SigningID"
  ];
  // member_id is the unique identifier of the signer in the group.
  uint64 member_id = 2
      [(gogoproto.customname) = "MemberID", (gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.MemberID"];
  // signature is the signature produced by the signer.
  bytes signature = 3 [(gogoproto.casttype) = "github.com/bandprotocol/chain/v3/pkg/tss.Signature"];
  // signer is the address who signs a message; must be a member of the group.
  string signer = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

### 4.Aggregating and Finalizing the Signature

Once a sufficient number of valid partial signatures are submitted, BandChain aggregates them to compute the final group signature. The final signature is then published and made available for use in transactions or smart contract executions.
