import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from 'dotenv';
config();
let loginpage:LoginPage;
let companyAdminUsername:string,
companyAdminPassword:string;
test.describe('Login TestCases', async () => {
    test.use({ storageState:{cookies: [], origins: []} });

  test.beforeEach(async({page})=> {
    loginpage= new LoginPage(page);
    companyAdminUsername=process.env.CompanyAdminUsername as string
    companyAdminPassword= process.env.CompanyAdminPassword as string
   await page.goto('/login');

  });
  
test('login with a valid credentials', async ({ page }) => {
await loginpage.login_with_valid_account(companyAdminUsername,companyAdminPassword)
await expect(page.getByRole('button', { name: 'Profile' }).first()).toBeVisible({ timeout: 10000 });

});
test('login with invalid credentials', async ({ page }) => {
    await loginpage.login_with_invalid_account('invalidUser', 'invalidPass'); 
    await expect(page.getByText('Username and Email not Exist')).toBeVisible({ timeout: 10000 });

});
});