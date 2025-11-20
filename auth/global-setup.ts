import { chromium, expect } from "@playwright/test";

export default async function globalsetup() {
    const browser = await chromium.launch({headless: process.env.CI ? true : false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.waitForURL('https://mes-lite.o3ozone.ai/login');
  await page.goto('https://mes-lite.o3ozone.ai/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('fesif59035@nyfhk.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345Sport@');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://mes-lite.o3ozone.ai/userjourneyplants', {timeout: 10000});
  await page.context().storageState({ path: 'auth.json'});

  browser.close();
  

}
