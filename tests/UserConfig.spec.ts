import { test, expect } from '@playwright/test';
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

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    userConfig = new UserConfig(page);
    await page.goto('/userjourneyplants');
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    phone = '54' + faker.string.numeric(7);
    email = faker.internet.email();
    password = '12345Sport@';
  });

  test('verify add UserConfig', async ({page}) => {

  await  plantsPage.openManulSetup()
  await userConfig.addUserConfig(firstName, lastName, phone, email, password);
  await expect(page.getByText('Employee Created Successfully')).toBeVisible();
  console.log('User Config Added:',firstName, lastName, phone, email, password);

  });


});