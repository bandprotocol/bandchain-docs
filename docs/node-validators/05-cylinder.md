# Cylinder

Cylinder is a program designed for TSS (Threshold Signature Scheme) members to submit group creation information and signatures for requested messages from BandChain.

When members are selected through a TSS group creation proposal, they must submit their information using a series of messages to ensure proper participation in the process. These messages include:

- `MsgSubmitDKGRound1`: For submitting the commitments and public exchange key that being used for generating member secret.
- `MsgSubmitDKGRound2`: For submitting shared encrypted partial secrets.
- `MsgConfirm`: To finalize participation and approve correctness of the group creation information.
- `MsgComplain`: To report incorrect information provided by malicious members.

Additionally, a subset of members selected for a request must submit their signatures for the requested message within a limited time using the `MsgSubmitSignature` message. They are also responsible for maintaining public signing nonces (public DEs) on BandChain via the `MsgSubmitDEs` message to fulfill their obligations.

While these transactions can be sent manually by users, it is inconvenient and time-consuming. To streamline this process, Cylinder has been developed to automatically handle the signing and submission of requested messages on behalf of the members.

Cylinder's execution flow consists of two main parts: **Group Creation** and **Signing**.

**Group Creation Flow**

1. Listening for a group creation event
2. Submitting member's commitments and exchange key
3. Submitting member's shared secrets
4. Finalizing member private key

**Signing Flow**

1. Generating public signing nonce.
2. Listening for incoming signing requests.
3. Submitting signatures.

Cylinder typically operates independently from the main BandChain daemon process. It manages additional wallet (private key) accounts, referred to as grantee accounts, which are owned by individual TSS members. These grantee accounts are used to facilitate the submission of signature transactions on behalf of the members, ensuring a seamless and efficient signing process.

The primary reason for using a grantee account instead of a member's main account is to enhance the security of the member's private key. If the Cylinder server is compromised, only the grantee account's private key would be exposed, while the member's private key remains secure. Additionally, it is recommended that TSS members use hardware wallets for their main accounts. Hardware wallets are designed for high-security environments and are not suitable for servers that operate continuously, 24/7.

Cylinder's mechanism is designed with an event-driven approach, handling tasks concurrently to improve performance.

The following section describes mechanism of the Cylinder in each step.

## Group Creation Flow

![Cylinder's group creation diagram](https://i.imgur.com/53LFAS3.png)

### 1. Listening for a Group Creation Event (1-2)

Cylinder listens for new TSS group creation proposals through the BandChain’s Tendermint RPC WebSocket. Once a proposal is detected, Cylinder checks whether the request is assigned to the respective TSS member.

### 2. Submitting Member's Exchange Key and Commitment (3-6)

After detecting the group creation request, Cylinder generates private exchange key and commitments (representing partial keys) and stores them in its storage. Cylinder then shares these commitments and public exchange keys with BandChain by submitting a `MsgSubmitDKGRound1` message. This ensures that all participants have access to the necessary public commitments to verify each other's contributions. Once every member submits their Round 1 information, BandChain aggregates the submitted data, computes the group public key, and emits an event to notify members to proceed to the next step.

### 3. Submitting Member's Shared Secrets (9-11)

After receiving the event from the previous step, Cylinder exchanges secret values using verifiable encryption and submits those information to BandChain via the `MsgSubmitDKGRound2` message. These secrets are essential for securely exchanging data with other members during the DKG rounds. Once every member submits their data, BandChain emits an event to notify members to proceed further.

### 4. Finalizing Member Private Key (14-17)

After receiving the event from the previous step, Cylinder queries the encrypted secret shares and forms the member's private key. If Cylinder succeeds to aggregate member private keys, it submit a `MsgConfirm` to BandChain; otherwise, creates a complaint message identifying malicious members and submit it via `MsgComplain`.

## Signing Execution Steps

![Cylinder's signing diagram](https://i.imgur.com/jeH6LBp.png)

### 1. Listening for Incoming Signing Requests

When a user creates a signing request for a message, BandChain randomly selects members from the TSS group and consumes their public nonces, which are generated submitted by Cylinder through `MsgSubmitDEs`, to initialize the signing data. BandChain then publishes a signing request event. Cylinder monitors these incoming signing requests through Tendermint’s RPC WebSocket and processes the related request.

Cylinder generates and submits the member’s public signing nonce (public DE) to BandChain using the message. This ensures that the signing data is properly initialized and ready for use.

### 2. Submitting Signatures

Cylinder signs the message and submits `MsgSubmitSignature` messages containing the member’s signature for the requested data. These messages are sent within the designated time frame to fulfill the signing obligation. BandChain aggregates the members' signatures and computes the group signature for the requested message.
