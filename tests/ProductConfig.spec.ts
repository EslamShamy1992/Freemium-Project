import { test, expect } from '@playwright/test';
import { ProductConfig } from '../pages/ProductConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';

test.describe('ProductConfig', () => {
  let plantsPage: PlantsPage;
  let productConfig: ProductConfig;
  let productCode: string;
  let productDesc: string;
  let machine: string;
  let speed: string;
  let uom: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    productConfig = new ProductConfig(page);
    await page.goto('/userjourneyplants');
    productCode = faker.string.alpha(6).toUpperCase();
    productDesc = faker.commerce.productDescription();
    machine = 'Ramon';
    speed = faker.number.int({ min: 50, max: 500 }).toString();
    uom = faker.string.alpha(3).toUpperCase();
  });

  test('verify add ProductConfig', async ({page}) => {

   await plantsPage.openManulSetup()
   await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
   await expect(page.getByText('Product configuration created')).toBeVisible();
    console.log('Product Config Added:',productCode, productDesc, machine, speed, uom);



  });


});