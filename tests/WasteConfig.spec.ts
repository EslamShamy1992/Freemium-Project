import { test, expect } from '@playwright/test';
import { WasteConfig } from '../pages/WasteConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';


test.describe('WasteConfig', () => {
    let plantsPage: PlantsPage;
  let wasteConfig: WasteConfig;
  let machine: string;
  let categoryType: string;
  let faultCode: string;
  let faultName: string;
  let reasons: string[];

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    wasteConfig = new WasteConfig(page);
    await page.goto('/userjourneyplants');
    machine = 'Ramon';
    categoryType = 'Waste';
    faultCode = faker.string.alpha(5);
    faultName = faker.word.noun();
    reasons = [faker.word.noun(), faker.word.noun(), faker.word.noun(), faker.word.noun()];


  });

  test('verify add WasteConfig', async ({page}) => {

    await plantsPage.openManulSetup()
    await wasteConfig.addWasteConfig(machine, categoryType, faultCode, faultName, reasons);
    await expect(page.getByText('Waste fault created')).toBeVisible();
    console.log('Waste Config Added:',machine, categoryType, faultCode, faultName, reasons);

});


});