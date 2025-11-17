import { test, expect } from '@playwright/test';
import { ProductConfig } from '../pages/ProductConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { MachineDetails } from '../pages/MachineDetails';
import { faker } from '@faker-js/faker';

test.describe('ProductConfig', () => {
  let plantsPage: PlantsPage;
  let productConfig: ProductConfig;
  let machinePage: MachineDetails;
  let departmentName: string;
  let productCode: string;
  let productDesc: string;
  let machine: string;
  let speed: string;
  let uom: string;
  let updatedSpeed: string;
  let updatedUom: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    productConfig = new ProductConfig(page);
    machinePage = new MachineDetails(page);
    await page.goto('/userjourneyplants');
    productCode = faker.string.alpha(6).toUpperCase();
    productDesc = faker.commerce.productDescription();
    machine = `Machine-${faker.number.int({ min: 100, max: 999 })}`;
    speed = faker.number.int({ min: 50, max: 500 }).toString();
    uom = faker.string.alpha(3).toUpperCase();
    departmentName = faker.commerce.department();
    updatedSpeed = (parseInt(speed) + 50).toString();
    updatedUom = uom + 'U';
  });

  test('verify add ProductConfig', async ({page}) => {

   await plantsPage.openManulSetup()
   await machinePage.addMachineDetails(departmentName, machine);
   await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
   await expect(page.getByText('Product configuration created')).toBeVisible();
   console.log('Product Config Added:',productCode, productDesc, machine, speed, uom);

  });

  test('verify update ProductConfig', async ({page}) => {
  await plantsPage.openManulSetup()
  await machinePage.addMachineDetails(departmentName, machine);
  await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
  console.log('Product Config Added for Update Test:',productCode, productDesc, machine, speed, uom);
  await productConfig.updateProductConfig(updatedSpeed, updatedUom);
  await expect(page.getByText('Product configuration updated Successfully')).toBeVisible();
  console.log('Product Config Updated:',updatedSpeed, updatedUom);
})

test('verify delete ProductConfig', async ({page}) => {
  await plantsPage.openManulSetup()
  await machinePage.addMachineDetails(departmentName, machine);
  await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);  
  console.log('Product Config Added for Delete Test:',productCode, productDesc, machine, speed, uom);
   await productConfig.deleteProductConfig(); 
  await expect(page.getByText('Product configuration deleted')).toBeVisible();
  await expect(page.getByText(productCode)).not.toBeVisible();
})


})
