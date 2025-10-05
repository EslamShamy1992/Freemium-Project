import { test, expect } from '@playwright/test';
import { PlantsPage } from '../Freemium-Project/pages/PlantsPage';
import { DowntimeConfig } from '../Freemium-Project/pages/DowntimeConfig';
import { faker } from '@faker-js/faker';



test.describe('DownTimeConfig', () => {
   let plantsPage: PlantsPage; 
   let downtimeconfig: DowntimeConfig;
   let machine: string;
   let faultCode: string;
   let faultName: string;
   let reasons: string[];

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);  
    downtimeconfig = new DowntimeConfig(page);
    await page.goto('/userjourneyplants');
    machine = 'Ramon';
    faultCode = faker.number.int({ min: 10, max: 99 }).toString();
    faultName = faker.word.noun();
    reasons = [ faker.word.noun(), faker.word.noun(),  faker.word.noun(),faker.word.noun() ];

  });

  test('verify add DownTimeConfig', async ({page}) => {

    await plantsPage.openManulSetup()
    await downtimeconfig.addDownTimeConfig(machine, faultCode, faultName, reasons);
    await expect(page.getByText('Downtime fault created')).toBeVisible();
    console.log('Downtime Config Added:',machine,faultCode, faultName, reasons);




  });



});