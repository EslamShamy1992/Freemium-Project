import { Page, Locator, expect } from '@playwright/test';
import { BasePages } from './BasePages';

export class MachineParameter extends BasePages {
  private tuneMachineParametersMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private machineOption: (machine: string) => Locator;
  private parameterInput: Locator;
  private samplingIntervalInput: Locator;
  private dataTypeDropdown: Locator;
  private dataTypeOption: (type: string) => Locator;
  private saveBtn: Locator;
  private updateBtn: Locator;
  private deleteBtn: Locator;
  private confirmDeleteBtn: Locator;
  private editBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.tuneMachineParametersMenu = page.getByText(' Machine Parameters ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(3);
    this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).locator('span');
    this.parameterInput = page.getByRole('textbox', { name: 'Parameter' });
    this.samplingIntervalInput = page.getByRole('textbox', { name: 'Sampling Interval' });
    this.dataTypeDropdown = page.getByRole('combobox', { name: 'Data Type' }).locator('span');
    this.dataTypeOption = (type: string) => page.getByRole('option', { name: type }).locator('span');
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.deleteBtn = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes' });
    this.editBtn = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
  }

  async addMachineParameter(machine: string, parameterName: string, samplingInterval: string, dataType: string) {
    await this.tuneMachineParametersMenu.click();
    await expect(this.addBtn).toBeVisible({ timeout: 10000 });
    await this.addBtn.click();
    await expect(this.machineDropdown).toBeVisible({ timeout: 10000 });
    await this.machineDropdown.click();
    await expect(this.machineOption(machine)).toBeVisible({ timeout: 10000 });
    await this.machineOption(machine).click();
        await expect(this.parameterInput).toBeVisible({ timeout: 5000 });
    await this.parameterInput.fill(parameterName);
    await expect(this.parameterInput).toHaveValue(parameterName);
    
    await expect(this.samplingIntervalInput).toBeVisible({ timeout: 5000 });
    await this.samplingIntervalInput.fill(samplingInterval);
    await expect(this.samplingIntervalInput).toHaveValue(samplingInterval);
        await expect(this.dataTypeDropdown).toBeVisible({ timeout: 10000 });
    await expect(this.dataTypeDropdown).toBeEnabled();
    await this.dataTypeDropdown.click();
        await expect(this.dataTypeOption(dataType)).toBeVisible({ timeout: 10000 });
    await this.dataTypeOption(dataType).click();
        await expect(this.saveBtn).toBeEnabled({ timeout: 5000 });
    await this.saveBtn.click();
  }

  async updateMachineParameter(updateParameter: string, updateSampling: string) {
    await expect(this.editBtn).toBeVisible({ timeout: 10000 });
    await this.editBtn.click();
    
    await expect(this.parameterInput).toBeVisible({ timeout: 10000 });
    await expect(this.samplingIntervalInput).toBeVisible({ timeout: 10000 });
        await this.parameterInput.clear();
    await this.parameterInput.fill(updateParameter);
    await expect(this.parameterInput).toHaveValue(updateParameter);
        await this.samplingIntervalInput.clear();
    await this.samplingIntervalInput.fill(updateSampling);
    await expect(this.samplingIntervalInput).toHaveValue(updateSampling);
        await expect(this.dataTypeDropdown.first()).toBeVisible({ timeout: 10000 });
    await expect(this.dataTypeDropdown.first()).toBeEnabled();
    await this.dataTypeDropdown.first().click();
        await expect(this.dataTypeOption('Float')).toBeVisible({ timeout: 10000 });
    await this.dataTypeOption('Float').click();
        await expect(this.updateBtn).toBeEnabled({ timeout: 5000 });
    await this.updateBtn.click();
  }

  async deleteMachineParameter() {
    await expect(this.deleteBtn).toBeVisible({ timeout: 10000 });
    await this.deleteBtn.click();
        await expect(this.confirmDeleteBtn).toBeVisible({ timeout: 10000 });
    await this.confirmDeleteBtn.click();
  }

  async assertParameterAdded() {
    await expect(this.page.getByText('Record Inserted successfully')).toBeVisible({ timeout: 15000 });
  }

  async assertParameterUpdated() {
    await expect(this.page.getByText('Record updated successfully')).toBeVisible({ timeout: 15000 });
  }

  async assertParameterDeleted() {
    await expect(this.page.getByText('Record deleted successfully')).toBeVisible({ timeout: 15000 });
  }
}


























// import { Page, Locator, expect } from '@playwright/test';
// import { BasePages } from './BasePages';

// export class MachineParameter extends BasePages {
//   private tuneMachineParametersMenu: Locator;
//   private addBtn: Locator;
//   private machineDropdown: Locator;
//   private machineOption: (machine: string) => Locator;
//   private parameterInput: Locator;
//   private samplingIntervalInput: Locator;
//   private dataTypeDropdown: Locator;
//   private dataTypeOption: (type: string) => Locator;
//   private saveBtn: Locator;
//   private updateBtn: Locator;
//   private deleteBtn: Locator;
//   private confirmDeleteBtn: Locator;
//   private editBtn: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.tuneMachineParametersMenu = page.getByText(' Machine Parameters ');
//     this.addBtn = page.getByRole('button', { name: 'Add' }).first();
//     this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(3);
//     this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).locator('span');
//     this.parameterInput = page.getByRole('textbox', { name: 'Parameter' });
//     this.samplingIntervalInput = page.getByRole('textbox', { name: 'Sampling Interval' });
//     this.dataTypeDropdown = page.getByRole('combobox', { name: 'Data Type' }).locator('span');
//     this.dataTypeOption = (type: string) => page.getByRole('option', { name: type }).locator('span');
//     this.saveBtn = page.getByRole('button', { name: 'Save' });
//     this.updateBtn = page.getByRole('button', { name: 'Update' });
//     this.deleteBtn = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
//     this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes' });
//     this.editBtn = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
//   }

//   async addMachineParameter(machine: string, parameterName: string, samplingInterval: string, dataType: string) {
//     await this.tuneMachineParametersMenu.click();
//     await this.addBtn.click();
//     await this.machineDropdown.click();
//     await this.machineOption(machine).click();
//     await this.parameterInput.fill(parameterName);
//     await this.samplingIntervalInput.fill(samplingInterval);
//     await this.page.waitForTimeout(3000);
//     await this.dataTypeDropdown.click();
//     await this.dataTypeOption(dataType).click();
//     await this.saveBtn.click();
//   }

//   async updateMachineParameter(updateParameter: string, updateSampling: string) {
//     await this.editBtn.click();
//     await this.parameterInput.fill(updateParameter);
//     await this.samplingIntervalInput.fill(updateSampling);
//     await this.page.waitForTimeout(3000);
//     await this.dataTypeDropdown.first().click();
//     await this.dataTypeOption('Float').click();
//     await this.updateBtn.click();
//   }

//   async deleteMachineParameter() {
//     await this.deleteBtn.click();
//     await this.confirmDeleteBtn.click();
//   }


// }

