import { test, expect } from '@playwright/test';
import { OEEConfig } from '../pages/OEEConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';
import { MachineDetails } from '../pages/MachineDetails';
import { MachineParameter } from '../pages/MachineParameter';
import { DowntimeConfig } from '../pages/DowntimeConfig';


test.describe('OEEConfig', () => {
    let plantsPage: PlantsPage;
  let oeeConfig: OEEConfig;
  let machineDetailsPage: MachineDetails;
  let machineParametersPage: MachineParameter;
  let downtimeConfig: DowntimeConfig;
  let machine: string;
  let netgross: string;
  let auto: string;
  let fault: string;
  let departmentName: string;
  let parameterName: string;
  let samplingInterval: string;
  let dataType: string;
  let faultCode: string;
  let faultName: string;
  let reasons: string[]; 


  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    oeeConfig = new OEEConfig(page);
    machineDetailsPage = new MachineDetails(page);
    machineParametersPage = new MachineParameter(page);
    downtimeConfig = new DowntimeConfig(page);
    await page.goto('/userjourneyplants');
    machine = `Machine-${faker.number.int({ min: 100, max: 999 })}`;
    departmentName = faker.commerce.department();
     parameterName = faker.word.noun();
    samplingInterval = faker.number.int({ min: 1, max: 60 }).toString();
    dataType = 'Int';
    auto = 'No';
    faultCode = faker.string.alphanumeric(5);
    fault = faker.commerce.productName();
    reasons = [faker.lorem.word(), faker.lorem.word()];
  });

  test('verify add OEEConfig', async ({page}) => {

 await plantsPage.openManulSetup()
 await machineDetailsPage.addMachineDetails(departmentName, machine);
 await machineParametersPage.addMachineParameter(machine, parameterName, samplingInterval, dataType);
 await downtimeConfig.addDownTimeConfig(machine, faultCode, fault, reasons);
 await oeeConfig.addOEEConfig(machine, parameterName, auto, fault);
 await expect (page.getByText('OEE Configuration Added')).toBeVisible();
 console.log('OEE Config Added:',machine, parameterName, auto, fault);

});

test('verify update OEEConfig', async ({page}) => {  

  await plantsPage.openManulSetup()
 await machineDetailsPage.addMachineDetails(departmentName, machine);
 await machineParametersPage.addMachineParameter(machine, parameterName, samplingInterval, dataType);
 await downtimeConfig.addDownTimeConfig(machine, faultCode, fault, reasons);
 await oeeConfig.addOEEConfig(machine, parameterName, auto, fault);
 console.log('OEE Config Added:',machine, parameterName, auto, fault);
 await oeeConfig.updateOEEConfig("Yes");  
  await expect (page.getByText('OEE Configuration Updated')).toBeVisible();

})


test('verify delete OEEConfig', async ({page}) => {  

 await plantsPage.openManulSetup()
 await machineDetailsPage.addMachineDetails(departmentName, machine);
 await machineParametersPage.addMachineParameter(machine, parameterName, samplingInterval, dataType);
 await downtimeConfig.addDownTimeConfig(machine, faultCode, fault, reasons);
 await oeeConfig.addOEEConfig(machine, parameterName, auto, fault);
 console.log('OEE Config Added:',machine, parameterName, auto, fault);
 await oeeConfig.deleteOEEConfig();  
 await expect (page.getByText('OEE Configuration Deleted')).toBeVisible();   

})


});