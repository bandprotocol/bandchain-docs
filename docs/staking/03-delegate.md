# Delegate

Participation in BandChain doesn't require you to be a validator. Instead, you can delegate BAND tokens to any validator and earn a share of the fees and rewards associated with block creation. However, it's important to note that staking with a validator involves certain [risks](./01-introduction.md#risks-of-slashing). Make sure to familiarize yourself with the potential dangers related to validator staking

This tutorial will assist you in staking your BAND tokens easily and efficiently

### Step 0 — Before you start

- Download and install the newest version of Ledger Live on your desktop machine.
- Update your Ledger device to the newest firmware.
- Install the latest version of the Cosmos App on your Ledger device.
- Have some BAND on BandChain mainnet

### Step 1 — Navigate to Cosmoscan

To begin, assume that you have BAND on the BandChain, then navigate to the website [cosmoscan.io](https://www.cosmoscan.io). This website is our official block explorer and is a crucial tool for interacting with the BandChain.

### Step 2 — Make sure you in the right site

Once you're on the site, make sure the url is `https://www.cosmoscan.io` and ensure that you're operating on the mainnet. You can verify this by locating the network information on the top-left corner of the website interface. The mainnet is the primary network for transacting tokens.

![check chain ID](/img/staking/chain_id.png)

### Step 3 — Click to connect wallet

Next, you will need to connect your wallet to the website. see [Connect Wallet Guide](./02-connect-wallet.md) before continue

### Step 4 — Navigate to Validators page

Proceed to the validators page by clicking on **Validator** located in the navigation bar. or navigate to [Validators](https://www.cosmoscan.io/validators). Once on the validators page, you'll see a list of all validators that you can choose to delegate your tokens to.

![validators page](/img/staking/all_validators_page.png)

### Step 5 — Choose a validator

Choose a validator that you wish to delegate to. This decision should be based on various factors (check out [How to choose a validator section](./introduction#how-to-choose-a-validator))
Upon clicking on a validator, you'll be presented with specific information about them. This typically includes their identity, performance statistics, commission rates, and more.

![validator details page](/img/staking/validator_detail.png)

### Step 6 — Delegate to validator

Scroll down to the **Your Delegation Info** section. This area provides detailed information about your current and past delegations with the selected validator. You'll notice a **Delegate** button within this section – click on it to initiate the delegation process.

Upon clicking **Delegate**, a new window will pop up. Enter the amount of BAND tokens you wish to stake in the provided field, and then click **Next**.

![delegate pop up window](/img/staking/delegate_modal.png)

At this point, you'll see transaction details for your delegation. Review the information, and if everything is ok, click **Broadcast**.

![transaction details](/img/staking/transaction_detail.png)

Voila! You have successfully delegated your BAND tokens. Congratulations on taking this step in staking and earning rewards on your tokens!

![broadcast transaction success](/img/staking/transaction_success.png)

To verify your transaction, navigate back to your **Account Details** page. To view detailed information about your account, click the drop-down arrow, then click your address prefixed with **band** to navigate to your account details page.

![clicking on dropdown arraow to show your account detail](/img/staking/expaned_account_button.png)

you'll be able to see the updated status showing that you've delegated to your chosen validator.

![your account detail page](/img/staking/account_delegation_details.png)

## Next — Manage your BAND stake

Once you have staked your BAND, you have 4 options to consider.

- Undelegate
- Redelegate
- Claim Rewards
- Reinvest
