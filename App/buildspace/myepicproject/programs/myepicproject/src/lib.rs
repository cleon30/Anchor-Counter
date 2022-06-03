use anchor_lang::prelude::*;

declare_id!("5CJC9SLexjdFwJvuTJaSHg25j3bF9bmXkXm2mhAmFeMm");

#[program]
pub mod myepicproject {
    use super::*;
    pub fn start_stuff(ctx: Context<StartStuff>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.image_count = 0;
        base_account.dog_count = 0;
        base_account.cat_count = 0;
        base_account.images = Vec::new();
        Ok(())
    }

    // The function now accepts a gif_link param from the user.
    pub fn add_image(ctx: Context<AddImage>, img_link: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;

        // Build the struct.
        let item = Image {
            image_link: img_link.to_string(),
            user_address: *base_account.to_account_info().key,
        };

        // Add it to the images vector.
        base_account.images.push(item);
        base_account.image_count += 1;
        Ok(())
    }
    /* pub fn up_vote_dog(ctx: Context<UpdateGif>, index: u64) -> Result<()> {
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
    } */

    
}

#[derive(Accounts)]
pub struct StartStuff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddImage<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// Create a custom struct to represent image information
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Image {
    pub image_link: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub image_count: u64,
    pub dog_count: u64,
    pub cat_count: u64,
    // Attach a Vector of type ItemStruct to the account.
    pub images: Vec<Image>,
}
