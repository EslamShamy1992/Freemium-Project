import { test, expect } from '@playwright/test';
import { OEEConfig } from '../pages/OEEConfig';
import { PlantsPage } from '../pages/PlantsPage';



test.describe('OEEConfig', () => {
    let plantsPage: PlantsPage;
  let oeeConfig: OEEConfig;
  let machine: string;
  let netgross: string;
  let auto: string;
  let fault: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    oeeConfig = new OEEConfig(page);
    await page.goto('/userjourneyplants');
    machine = 'Ramon';
    netgross = 'dsfgsdfg';
    auto = 'Yes';
    fault = 'wrftewr';
  });

  test('verify add OEEConfig', async ({page}) => {

await plantsPage.openManulSetup()
 await oeeConfig.addOEEConfig(machine, netgross, auto, fault);
 await expect (page.getByText('OEE Configuration Added')).toBeVisible();
 console.log('OEE Config Added:',machine, netgross, auto, fault);
 


});



});