# Installation

## Step 1: Set Up Validator Node

This step provides procedures to install Bandchain's executable and sync blocks with other peers.

Assuming to run on Ubuntu 24.04 LTS allowing connection on port `26656` for P2P connection.

Before beginning instructions, following variables should be set to be used in further instructions. **Please make sure that these variables is set everytime when using the new shell session**.

```bash
# Chain ID of Band V3 Testnet #1
export CHAIN_ID="band-v3-testnet-1"
# Wallet name to be used as validator's account, please change this into your name (no whitespace).
export WALLET_NAME=<YOUR_WALLET_NAME>
# Name of your validator node, please change this into your name.
export MONIKER=<YOUR_MONIKER>
# Seed and persistent peers for P2P communication
export SEEDS="62eb486c7163b173ad9948579555872b809f09cd@37.27.244.210:26656,c22824546ad9daeda7c513bf324a6bc01306c930@37.27.30.170:26656"
# URL of genesis file for Band V3 Testnet #1
export GENESIS_FILE_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/band-v3-testnet-1/genesis.json
# URL of config file for Bothan
export BOTHAN_CONFIG_FILE_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/band-v3-testnet-1/bothan-config.toml
# Faucet endpoint
export FAUCET_URL=https://band-v3-testnet.bandchain.org/faucet
```

**Note:** For those in the US region please use the following `BOTHAN_CONFIG_FILE_URL`

```bash
# URL of config file for Bothan
export BOTHAN_CONFIG_FILE_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/band-v3-testnet-1/bothan-config-us.toml
```

### Step 1.1: Install Prerequisites

The following application is required for building and running Bandchain node.

- make, gcc, g++ (can be obtained from `build-essential` package on linux)
- jq, wget, curl for downloading files

```bash
# install required tools
sudo apt-get update && \
sudo apt-get upgrade -y && \
sudo apt-get install -y build-essential curl wget jq
```

- Go 1.24.2
```bash
# Install Go 1.24.2
wget https://go.dev/dl/go1.24.2.linux-amd64.tar.gz
tar xf go1.24.2.linux-amd64.tar.gz
sudo mv go /usr/local/go

# Set Go path to $PATH variable
echo "export PATH=\$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.profile
source $HOME/.profile
```

Go binary should be at `/usr/local/go/bin` and any executable compiled by `go install` command should be at `$HOME/go/bin`

- Docker

Install [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

### Step 1.2: Clone & Install Band V3 binary

```bash
# Clone Band binary version v3.1.0
git clone https://github.com/bandprotocol/chain
cd chain
git checkout v3.1.0

# Install binaries to $GOPATH/bin
make install
```

### Step 1.3: Initialize the Bandchain and Download genesis file

```bash
cd $HOME

# Initialize configuration and genesis state
bandd init --chain-id $CHAIN_ID "$MONIKER"

# Replace genesis file with our genesis file
wget $GENESIS_FILE_URL -O $HOME/.band/config/genesis.json

# Create new account
bandd keys add $WALLET_NAME
```

### Step 1.4: Setup node configuration

```bash
# Add seeds to config.toml
sed -E -i \
  "s/seeds = \".*\"/seeds = \"${SEEDS}\"/" \
  $HOME/.band/config/config.toml
  
# Add minimum gas price
sed -E -i \
  "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.0025uband\"/" \
  $HOME/.band/config/app.toml

# Set timeout propose
sed -E -i \
  "s/timeout_propose = \".*\"/timeout_propose = \"1s\"/" \
  $HOME/.band/config/config.toml

# Set timeout commit
sed -E -i \
  "s/timeout_commit = \".*\"/timeout_commit = \"500ms\"/" \
  $HOME/.band/config/config.toml

# Set peer_gossip_sleep_duration
sed -E -i \
  "s/peer_gossip_sleep_duration = \".*\"/peer_gossip_sleep_duration = \"10ms\"/" \
  $HOME/.band/config/config.toml

# Set flush_throttle_timeout
sed -E -i \
  "s/flush_throttle_timeout = \".*\"/flush_throttle_timeout = \"10ms\"/" \
  $HOME/.band/config/config.toml

# Set number of inbound peers
sed -E -i \
  "s/max_num_inbound_peers = .*/max_num_inbound_peers = 40/" \
  $HOME/.band/config/config.toml

# Set number of outbound peers
sed -E -i \
  "s/max_num_outbound_peers = .*/max_num_outbound_peers = 20/" \
  $HOME/.band/config/config.toml
```

### Step 1.5: Setup State Sync config

```bash
# Get trust height and trust hash
LATEST_HEIGHT=$(curl -s https://rpc.band-v3-testnet.bandchain.org/block | jq -r .result.block.header.height);
TRUST_HEIGHT=$(($LATEST_HEIGHT-10000))
TRUST_HASH=$(curl -s "https://rpc.band-v3-testnet.bandchain.org/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)

# show trust height and trust hash
echo "TRUST HEIGHT: $TRUST_HEIGHT"
echo "TRUST HASH: $TRUST_HASH"
```

```bash
# Enable State Sync
sed -i \
    '/\[statesync\]/,+34 s/enable = false/enable = true/' \
    $HOME/.band/config/config.toml
    
# Set RPC Endpoint for State Sync
sed -E -i \
    "/\[statesync\]/,+34 s/rpc_servers = \".*\"/rpc_servers = \"https\:\/\/rpc.band-v3-testnet.bandchain.org\:443,https\:\/\/rpc.band-v3-testnet.bandchain.org\:443\"/" \
    $HOME/.band/config/config.toml
 
# Set Trust Height for State Sync
sed -i \
    "/\[statesync\]/,+34 s/trust_height = .*/trust_height = ${TRUST_HEIGHT}/" \
    $HOME/.band/config/config.toml
    
# Set Trust Hash for State Sync
sed -i \
    "/\[statesync\]/,+34 s/trust_hash = \".*\"/trust_hash = \"${TRUST_HASH}\"/" \
    $HOME/.band/config/config.toml
```

## Step 2: Setup Cosmovisor
This step provides procedures to setup Cosmovisor. Cosmovisor is a small process manager for Cosmos SDK application binaries that monitors the governance module via stdout for incoming chain upgrade proposals

### Step 2.1: Setup environment variables
Add required environment variables for Cosmovisor into your profile

```bash
cd $HOME
echo "export DAEMON_NAME=bandd" >> $HOME/.profile
echo "export DAEMON_HOME=$HOME/.band" >> $HOME/.profile
source $HOME/.profile
```
### Step 2.2: Setup Cosmovisor
Install Cosmovisor and provide bandd binary to Cosmovisor

```bash
# Install Cosmovisor
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0

# Setup folder and provide bandd binary for Cosmovisor
mkdir -p $HOME/.band/cosmovisor/genesis/bin
mkdir -p $HOME/.band/cosmovisor/upgrades
cp $HOME/go/bin/bandd $HOME/.band/cosmovisor/genesis/bin

# Setup folder and provide bandd binary for Cosmovisor Upgrades
mkdir -p $HOME/.band/cosmovisor/upgrades/v3_1/bin
cp $HOME/go/bin/bandd $DAEMON_HOME/cosmovisor/upgrades/v3_1/bin
```

### Step 2.3: Update Bandchain service
In this step, we will write the daemon service to use Cosmovisor instead of Bandd binary.

```bash
# Write bandd service file to /etc/systemd/system/bandd.service
export USERNAME=$(whoami)
sudo -E bash -c 'cat << EOF > /etc/systemd/system/bandd.service
[Unit]
Description=BandChain Node Daemon
After=network-online.target

[Service]
Environment="DAEMON_NAME=bandd"
Environment="DAEMON_HOME=${HOME}/.band"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="UNSAFE_SKIP_BACKUP=true"
User=$USERNAME
ExecStart=${HOME}/go/bin/cosmovisor run start
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF'
```

To register `bandd` services, run the following commands.

```bash
# Register bandd daemon to systemctl
sudo systemctl enable bandd
```

## Step 3: Setup Yoda

Based on design, validator need to send a transaction to submit reports based on certain data requests. The validator should send transactions to submit reports within specified timeframe. However, the method is quite tedious. Therefore, we have develop an application called `Yoda`, which is a bot application that help validator automatically listen new data requests on Bandchain, execute data sources, and submit report to Bandchain, so validators don't have to send the transactions manually.

### Step 3.1: Prerequisites

There is an update in the executor configuration. You can **set up a new executor** by using the instructions on following pages (select either one of these methods):

- [AWS Lambda Function Setup](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-AWS-Lambda)
- [Google Cloud Function Setup](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-Google-Cloud-Function)

Then, check Yoda version that we have compiled. It should be `v3.1.0`.

```bash
yoda version
# v3.1.0
```

### Step 3.2: Configure Yoda

Firstly, configure Yoda's basic configurations

```bash
rm -rf $HOME/.yoda # clear old config if exist
yoda config chain-id $CHAIN_ID
yoda config node http://localhost:26657
yoda config broadcast-timeout "5m"
yoda config rpc-poll-interval "1s"
yoda config max-try 5
yoda config validator $(bandd keys show $WALLET_NAME -a --bech val)
```

Secondly, add multiple reporter accounts to allow Yoda submitting transactions concurrently.

```bash
yoda keys add REPORTER_1
yoda keys add REPORTER_2
yoda keys add REPORTER_3
yoda keys add REPORTER_4
yoda keys add REPORTER_5
```

Thirdly, config Lambda Executor endpoint

```bash
export EXECUTOR_URL=<YOUR_EXECUTOR_URL>
yoda config executor "rest:${EXECUTOR_URL}?timeout=10s"
```
### Step 3.3: Register Yoda service

We also do recommend to use `systemctl` the same as `bandd`.

```bash
# Write yoda service to /etc/systemd/system/yoda.service
export USERNAME=$(whoami)
sudo -E bash -c 'cat << EOF > /etc/systemd/system/yoda.service
[Unit]
Description=Yoda Daemon
After=network-online.target

[Service]
User=$USERNAME
ExecStart=/home/$USERNAME/go/bin/yoda run
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF'
```

To register `yoda` services, run the following commands.

```bash
# Register yoda to systemctl
sudo systemctl enable yoda
```

## Step 4: Setup Bothan

Based on design, validators need to submit prices based on current feeds interval. However, the method is quite tedios. Therefore, we have developed an application called `Bothan`, which is a price discovery application that help validators automatically query price from multiple sources, and process it to match with BandChain standard.

### Step 4.1: Download config file

```bash
mkdir -p $HOME/.bothan && wget -O $HOME/.bothan/config.toml $BOTHAN_CONFIG_FILE_URL
```

### Step 4.2: Run Bothan docker

```bash
sudo docker pull bandprotocol/bothan-api:v0.0.1-beta.1
CONTAINER_ID=$(sudo docker run --restart always --log-opt max-size=50m --log-opt max-file=5 -d --name bothan -v "$HOME/.bothan:/root/.bothan" -p 50051:50051 bandprotocol/bothan-api:v0.0.1-beta.1)
```

### Step 4.3: Save your Private Key

To export your Bothan private key, run the following command:

```bash
sudo docker exec -it $CONTAINER_ID /bin/sh -c "bothan key export"
```

This will display your private key. **Make sure to save it in a secure location**, as it is essential for recovering your key using the bothan key import command.

### Step 4.4: Send your Public Key to Monitoring

To retrieve your public key, run this command:

```bash
sudo docker exec -it $CONTAINER_ID /bin/sh -c "bothan key display"
```

After retrieving your public key, submit it via [this form](https://forms.gle/agy1tLguwrtbKueFA). **Do not share your private key.**

## Step 5: Setup Grogu

Based on design, validators need to send a transaction to submit prices based on current feeds interval. The validator should submit prices within a specified timeframe. However, the method is quite tedios. Therefore, we have developed an application called `Grogu`, which is a bot application that help validators automatically query for current feeds, get prices from price service (`Bothan`), and submit prices to BandChain, so validators don't have to send the transactions manually.

### Step 5.1: Configure Grogu

Firstly, configure Grogu's basic configurations

```bash
grogu config chain-id $CHAIN_ID
grogu config validator $(bandd keys show $WALLET_NAME -a --bech val)
grogu config rpc-poll-interval "1s"
grogu config max-try 5
grogu config nodes http://localhost:26657
```

Secondly, add multiple feeder accounts to allow Grogu submitting transactions concurrently.

```bash
grogu keys add FEEDER_1
grogu keys add FEEDER_2
grogu keys add FEEDER_3 
grogu keys add FEEDER_4
grogu keys add FEEDER_5
```

Lastly, config bothan price service endpoint

```bash
grogu config bothan "localhost:50051"
```

### Step 5.3: Register Grogu service

We also do recommend to use `systemctl` the same as `bandd` and `yoda`.

```bash
# Write grogu service to /etc/systemd/system/grogu.service
export USERNAME=$(whoami)
sudo -E bash -c 'cat << EOF > /etc/systemd/system/grogu.service
[Unit]
Description=Grogu Daemon
After=network-online.target

[Service]
User=$USERNAME
ExecStart=/home/$USERNAME/go/bin/grogu run
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF'
```

To register `grogu` services, run the following commands.

```bash
# Register grogu to systemctl
sudo systemctl enable grogu
```

## Step 6: Start services

Then start all services

```bash
# Start bandd daemon
sudo systemctl start bandd
# Start yoda daemon
sudo systemctl start yoda
# Start grogu daemon
sudo systemctl start grogu
```

After a service has been started, logs can be queried by running `journalctl -u <SERVICE_NAME>.service -f` command. Once verified, you can stop tailing the log by typing `Control-C`.

### Step 6.1: Wait for the latest blocks to be synced

**This is an important step.** We should wait for newly started Bandchain node to sync their blocks until the latest block is reached. The latest block can be checked on [this Block Explorer](https://band-v3-testnet.cosmoscan.io/blocks).
