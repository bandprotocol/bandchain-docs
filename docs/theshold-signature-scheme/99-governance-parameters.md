# Governance Parameters

This section explains the governance variables associated with Band Protocol's threshold signature implementation.

## `tss` Module

`tss` module is responsible for general threshold signature implementation. It has the following module parameters.

### `tss:max_group_size`

This parameter controls the possible maximum number of the members of any valid group.

### `tss:max_d_e_size`

This parameter controls the maximum of the DE nonce capacity of any member. This is to prevent spamming.

### `tss:creating_period`

This parameter controls the maximum number of blocks allowed during the group creation period until the creation is deemed expired.

### `tss:signing_period`

This parameter controls the maximum number of blocks allowed for signature creation after a signature requested is broadcasted until the signing is deemed expired.

### `tss:max_signing_attempt`

This parameter controls the maximum number of retries allowed for generating a group signature after the previous selected members fail to submit their signature.

### `tss:max_memo_length`

This parameter controls the maximum length of the memo in the originator. This is to prevent flooding.

### `tss:max_message_length`

This parameter controls the maximum length of the message. This is to prevent flooding.

## `bandtss` Module

`bandtss` module is for BandChain's specific TSS assumption. Mainly it involves maintaining the BandChain TSS primary group, including managing the incentive and penalty of involved participants. It has the following module parameters.

### `bandtss:reward_percentage`

This parameter controls the percentage of BandChain block rewards that are allocated exclusively for the active members of the primary TSS group.

### `bandtss:inactive_penalty_duration`

This parameter controls the cooldown before an inactive TSS member can send `MsgActivate` to active themselves back to the system. This is to ensure there is penalty in the form of not getting rewards to the inactive TSS member before they can activate themselves back.

### `bandtss:min_transition_duration`

This parameter controls the minimum required time between the activation of a new BandChain TSS group and the transition from the existing group. This prevents a frequent or rapid transitions that could disrupt ongoing signing operations. This also is a buffer for handling potential disputes or necessary confirmations before the transition is finalized.

### `bandtss:max_transition_duration`

This parameter controls the maximum time should be set for transition execution period. This prevents indefinite delays that could lead to operational inefficiencies or security risks.

### `bandtss:fee_per_signer`

This parameters controls the fee amount paid to each of the signer for every TSS signature requested. This fee is in addition to the percentage of the block rewards that the active TSS members already get.
