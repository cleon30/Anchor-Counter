use anchor_lang::prelude::*;

declare_id!("AGmmcxKsubmy2vGKBvGAfqKs8GVoGQNyD2LQHADg3x2u");

#[program]
pub mod myepicproject {
    use super::*;
    pub fn start_stuff(ctx: Context<StartStuff>) -> Result<()> {
        ctx.accounts
            .base_account
            .initialize()
    }

    // The function now accepts a gif_link param from the user.
    pub fn add_image(ctx: Context<AddImage>, image_link: String, cats: u64, dogs: u64) -> Result<()> {
        ctx.accounts
            .base_account
            .add_image(image_link, cats, dogs)
    }

    pub fn update_count(ctx: Context<CountImages>) -> Result<()> {
        ctx.accounts
            .base_account
            .update_count()
    }
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

#[derive(Accounts)]
pub struct CountImages<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>
}

// Create a custom struct to represent image information
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Image {
    pub image_link: String,
    pub cat_count: u64,
    pub dog_count: u64,
}

#[account]
pub struct BaseAccount {
    image_count: u64,
    dog_count: u64,
    cat_count: u64,
    images: Vec<Image>,
}

impl BaseAccount {
    pub fn initialize(&mut self) -> Result<()> {
        self.image_count = 0;
        self.dog_count = 0;
        self.cat_count = 0;
        self.images = Vec::new();
        Ok(())
    }

    pub fn add_image(&mut self, link: String, cats: u64, dogs: u64 ) -> Result<()> {
        
        let item = Image {
            image_link: link.to_string(),
            cat_count: cats,
            dog_count: dogs,
        };

        // Update the images vector
        self.images.push(item);
        Ok(())
    }

    pub fn update_count(&mut self) -> Result<()> {
        // Iteratively update our count variables
        for image in self.images.to_owned() {
            self.cat_count += image.cat_count;
            self.dog_count += image.dog_count;
            self.image_count += 1;
        }
        Ok(())
    }
}