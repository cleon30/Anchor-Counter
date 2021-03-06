const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("π Starting test...");
  
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;
  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.startStuff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  
  console.log("π Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("π Images Count", account.imageCount.toString());
  const value1 = new anchor.BN(4);
  const value2 = new anchor.BN(2);
  const value3 = new anchor.BN(1);
  const value4 = new anchor.BN(2);
  // You'll need to now pass a Image link to the function and [dog_count, cat_count] from AI!
  await program.rpc.addImage("insert_a_giphy_link_here",value1, value2, {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });
  await program.rpc.addImage("https://s2.coinmarketcap.com/static/img/coins/200x200/11368.png", value3, value4, {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });
  await program.rpc.updateCount({
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("π Images Count", account.imageCount.toString());
  console.log("πΆ Dog Count", account.dogCount.toString());
  console.log("π± Cat Count", account.catCount.toString());
  
  // Access image_list on the account!
  console.log("πΈπΈ Images List", account.images);
};

const runMain = async () => {
  try {
    await main();
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();