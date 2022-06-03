use anchor_lang::prelude::*;

declare_id!("5CJC9SLexjdFwJvuTJaSHg25j3bF9bmXkXm2mhAmFeMm");

#[program]
pub mod myepicproject {
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;
        Ok(())
    }

    // The fucntion now accepts a gif_link param from the user.
    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        // Build the struct.
        let item = ItemStruct {
            gif_link: gif_link.to_string(),
            user_address: *base_account.to_account_info().key,
        };

        // Add it to the gif_list vector.
        base_account.gif_list.push(item);
        base_account.total_gifs += 1;
        Ok(())
    }
    pub fn up_vote_dog(ctx: Context<UpdateGif>, index: u64) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        let i = index as usize;
        if i < base_account.gif_list.len() {
            let mut item = &mut base_account.gif_list[i];
            item.votes += 1;
        }

        Ok(())
    }
    pub fn up_vote_cat(ctx: Context<UpdateGif>, index: u64) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        let i = index as usize;
        if i < base_account.gif_list.len() {
            let mut item = &mut base_account.gif_list[i];
            item.votes += 1;
        }

        Ok(())
    }

    
}

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    // Attach a Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}
