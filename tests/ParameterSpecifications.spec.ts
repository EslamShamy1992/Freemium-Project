import { test, expect } from '@playwright/test';
import { ParameterSpecifications } from '../pages/ParameterSpecifications';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';


test.describe('ParameterSpecifications', () => {
        let plantsPage: PlantsPage; 
  let parameterSpecifications: ParameterSpecifications;
   let param: string;
  let product: string;
  let lrl: string;
  let lsl: string;
  let lwl: string;
  let target: string;
  let uwl: string;
  let usl: string;
  let machine: string;
  

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    parameterSpecifications = new ParameterSpecifications(page);
    await page.goto('/userjourneyplants');

    // machine = 'Ramon';
     param = "dsfgsdfg"
    product = "rferfwr - rt"
    lrl = faker.number.int({ min: 10, max: 100 }).toString();
    lsl = faker.number.int({ min: 1000, max: 9999 }).toString();
    lwl = faker.number.int({ min: 1000, max: 9999 }).toString();
    target = faker.number.int({ min: 1000, max: 9999 }).toString();
    uwl = faker.number.int({ min: 1000, max: 99999 }).toString();
    usl = faker.number.int({ min: 1000, max: 99999 }).toString();
  });

  test('verify add ParameterSpecifications', async ({page}) => {

   await plantsPage.openManulSetup()
  await parameterSpecifications.addParameterSpecification( param, product, lrl, lsl, lwl, target, uwl,usl );
  await expect(page.getByText('Entry added successfully')).toBeVisible();



});



});