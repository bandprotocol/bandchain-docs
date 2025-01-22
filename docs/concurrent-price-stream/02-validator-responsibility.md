# Validator Responsibility

Each validator must broadcast `MsgSubmitSignalPrices` to submit individual price data for all symbols listed in the signaling hub according to the specified interval for each symbol. Failure to do so will result in the validator being deactivated and losing a portion of their revenue, as well as that of their delegators.

```protobuf
message SignalPrice {
  option (gogoproto.equal) = true;

  // PriceStatus is the price status of a signal id.
  PriceStatus price_status = 1;

  // SignalID is the signal id of the price.
  string signal_id = 2 [(gogoproto.customname) = "SignalID"];

  // Price is the price submitted by the validator.
  uint64 price = 3;
}

message MsgSubmitSignalPrices {
  option (cosmos.msg.v1.signer) = "validator";
  option (amino.name)           = "feeds/MsgSubmitSignalPrices";

  // Validator is the address of the validator that is performing the operation.
  string validator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];

  // Timestamp is the timestamp use as reference of the data.
  int64 timestamp = 2;

  // Prices is a list of signal prices to submit.
  repeated SignalPrice prices = 3 [(gogoproto.nullable) = false];
}
```

Band Protocol does not dictate how validators should obtain the raw price data. However, the Band Protocol team provides an open-source reference implementation called [Grogu and Bothan](../node-validators/grogu-and-bothan). Validators are required to disclose their methods for obtaining price data for each symbol. It is the responsibility of Band Proto- col token holders to choose validators based on these disclosures, ensuring the quality of the data is maintained.
