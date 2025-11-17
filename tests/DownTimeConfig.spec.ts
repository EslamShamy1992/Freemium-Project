import { test, expect } from '@playwright/test';
import { PlantsPage } from '../pages/PlantsPage';
import { DowntimeConfig } from '../pages/DowntimeConfig';
import { MachineDetails } from '../pages/MachineDetails';
import { faker } from '@faker-js/faker';



test.describe('DownTimeConfig', () => {
   let plantsPage: PlantsPage; 
   let downtimeconfig: DowntimeConfig;
   let machineDetails:MachineDetails;
   let machine: string;
   let faultCode: string;
   let faultName: string;
   let reasons: string[];
  let departmentName: string ;
  let updatedMachine:string;


  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);  
    downtimeconfig = new DowntimeConfig(page);
    machineDetails=new MachineDetails(page);
    await page.goto('/userjourneyplants');
    departmentName = faker.commerce.department();
    machine = `M-${faker.number.int({ min: 100, max: 999 })}`;
    updatedMachine='machine test'
    faultCode = faker.number.int({ min: 10, max: 99 }).toString();
    faultName = faker.word.noun();
    reasons = [ faker.word.noun(), faker.word.noun(),  faker.word.noun(),faker.word.noun() ];

  });

  test('verify add DownTimeConfig', async ({page}) => {

    await plantsPage.openManulSetup()
    await machineDetails.addMachineDetails(departmentName, machine);
    await downtimeconfig.addDownTimeConfig(machine, faultCode, faultName, reasons);
    await expect(page.getByText('Downtime fault created')).toBeVisible();
    console.log('Downtime Config Added:',machine,faultCode, faultName, reasons);


  });

test('verify update DownTimeConfig', async ({page}) => {
  await plantsPage.openManulSetup()
  await machineDetails.addMachineDetails(departmentName, machine);
  await downtimeconfig.addDownTimeConfig(machine, faultCode, faultName, reasons);  
   await downtimeconfig.updateDowntimeConfig(updatedMachine);
  await expect(page.getByText('Downtime fault updated')).toBeVisible();
  
});

test('verify delete DownTimeConfig', async ({page}) => {
  await plantsPage.openManulSetup()
  await machineDetails.addMachineDetails(departmentName, machine);
  await downtimeconfig.addDownTimeConfig(machine, faultCode, faultName, reasons);
   await downtimeconfig.deleteDowntimeConfig(); 
  await expect(page.getByText('DT fault deleted successfully')).toBeVisible();
   console.log('Downtime Config Deleted:',machine,faultCode, faultName, reasons);    
})

});