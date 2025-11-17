import { test, expect } from '@playwright/test';
import { ParameterSpecifications } from '../pages/ParameterSpecifications';
import { PlantsPage } from '../pages/PlantsPage';
import { MachineDetails } from '../pages/MachineDetails';
import { MachineParameter } from '../pages/MachineParameter';
import { ProductConfig } from '../pages/ProductConfig';
import { faker } from '@faker-js/faker';


test.describe('ParameterSpecifications', () => {
        let plantsPage: PlantsPage; 
  let parameterSpecifications: ParameterSpecifications;
  let machineDetails: MachineDetails;
  let machineParameter: MachineParameter;
  let productConfig: ProductConfig;
   let param: string;
  let product: string;
  let lrl: string;
  let lsl: string;
  let lwl: string;
  let target: string;
  let uwl: string;
  let usl: string;
  let machine: string;
  let departmentName: string;
  let Parameter: string;
  let samplingInterval: string;
  let preferredDataType: string;
  let productCode: string;
  let productDesc: string;
  let speed: string;
  let uom: string;
  let updatedLrl: string;
  let updatedLsl: string;
  let updatedLwl: string;
  let updatedTarget: string;
  let updatedUwl: string;
  let updatedUsl: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    parameterSpecifications = new ParameterSpecifications(page);
    machineDetails = new MachineDetails(page);
    machineParameter = new MachineParameter(page);
    productConfig = new ProductConfig(page);
    await page.goto('/userjourneyplants');
    departmentName = faker.commerce.department();
    machine = `Machine-${faker.number.int({ min: 100, max: 999 })}`;
    Parameter = faker.word.noun();
    samplingInterval = faker.number.int({ min: 1, max: 60 }).toString();
    preferredDataType = 'Float';
    productCode = faker.string.alphanumeric(8).toUpperCase();
    productDesc = faker.commerce.productDescription();
    speed = faker.number.int({ min: 100, max: 1000 }).toString();
    uom = faker.word.noun();
    lrl = faker.number.int({ min: 10, max: 100 }).toString();
    lsl = faker.number.int({ min: 1000, max: 9999 }).toString();
    lwl = faker.number.int({ min: 1000, max: 9999 }).toString();
    target = faker.number.int({ min: 1000, max: 9999 }).toString();
    uwl = faker.number.int({ min: 1000, max: 99999 }).toString();
    usl = faker.number.int({ min: 1000, max: 99999 }).toString();
    updatedLrl = (parseInt(lrl) + 10).toString();
    updatedLsl = (parseInt(lsl) + 10).toString();
    updatedLwl = (parseInt(lwl) + 10).toString();
    updatedTarget = (parseInt(target) + 10).toString();
    updatedUwl = (parseInt(uwl) + 10).toString();
    updatedUsl = (parseInt(usl) + 10).toString();
  });

  test('verify add ParameterSpecifications', async ({page}) => {

   await plantsPage.openManulSetup()
  await machineDetails.addMachineDetails(departmentName, machine);
  await machineParameter.addMachineParameter(machine, Parameter, samplingInterval,preferredDataType);
  await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
  await parameterSpecifications.navigatetoParameterSpecifications();
  await parameterSpecifications.addParameterSpecification( Parameter, productCode, lrl, lsl, lwl, target, uwl,usl );
  await expect(page.getByText('Entry added successfully')).toBeVisible();


});

test('verify update ParameterSpecifications', async ({page}) => {
 await plantsPage.openManulSetup()
  await machineDetails.addMachineDetails(departmentName, machine);
  await machineParameter.addMachineParameter(machine, Parameter, samplingInterval,preferredDataType);
  await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
  await parameterSpecifications.navigatetoParameterSpecifications();
  await parameterSpecifications.addParameterSpecification( Parameter, productCode, lrl, lsl, lwl, target, uwl,usl );
 await parameterSpecifications.updateParameterSpecification(updatedLrl, updatedLsl, updatedLwl, updatedTarget, updatedUwl, updatedUsl); 
  await expect(page.getByText('Entry updated successfully')).toBeVisible();
})

  test('verify delete ParameterSpecifications', async ({page}) => {
  await plantsPage.openManulSetup()
  await machineDetails.addMachineDetails(departmentName, machine);
  await machineParameter.addMachineParameter(machine, Parameter, samplingInterval,preferredDataType);
  await productConfig.addProductConfig(productCode, productDesc, machine, speed, uom);
  await parameterSpecifications.navigatetoParameterSpecifications();
  await parameterSpecifications.addParameterSpecification( Parameter, productCode, lrl, lsl, lwl, target, uwl,usl );
  await parameterSpecifications.deleteParameterSpecification(); 
  await expect(page.getByText('C0-deleted successfully')).toBeVisible(); 


});




});