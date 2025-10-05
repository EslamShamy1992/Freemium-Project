import { test,expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import{MachineDetails} from '../pages/MachineDetails';
import { PlantsPage } from '../pages/PlantsPage';
test.describe('Machine Details Tests', () => {

  let machinePage: MachineDetails;
  let plantsPage: PlantsPage;
  let departmentName: string;
  let machineName: string;
  let updatedMachineName: string;


    test.beforeEach(async ({ page }) => {

      machinePage = new MachineDetails(page);
      plantsPage = new PlantsPage(page);
      await page.goto('/userjourneyplants');
     departmentName = faker.commerce.department();  
     machineName = `Machine-${faker.number.int({ min: 1, max: 999 })}`;
         updatedMachineName = `${machineName}-updated`;

  
    });
  test('verify add machine details ', async ({ page }) => {

    plantsPage.openManulSetup();
    await machinePage.navigateToMachineDetails();
    await machinePage.addMachineDetails(departmentName, machineName);
    console.log('Machine Added:',departmentName, machineName);
    await expect(page.getByText('Record added successfully')).toBeVisible();
  });

  test('Update existing machine details', async ({ page }) => {
    await plantsPage.openManulSetup();
        await machinePage.navigateToMachineDetails();
    await machinePage.addMachineDetails(departmentName, machineName);
    await machinePage.updateMachine( machineName, updatedMachineName);
    console.log('Machine Updated:', departmentName, updatedMachineName);
    await expect(page.getByText('Record updated successfully')).toBeVisible();

  });

  test('Delete machine from department', async ({ page }) => {

      plantsPage.openManulSetup();
    await machinePage.navigateToMachineDetails();
    await machinePage.deleteMachine();
    await expect(page.getByRole('alertdialog', { name: 'Record deleted successfully' })).toBeVisible({ timeout: 10000 });

  
  });
});
