import { chromium, expect } from "@playwright/test";

export default async function globalsetup() {
    const browser = await chromium.launch({headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

  await page.goto('https://mes-lite.o3ozone.ai/login', {timeout: 90000});
  await page.getByRole('textbox', { name: 'Email' }).fill('fesif59035@nyfhk.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345Sport@');
  await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(3000); 
  await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants');
  await page.context().storageState({ path: 'auth.json'});

  browser.close();
  

}
