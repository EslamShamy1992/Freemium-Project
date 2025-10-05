import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from 'dotenv';
config();
let loginpage:LoginPage;
let companyAdminUsername:string,
companyAdminPassword:string;
test.describe('Login TestCases', async () => {

  test.beforeEach(async({page})=> {
    loginpage= new LoginPage(page);
    companyAdminUsername=process.env.CompanyAdminUsername as string
    companyAdminPassword= process.env.CompanyAdminPassword as string
   await page.goto('/login');

  });
  
test('login with a valid credentials', async ({ page }) => {

await loginpage.login_with_valid_account(companyAdminUsername,companyAdminPassword)
await expect(page.getByRole('button', { name: 'Profile' }).first()).toBeVisible()
await page.pause()

});

});