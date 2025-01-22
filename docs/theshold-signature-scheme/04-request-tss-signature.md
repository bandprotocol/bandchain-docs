# Requesting a TSS Signature

```protobuf
message MsgRequestSignature {
  option (cosmos.msg.v1.signer)      = "sender";
  option (amino.name)                = "bandtss/MsgRequestSignature";
  option (gogoproto.goproto_getters) = false;

  // content is the signature order of this request signature message.
  google.protobuf.Any content = 1 [(cosmos_proto.accepts_interface) = "Content"];
  // fee_limit is the maximum tokens that will be paid for this request.
  repeated cosmos.base.v1beta1.Coin fee_limit = 2
      [(gogoproto.nullable) = false, (gogoproto.castrepeated) = "github.com/cosmos/cosmos-sdk/types.Coins"];
  // sender is the requester of the signing process.
  string sender = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```
