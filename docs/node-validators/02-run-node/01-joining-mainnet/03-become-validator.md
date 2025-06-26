# Become a Validator

This guide will show you how to register the running node as a validator. So that the program can fulfill the data on BandChain.

## Step 1: Fund the Validator Account

```bash
bandd keys show $WALLET_NAME
```

Then fund tokens into this account ready for staking.

## Step 2: Stake Tokens with the Validator Account

```bash
bandd tx staking create-validator \
    --amount 1000000uband \
    --commission-max-change-rate 0.01 \
    --commission-max-rate 0.2 \
    --commission-rate 0.1 \
    --from $WALLET_NAME \
    --min-self-delegation 1 \
    --moniker "$MONIKER" \
    --pubkey $(bandd tendermint show-validator) \
    --chain-id $CHAIN_ID
```

Registered validators can be found on [CosmoScan](https://cosmoscan.io/validators).

## Step 3: Register Reporters and Become Data Provider

Yoda contains multiple reporters. You will need to register the reporters to help the validator submit transactions of reporting data.

Firstly, reporter accounts must be created on BandChain by supplying a small amount of BAND tokens.

```bash
# Send 1uband from a wallet to each reporter.
bandd tx multi-send 1uband $(yoda keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

Secondly, register reporters to the validator, so that data requests for validator can be assigned to the reporters.

```bash
bandd tx oracle add-reporters $(yoda keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

Finally, activate the validator to become a data provider

```bash
bandd tx oracle activate \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

If all procedures are successful, then the data provider status for the validator should be `active`.

```bash
bandd query oracle validator $(bandd keys show -a $WALLET_NAME --bech val)

# {
#   "is_active": true,
#   "since": ...
# }
```

And now you have become a validator on BandChain Laozi mainnet.
