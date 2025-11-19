import { chromium, expect } from "@playwright/test";

export default async function globalsetup() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('🔄 Starting global setup...');
        
        await page.goto('https://mes-lite.o3ozone.ai/login', { timeout: 60000 });
        
        console.log('📧 Filling email...');
        await page.getByRole('textbox', { name: 'Email' }).fill('fesif59035@nyfhk.com');
        
        console.log('🔒 Filling password...');
        await page.getByRole('textbox', { name: 'Password' }).fill('12345Sport@');
        
        console.log('🔑 Clicking login...');
        await page.getByRole('button', { name: 'Login' }).click();
        
        await page.waitForTimeout(3000);
        
        console.log('✅ Verifying login success...');
        await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants', { timeout: 30000 });
        
        console.log('💾 Saving auth state...');
        await page.context().storageState({ path: 'auth.json' });
        
        console.log('✅ Global setup completed successfully');
        
    } catch (error) {
        console.error('❌ Global setup failed:', error);
        // Take screenshot for debugging
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

//   await page.goto('https://mes-lite.o3ozone.ai/login', {timeout: 90000});
//   await page.getByRole('textbox', { name: 'Email' }).fill('fesif59035@nyfhk.com');
//   await page.getByRole('textbox', { name: 'Password' }).fill('12345Sport@');
//   await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForTimeout(3000); 
//   await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants');
//   await page.context().storageState({ path: 'auth.json'});

//   browser.close();
  

// }
