import { test,expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MachineParameter } from '../pages/MachineParameter';
import { PlantsPage } from '../pages/PlantsPage';
test.describe('Machine Parameters Tests', () => {


  let machineParametersPage: MachineParameter;
  let plantsPage: PlantsPage;
  let parameterName: string;  
  let samplingInterval: string;
  let dataType: string;
  let machine: string;

    test.beforeEach(async ({ page }) => {
  
        machineParametersPage = new MachineParameter(page);
        plantsPage = new PlantsPage(page);
        await page.goto('/userjourneyplants');
         machine = 'Ramon';
        parameterName = faker.word.noun();
       samplingInterval = faker.number.int({ min: 1, max: 60 }).toString();
        dataType = 'Int';
    
      });
  test('Add new Machine Parameter with random machine & random data type', async ({ page }) => {
  
    await plantsPage.openManulSetup()
    await machineParametersPage.addMachineParameter( machine,parameterName, samplingInterval, dataType );
    await expect(page.getByText('Machine Parameter Added')).toBeVisible();
    console.log('Machine Parameter Added:',parameterName, samplingInterval);
  });

  test('Add another Machine Parameter with random machine & random data type', async ({ page }) => {

    await plantsPage.openManulSetup()
     await machineParametersPage.addMachineParameter(machine ,parameterName, samplingInterval, dataType );
    await expect(page.getByText('Machine Parameter Added')).toBeVisible();});
});
