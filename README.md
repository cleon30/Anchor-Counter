## Anchor Counter
A decentralized counter app that keeps count of the dog count and cat count in a single of multiple uploaded pictures.

### Description
This program is an entry to the MLH Fellowship Orientation Hackathon. It runs on a Solana smart contract written with the Anchor framework in Rust and Javascript + React for the frontend.

It takes a link to the picture in the frontend, identifies the number of dogs and cats in the picture using code written in Tensorflow.js, and sends the results to the Rust backend. The backend code iteratively updates its own dog count and cat count values each time and displays the count to the user.

### Prerequisites

1. Node.js - It's recommended that you install a LTS version of Node using [nvm](https://github.com/nvm-sh/nvm) 

2. Solana Tool Suite - You can see the installation instructions [here](https://docs.solana.com/cli/install-solana-cli-tools).

3. Anchor - You can find the installation instructions [here](https://project-serum.github.io/anchor/getting-started/installation.html).

4. Solana browser wallet - The recommended wallet is [Phantom](https://phantom.app/).

### Build
Welcome to our Anchor Counter App made at MLH Fellowship ^_^ !


You would probably need to install Solana, Anchor and Rust to make it run.
If you haven't already, install those dependencies by following this tutorial : https://project-serum.github.io/anchor/getting-started/installation.html or the steps in the prerequisites section above.


When you are set up, you can clone the repo and run the App by changing into the project directory and running the following commands:

1. Install the dependencies

```sh
npm install
```

2. Start a local Solana node

```sh
solana-test-validator
```

3. Build the anchor project

```sh
anchor build
```

4. Fetch the project ID for the build:

```sh
solana address -k target/deploy/<programname>-keypair.json
```

5. Update the project ID in the Rust program located at __myepicproject/programs/src/lib.rs__ with the output from above.

6. Run the tests

```sh
anchor test
```

7. Change into the __frontend__ directory and install the dependencies:

```sh
cd app && npm install
``` 

8. Run the client-side app

```sh
npm start
```

9. If you need to you can airdrop solana to your address using:

```bash
solana airdrop 2 <YOURPUBKEY>
```

Have fun!




