import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CounterApp } from "../target/types/counter_app";

describe("counter-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CounterApp as Program<CounterApp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
