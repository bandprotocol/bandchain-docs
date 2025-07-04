# Requesting a TSS Signature

The Threshold Signature Scheme (TSS) Signing Process enables users to request a BandChain TSS group to sign various types of messages in a secure and decentralized manner. This ensures that sensitive cryptographic operations, such as signing transactions, verifying data feed results, and price feed data aggregation, are performed without exposing private key material.

## Requesting a Signature

To request a TSS signature, a user must submit a signing request on BandChain. The request can include one of the following SignatureOrder types:

- `OracleResultSignatureOrder`: Requests a signature for a data feed result within the data feed module.
- `TextSignatureOrder`: Requests a signature for an arbitrary text message.
- `FeedsSignatureOrder`: Requests a signature for price data within the feeds module.

Each signature order type serves a distinct purpose, ensuring secure and verifiable signing for various applications on BandChain.

```protobuf
// MsgRequestSignature is a request message used for initiating the signing process.
message MsgRequestSignature {
  option (cosmos.msg.v1.signer)      = "sender";
  option (amino.name)                = "bandtss/MsgRequestSignature";
  option (gogoproto.goproto_getters) = false;

  // content is the signature order of this request signature message.
  google.protobuf.Any content = 1 [(cosmos_proto.accepts_interface) = "Content"];
  // memo is the additional note of the message.
  string memo = 2;
  // fee_limit is the maximum tokens that will be paid for this request.
  repeated cosmos.base.v1beta1.Coin fee_limit = 3
      [(gogoproto.nullable) = false, (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins"];
  // sender is the requester of the signing process.
  string sender = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

// OracleResultSignatureOrder defines a request id to request bandtss signature from the data result.
message OracleResultSignatureOrder {
  option (gogoproto.goproto_getters) = false;

  // request_id is unique identifier of this data request.
  uint64 request_id = 1 [(gogoproto.customname) = "RequestID", (gogoproto.casttype) = "RequestID"];

  // encoder is the mode of encoding data result signature order.
  Encoder encoder = 3;
}

// FeedsSignatureOrder defines a general signature order for feed data.
message FeedsSignatureOrder {
  option (gogoproto.goproto_getters) = false;

  // signal_ids is the list of signal ids that require signatures.
  repeated string signal_ids = 1 [(gogoproto.customname) = "SignalIDs"];

  // encoder is the mode of encoding feeds signature order.
  Encoder encoder = 2;
}

// TextSignatureOrder defines a general text signature order.
message TextSignatureOrder {
  option (cosmos_proto.implements_interface) = "Content";

  // message is the data that needs to be signed.
  bytes message = 1 [(gogoproto.casttype) = "github.com/cometbft/cometbft/libs/bytes.HexBytes"];
}
```
