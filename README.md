## Anchor Counter
A Decentralized counter app that keep count of the dog count and cat count in a single of multiple uploaded pictures.

## About
This program is an entry to the MLH Fellowship Orientation Hackathon. It runs on a Solana smart contract written with the Anchor framework in Rust and Javascript + React for the frontend.

It takes a link to the picture in the frontend, identifies the number of dogs and cats in the picture using code written in Tensorflow.js, and sends the results to the Rust backend. The backend code iteratively updates its own dog count and cat count values each time and displays the count to the user.

## MacOS & Linux
Welcome to our Anchor Counter App made at MLH Fellowship ^_^ . 
You would probably need to install Solana, Anchor and Rust to make it all run.
You can install that dependencies following this tutorial : https://project-serum.github.io/anchor/getting-started/installation.html

When you are set up, you can run the App doing the following commands:
```bash
solana config set --url https://api.devnet.solana.com
```
```bash
cd solana-voting-application
npm i
yarn add ts-mocha
```
```bash
solana-test-validator
# Open in other console de test validator!
```

```bash
anchor build
```
```bash
anchor deploy
```

```bash
solana airdrop 2 <YOURPUBKEY>
#This command only in you don't have lamports on the account
#By the way, you have to change the Program ID from Anchor.toml and lib.rs to make it works!
#Also, you have to turn off the solana validator when testing in next step
```
```bash
anchor test
```

