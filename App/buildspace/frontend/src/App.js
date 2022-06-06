import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';

import idl from './idl.json';
import kp from './keypair.json';


// Constants
const { SystemProgram, Keypair } = web3;
const anchor = require("@project-serum/anchor");

const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id form the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devent.
const network = clusterApiUrl('devnet');

// Control's how we want to acknowledge when a trasnaction is "done".
const opts = {
  preflightCommitment: "processed"
}

const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  
  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
	  return provider;
  };

  const getImages = async() => {
    try {
      
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      
      console.log("Got the account", account)
      console.log("👀 Images Count", account.imageCount.toString());
      console.log("🐶 Dog Count", account.dogCount.toString());
      console.log("🐱 Cat Count", account.catCount.toString());
      setImages(account.images)

    } catch (error) {
      console.log("Error in getimages: ", error)
      setImages(null);
    }
  };

  const createImageAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("ping")
      await program.rpc.startStuff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
      await getImages();

    } catch(error) {
      console.log("Error creating BaseAccount account:", error)
    }
  };

  const sendImage = async () => {
    if (inputValue.length === 0) {
      console.log("No image link given!")
      return
    }
    console.log('image link:', inputValue);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      
      await program.rpc.addImage(inputValue, new anchor.BN(105), new anchor.BN(5), {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
        
      });
      await program.rpc.updateCount({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });
      
      console.log("image sucesfully sent to program", inputValue)
      await getImages();
    } catch (error) {
      console.log("Error sending image:", error)
    }
  };
  

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => {
	// If we hit this, it means the program account hasn't be initialized.
  if (images === null) {
    return (
      <div className="connected-container">
        <button className="cta-button submit-image-button" onClick={createImageAccount}>
          Do One-Time Initialization For image Program Account
        </button>
      </div>
    )
  } 
	// Otherwise, we're good! Account exists. User can submit images.
	else {
    return(
      <div className="connected-container">
        <input
          type="text"
          placeholder="Enter image link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button className="cta-button submit-image-button" onClick={sendImage}>
          Submit
        </button>
        <div className="image-grid">
					{/* We use index as the key instead, also, the src is now item.imageLink */}
          {images.map((item, index) => (
            <div className="image-item" key={index}>
              <img src={item.imageLink} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}


  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching image list...');
      getImages();
    }
  }, [walletAddress]);

  return (
    <div className="App">
			{/* This was solely added for some styling fanciness */}
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 Solana Doge Contest</p>
          <p className="sub-text">
            View your image collection in the metaverse ✨
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};


export default App;