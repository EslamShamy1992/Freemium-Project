import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MachineParameter } from '../pages/MachineParameter';
import { MachineDetails } from '../pages/MachineDetails';
import { PlantsPage } from '../pages/PlantsPage';

test.describe('Machine Parameters Tests', () => {
  let machineParametersPage: MachineParameter;
  let machineDetailsPage: MachineDetails;
  let plantsPage: PlantsPage;
  let parameterName: string;  
  let samplingInterval: string;
  let dataType: string;
  let machineName: string;
  let departmentName: string;
  let updatedParameterName: string;
  let updatedSamplingInterval: string;

  test.beforeEach(async ({ page }) => {
    machineParametersPage = new MachineParameter(page);
    machineDetailsPage = new MachineDetails(page);
    plantsPage = new PlantsPage(page);
    await page.goto('/userjourneyplants');
    
    departmentName = faker.commerce.department();
    machineName = `Machine-${faker.number.int({ min: 100, max: 999 })}`;
    parameterName = faker.word.noun();
    samplingInterval = faker.number.int({ min: 1, max: 60 }).toString();
    dataType = 'Int';
    updatedParameterName = parameterName + '-updated';
    updatedSamplingInterval = (parseInt(samplingInterval) + 10).toString();
  });

  test('Add new Machine Parameter with dynamic data', async ({ page }) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machineName);
    console.log('Machine Details Added:', departmentName, machineName);
    await expect(page.getByText('Record added successfully')).toBeVisible();
    await machineParametersPage.addMachineParameter(machineName, parameterName, samplingInterval, dataType);
    console.log('Machine Parameter Added:', machineName, parameterName, samplingInterval, dataType);
    await expect(page.getByText('Record Inserted successfully')).toBeVisible();
  });



    test('Update Machine Parameter with dynamic data', async ({ page }) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machineName);
    await machineParametersPage.addMachineParameter(machineName, parameterName, samplingInterval, dataType);
    console.log('Machine Parameter Added for Update Test:', machineName, parameterName, samplingInterval, dataType);
    await machineParametersPage.updateMachineParameter(updatedParameterName, updatedSamplingInterval); 
    await expect(page.getByText('Record updated successfully')).toBeVisible();
  });

  
  test('Delete Machine Parameter with dynamic data', async ({ page }) => {
    await plantsPage.openManulSetup();
    await machineDetailsPage.addMachineDetails(departmentName, machineName);
    await expect(page.getByText('Record added successfully')).toBeVisible();
    await machineParametersPage.addMachineParameter(machineName, parameterName, samplingInterval, dataType);
    await expect(page.getByText('Record Inserted successfully')).toBeVisible();
    await machineParametersPage.deleteMachineParameter();
    await expect(page.getByText('Record deleted successfully')).toBeVisible();
  });


});