# Getting Starts with Falcon

## Prerequisite

If this is the first time you start Falcon service, run the following

1. Initialize the Falcon configuration file (if you leave the passphrase unset, it defaults to "").
    ```shell
    $PASSPHRASE=$YOUR_PASSPHRASE Falcon config init
    ```

    Passphrase will be used when it interacts with keys management. 
    
    Default config will be at: `~/.falcon/config/config.toml`. By default, config will be initialized in format like this 
    ```toml
    [global]
    log_level = 'info'
    checking_packet_interval = 60000000000
    sync_tunnel_interval = 300000000000
    penalty_skip_rounds = 3

    [bandchain]
    rpc_endpoints = ['http://localhost:26657']
    timeout = 3000000000
    liveliness_checking_interval=60000000000

    [target_chains]

    ```


    To customize the config for relaying, you can use custom config file and use the `--file` flag when initializing the configuration.
    ```shell
    falcon config init --file custom_config.toml
    ```

2. Configure target chains 
    You need to create a chain configuration file with the format below in order to add it to the Falcon's configuration. Currently, Falcon only supports EVM chain.
    
    Example:
    ``` toml
    endpoints = ['http://localhost:8545']
    chain_type = 'evm'
    max_retry = 3
    query_timeout = 3000000000
    execute_timeout = 3000000000
    chain_id = 31337
    tunnel_router_address = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
    block_confirmation = 5
    waiting_tx_duration = 3000000000
    liveliness_checking_interval = 900000000000
    checking_tx_interval = 1000000000
    gas_type = 'eip1559'
    gas_multiplier = 1.1
    ```

    The supported `gas_type` values are **legacy** and **eip1559**. Each type requires specific configuration fields.
    - **legacy**
        - `max_gas_price` defines the maximum gas price. If `max_gas_price` is not specified, it will be retrieved from the tunnel router.
    - **eip1559**
        - `max_base_fee` defines the maximum base fee.
        - `max_priority_fee` defines the maximum priority fee. If `max_priority_fee` is not defined, it will also be retrieved from the tunnel router

    After creating a chain configuration file, run with the following commands
    ``` shell
    falcon chains add $CHAIN_NAME $CHAIN_CONFIG_FILE
    ```

    `$CHAIN_NAME` should be matched with the one predefined in the tss-tunnel.

    You can check if Falcon can connect to both BandChain and destination via query tunnel information using following command
    ``` shell
    falcon query tunnel <TUNNEL_ID>
    ```

3. Import or Create keys

    If you need to create a new key into the system, run the following command. 
    ``` shell
    PASSPHRASE=$YOUR_PASSPHRASE falcon keys add $CHAIN_NAME $KEY_NAME
    ```

    The command is interactive, user can either adding keys via importing private key or mnemonic, or user can generate a new private key specifically for relaying a transaction.

    To avoid command interaction, user can manually run the command with specific flag for key creation.

    You can query the balance of each configured key by running:
    ``` shell
    PASSPHRASE=$YOUR_PASSPHRASE falcon q balance $CHAIN_NAME $KEY_NAME
    ```

## Start Falcon
    Starts the Falcon to relay every tss-tunnel by running the following command
    ``` shell
    falcon start
    ```

    Falcon can relay the data from only specific tss tunnels, the following is an example of how to run Falcon to relay only tunnel ID 1, 2, and 3
    ``` shell
    falcon start 1 2 3
    ```
