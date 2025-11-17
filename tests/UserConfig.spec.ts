import { test,expect } from '@playwright/test';
import { UserConfig } from '../pages/UserConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';

test.describe('UserConfig', () => {
  let plantsPage: PlantsPage;
  let userConfig: UserConfig;
  let firstName: string;
  let lastName: string;
  let phone: string;
  let email: string;
  let password: string;
  let updatedFirstName: string;
  let updatedLastName: string;
  let updatedPhone: string;
  let country: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    userConfig = new UserConfig(page);
    await page.goto('/userjourneyplants');
    
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    phone = '10' + faker.string.numeric(8); 
    email = faker.internet.email({ firstName, lastName, provider: 'hotmail.com' });
    password = '12345Sport@';
    country = 'Egypt';
    updatedFirstName = firstName + '-updated';
    updatedLastName = lastName + '-updated';
    updatedPhone = '11' + faker.string.numeric(8);
  });

  test('verify add UserConfig', async ({page}) => {
    await plantsPage.openManulSetup();
    await userConfig.addUserConfig(firstName, lastName, phone, email, password);
    await expect(page.getByText('Employee Created Successfully')).toBeVisible();
    console.log('User Config Added:', firstName, lastName, phone, email, password, country);
  });

  test('verify update UserConfig', async ({ page }) => {
    await plantsPage.openManulSetup();
    await userConfig.addUserConfig(firstName, lastName, phone, email, password);
    console.log('User Config Added:', firstName, lastName, phone, email, password);
    await userConfig.updateUserConfig(updatedFirstName, updatedLastName, updatedPhone);
    await expect(page.getByText('Employee Updated Successfully')).toBeVisible();
    console.log('User Config Updated:', updatedFirstName, updatedLastName, updatedPhone);
  });

  test('verify delete UserConfig', async ({ page }) => {
    await plantsPage.openManulSetup();
    await userConfig.addUserConfig(firstName, lastName, phone, email, password);
    console.log('User Config Added:', firstName, lastName, phone, email, password);
    await userConfig.deleteUserConfig();
    await expect(page.getByText('Employee Deleted Successfully')).toBeVisible();
    console.log('User Config Deleted:', firstName, lastName, phone, email, password);
  });
});






