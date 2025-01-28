# Become a Validator

This step provides procedures to register the node as a validator.

### Step 1: Create a new Account to be Used as Validator

```bash
# Request new coins from faucet
curl --location --request POST "${FAUCET_URL}" \
--header 'Content-Type: application/json' \
--data-raw "{
 \"address\": \"$(bandd keys show $WALLET_NAME -a)\"
}"
```

### Step 2: Stake Tokens with the Validator Account

Start by defining the required and optional variables.

```bash
# Required fields
AMOUNT="3000000uband"
COMMISSION_RATE="0.1"
COMMISSION_MAX_RATE="0.2"
COMMISSION_MAX_CHANGE_RATE="0.01"
MIN_SELF_DELEGATION="1"
PUBKEY=$(bandd tendermint show-validator)
```

**Note:** This command is optional. If you don't want to provide these info, you don't have to run this command.

```bash
# Optional fields
OPTIONAL_IDENTITY=<YOUR_IDENTITY_SIGNATURE>
OPTIONAL_WEBSITE=<YOUR_WEBSITE>
OPTIONAL_SECURITY=<YOUR_SECURITY_CONTACT_EMAIL>
OPTIONAL_DETAILS=<YOUR_DETAILS>
```

Use the command below to dynamically generate the `validator.json` file with the specified variables.

```bash
cat <<EOF > $HOME/validator.json
{
    "pubkey": $PUBKEY,
    "amount": "$AMOUNT",
    "moniker": "$MONIKER",
    "identity": "$OPTIONAL_IDENTITY",
    "website": "$OPTIONAL_WEBSITE",
    "security": "$OPTIONAL_SECURITY",
    "details": "$OPTIONAL_DETAILS",
    "commission-rate": "$COMMISSION_RATE",
    "commission-max-rate": "$COMMISSION_MAX_RATE",
    "commission-max-change-rate": "$COMMISSION_MAX_CHANGE_RATE",
    "min-self-delegation": "$MIN_SELF_DELEGATION"
}
EOF
```

Then, run the following command to create the validator using the `validator.json`.

```bash
bandd tx staking create-validator $HOME/validator.json \
    --from $WALLET_NAME \
    --gas-prices 0.0025uband \
    --gas 300000 \
    --chain-id $CHAIN_ID \
    -y
```

After became a validator, the validator node will be shown on Block Explorer [here](https://band-v3-testnet.cosmoscan.io/validators).

### Step 3: Register Reporters

Now, Yoda has multiple reporters. In order to grant the reporters to report data for the validator, the following commands should be run.

Firstly, reporter accounts must be create on Bandchain by supplying some small amount of BAND tokens.

```bash
# Send 1uband from a wallet to each reporter.
bandd tx bank multi-send $WALLET_NAME $(yoda keys list -a) 1uband \
  --chain-id $CHAIN_ID \
  --gas-prices 0.0025uband \
  -b sync \
  -y
```

Secondly, grant all reporters for the validator, so that oracle requests for validator can be sent by the reporters.

```bash
bandd tx oracle add-reporters $(yoda keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID \
  --gas-prices 0.0025uband \
  -b sync \
  -y
```

### Step 4: Register Feeders

Next, feeder accounts must be create on BandChain by supplying some small amount of BAND tokens.

```bash
bandd tx bank multi-send $WALLET_NAME $(grogu keys list -a) 1uband \
  --chain-id $CHAIN_ID \
  --gas-prices 0.0025uband \
  --gas 400000 \
  -b sync \
  -y
```

Then, grant all feeders for the validator, so that submit prices transactions can be sent by the feeders.

```bash
bandd tx feeds add-feeders $(grogu keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID \
  --gas-prices 0.0025uband \
  --gas 400000 \
  -b sync \
  -y
```

### Step 5: Become Oracle Provider

Finally, activate the validator to become an oracle provider

```bash
bandd tx oracle activate \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID \
  --gas-prices 0.0025uband \
  -b sync \
  -y
```

If all procedures are successful, then the oracle provider status for the validator should be `active`.

```bash
bandd query oracle validator $(bandd keys show -a $WALLET_NAME --bech val)

# {
#   "is_active": true,
#   "since": ...
# }
```

And now you have become a validator on Bandchain V3 Testnet #1.
