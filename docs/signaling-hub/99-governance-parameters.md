# Governance Parameters

This section explains the governance variables associated with Band Protocol's signaling hub.

### `feeds:admin`
Admin is the address of the admin that is allowed to update reference source config on modules.

### `feeds:allowable_block_time_discrepancy`
AllowableBlockTimeDiscrepancy is the allowed discrepancy (in seconds) between validator price timestamp and block_time.

### `feeds:grace_period`
GracePeriod is the time (in seconds) given for validators to adapt to changing in feed's interval.

### `feeds:min_interval`
MinInterval is the minimum limit of every feeds' interval (in seconds). If the calculated interval is lower than this, it will be capped at this value.

### `feeds:max_interval`
MaxInterval is the maximum limit of every feeds' interval (in seconds). If the calculated interval of a feed is higher than this, it will not be capped at this value.

### `feeds:power_step_threshold`
PowerStepThreshold is the amount of minimum power required to put feed in the current feeds list.

### `feeds:max_current_feeds`
MaxCurrentFeeds is the maximum number of feeds supported at a time.

### `feeds:cooldown_time`
CooldownTime represents the duration (in seconds) during which validators are prohibited from sending new prices.

### `min_deviation_basis_point`
MinDeviationBasisPoint is the minimum limit of every feeds' deviation (in basis point).

### `max_deviation_basis_point`
MaxDeviationBasisPoint is the maximum limit of every feeds' deviation (in basis point).

### `feeds:current_feeds_update_interval`
CurrentFeedsUpdateInterval is the number of blocks after which the current feeds will be re-calculated.

### `feeds:price_quorum`
PriceQuorum is the minimum percentage of power that needs to be reached for a price to be processed.

### `feeds:max_signal_ids_per_signing`
MaxSignalIDsPerSigning is the maximum number of signals allowed in a single tss signing request.
