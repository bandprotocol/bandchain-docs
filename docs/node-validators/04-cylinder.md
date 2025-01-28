# Cylinder

Cylinder is a program used by TSS members to submit group creation information and signatures for requested messages from BandChain.

When members are selected through a TSS group creation proposal, they must submit their information using a series of messages to ensure proper participation in the process. These messages include:

- `MsgSubmitDKGRound1`: For submitting the member's partial public keys.
- `MsgSubmitDKGRound2`: For submitting shared secrets used to exchange necessary data during the Distributed Key Generation (DKG) rounds.
- `MsgConfirm`: To finalize participation and securely establish their role in the TSS group.
- `MsgComplain`: To report incorrect information provided by other members

Additionally, a subset of members selected for a request must submit their signatures for the requested message within a limited time using the `MsgSubmitSignature` message. They are also responsible for maintaining public signing nonces (public DEs) on BandChain via the `MsgSubmitDEs` message to fulfill their obligations.

Although the transaction can be sent manually by users, it is inconvenient and time-consuming. Therefore, we have developed Cylinder to help members automatically handle the signing and submission process for requested messages.

Cylinder's execution flow consists of two main parts: group creation and signing.

**Group Creation Flow**

1. Listening for a Group Creation Event
2. Submitting Member's partial public keys
3. Submitting Member's Shared Secrets
4. Finalizing partial private key

**Signing Flow**

1. Generating public signing nonce.
2. Listening for incoming signing requests.
3. Submitting signatures.

Cylinder typically operates independently from the main BandChain daemon process. It manages additional wallet (private key) accounts referred to as grantee accounts, which are owned by individual TSS members. These grantee accounts are used to facilitate the submission of signature transactions on behalf of the members, ensuring a seamless and efficient signing process.

The primary reason for using a grantee account instead of a member's main account is to enhance the security of the member's private key. If the Cylinder server is compromised, only the grantee account's private key would be exposed, while the member's private key remains secure. Additionally, it is recommended that TSS members utilize hardware wallets for their main accounts. Hardware wallets are designed for high-security environments and are not suitable for servers that operate continuously, 24/7.

It's mechanism is designed as event-driven approach, which handle tasks concurrently to improve performance.

<!-- TODO: add diagram -->

The image above represents high-level mechanism of Cylinder.

The following section describes mechanism of the Cylinder in each step.

## Group Creation Flow

### 1. Listening for a Group Creation Event

Cylinder listens for new TSS group creation proposals through the BandChain’s Tendermint RPC WebSocket. Once detected, Cylinder identifies whether it is the group creation request that is assigned to the respective TSS member.

### 2. Submitting Member's Partial Public Key

After detecting the group creation request, Cylinder generates private key and public commitment representing as a partial keys and store them in the storage. After Cylinder generates those data, it then share their commitments to the BandChain by submitting a `MsgSubmitDKGRound1` message. This ensures that all participants have access to the necessary public commitments to verify each other's contributions. BandChain then aggregate those submitted data and compute the group public key. Once every member submits the Round1 information, BandChain emits an event to notify member that can process further.

### 3. Submitting Member's Shared Secrets

After receiving an event from the above, Cylinder exchange secret values using verifiable encryption on BandChain to ensure that the data shared is valid and secure via `MsgSubmitDKGRound2`. These secrets are essential for securely exchanging data with other members during the DKG rounds. Once every member submit their data, BandChain emits an event to notify member that can process further.

### 4. Finalizing Partial Private Key

After receiving an event from the above, Cylinder queries encrypted secret shares and form his partial private key. If Cylinder succeeds to aggregate partial private keys, it submit a `MsgConfirm` to BandChain; otherwise, creates a complaint message identifying who are malicious and submit it via `MsgComplain`.

## Signing Execution Steps

### 1. Generating Public Signing Nonce

Cylinder generates and submits the member’s public signing nonce (public DE) to BandChain, ensuring that the signing data is properly initialized.

### 2. Listening for Incoming Signing Requests

Once user creates a signing on requested message, BandChain will randomly select members in the TSS group and consume their public nonce to initialize a signing data and publish a signing request event at the end of the process. Cylinder monitors these incoming signing requests through Tendermint’s RPC WebSocket and process further on the related request.

### 3. Submitting Signatures

Cylinder constructs and submits `MsgSubmitSignature` messages containing the member’s signature for the requested data. These messages are sent within the designated time frame to fulfill the signing obligation. BandChain will aggregate those member's signature and compute the group signature of the requested message.
