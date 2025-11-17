import { test ,expect} from '@playwright/test';
import { WasteConfig } from '../pages/WasteConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { MachineDetails } from '../pages/MachineDetails';
import { faker } from '@faker-js/faker';

test.describe('WasteConfig Tests', () => {
  let plantsPage: PlantsPage;
  let wasteConfig: WasteConfig;
  let machineDetailsPage: MachineDetails;
  let machine: string;
  let categoryType: string;
  let faultCode: string;
  let faultName: string;
  let reasons: string[];
  let departmentName: string;
  let updatedCategoryType: string;
  let updatedFaultCode: string;
  let updatedFaultName: string;
  let updatedReasons: string[];

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    wasteConfig = new WasteConfig(page);
    machineDetailsPage = new MachineDetails(page);
    await page.goto('/userjourneyplants');
    
    departmentName = faker.commerce.department();
    machine = `Machine-${faker.number.int({ min: 100, max: 999 })}`;
    categoryType = 'Waste';
    faultCode = faker.string.alphanumeric(5);
    faultName = faker.word.noun();
    reasons = [
      faker.word.noun(), 
      faker.word.noun(), 
      faker.word.noun(), 
      faker.word.noun()
    ];
    
    updatedCategoryType = 'Updated Waste';
    updatedFaultCode = faultCode + '-updated';
    updatedFaultName = faultName + '-updated';
    updatedReasons = [
      reasons[0] + '-updated',
      reasons[1] + '-updated', 
      reasons[2] + '-updated',
      reasons[3] + '-updated'
    ];
  });

  test('verify add WasteConfig', async ({page}) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machine);
    console.log('Machine Details Added:', departmentName, machine);
    await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
    await expect(page.getByText('Waste fault created')).toBeVisible();
    console.log('Waste Config Added:', machine, categoryType, faultCode, faultName, reasons);
  });

  test('verify update WasteConfig', async ({page}) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machine);
    console.log('Machine Details Added:', departmentName, machine);
    await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
    await wasteConfig.assertWasteConfigAdded();
    console.log('Waste Config Added:', machine, categoryType, faultCode, faultName, reasons);
    await wasteConfig.updateWasteConfig(updatedCategoryType, updatedFaultCode, updatedFaultName, updatedReasons);
    await expect(page.getByText('Waste fault updated')).toBeVisible();
    console.log('Waste Config Updated:', updatedCategoryType, updatedFaultCode, updatedFaultName, updatedReasons);
  });

  test('verify delete WasteConfig', async ({page}) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machine);
    console.log('Machine Details Added:', departmentName, machine);
    await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
    await wasteConfig.assertWasteConfigAdded();
    console.log('Waste Config Added:', machine, categoryType, faultCode, faultName, reasons);
    await wasteConfig.deleteWasteConfig();
    await expect(page.getByText('Waste fault deleted')).toBeVisible();
  });
});

















// import { test, expect } from '@playwright/test';
// import { WasteConfig } from '../pages/WasteConfig';
// import { PlantsPage } from '../pages/PlantsPage';
// import { faker } from '@faker-js/faker';


// test.describe('WasteConfig', () => {
//     let plantsPage: PlantsPage;
//   let wasteConfig: WasteConfig;
//   let machine: string;
//   let categoryType: string;
//   let faultCode: string;
//   let faultName: string;
//   let reasons: string[];

//   test.beforeEach(async ({ page }) => {
//     plantsPage = new PlantsPage(page);
//     wasteConfig = new WasteConfig(page);
//     await page.goto('/userjourneyplants');
//     machine = 'Ramon';
//     categoryType = 'Waste';
//     faultCode = faker.string.alpha(5);
//     faultName = faker.word.noun();
//     reasons = [faker.word.noun(), faker.word.noun(), faker.word.noun(), faker.word.noun()];


//   });

//   test('verify add WasteConfig', async ({page}) => {

//     await plantsPage.openManulSetup()
//     await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
//     await expect(page.getByText('Waste fault created')).toBeVisible();
//     console.log('Waste Config Added:',machine, categoryType, faultCode, faultName, reasons);

// });

// test('verify update WasteConfig', async ({page}) => {
//   await plantsPage.openManulSetup()
//   await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons); 
//   // await wasteConfig.updateWasteConfig(); not implemented yet
//   await expect(page.getByText('Waste fault updated')).toBeVisible();
//   console.log('Waste Config Updated:',machine, categoryType, faultCode, faultName, reasons);    
// });

// test('verify delete WasteConfig', async ({page}) => {
//   await plantsPage.openManulSetup()
//   await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
//   // await wasteConfig.deleteWasteConfig(); not implemented yet
//   await expect(page.getByText('Waste fault deleted')).toBeVisible();
//   console.log('Waste Config Deleted:',machine, categoryType, faultCode, faultName, reasons);    
// })

// });