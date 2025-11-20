import { chromium, expect } from "@playwright/test";
import dotenv from 'dotenv';

const envFile = process.env.CI ? '.env.dev' : '.env';
dotenv.config({ path: envFile });

export default async function globalsetup() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('🔄 Starting global authentication setup...');
        console.log('📁 Using env file:', envFile);
                const email = process.env.CompanyAdminUsername;
        const password = process.env.CompanyAdminPassword;
        
        if (!email || !password) {
            console.error('❌ Missing credentials in environment variables');
            throw new Error('Environment variables not loaded');
        }
        
        console.log('🔐 Using email:', email);
        
        await page.goto('https://mes-lite.o3ozone.ai/login', { timeout: 60000 });
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible({ timeout: 10000 });
        
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Login' }).click();
        
        await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants', { timeout: 30000 });
        
        await page.context().storageState({ path: 'auth.json' });
        
        console.log('✅ Authentication state saved to auth.json');
        console.log('✅ Global setup completed successfully');
        
    } catch (error) {
        console.error('❌ Global setup failed:', error);
        await page.screenshot({ path: 'global-setup-error.png', fullPage: true });
        throw error;
    } finally {
        await browser.close();
    }
}












// import { chromium, expect } from "@playwright/test";

// export default async function globalsetup() {
//     const browser = await chromium.launch({headless: true });
//     const context = await browser.newContext();
//     const page = await context.newPage();

//   await page.goto('https://mes-lite.o3ozone.ai/login', {timeout: 10000});
//   await page.getByRole('textbox', { name: 'Email' }).fill('fesif59035@nyfhk.com');
//   await page.getByRole('textbox', { name: 'Password' }).fill('12345Sport@');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants', {timeout: 10000});
//   await page.context().storageState({ path: 'auth.json'});

//   browser.close();
  

// }
