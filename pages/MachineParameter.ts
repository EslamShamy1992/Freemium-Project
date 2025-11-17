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
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.machineOption(machine).click();
    await this.parameterInput.fill(parameterName);
    await this.samplingIntervalInput.fill(samplingInterval);
    await this.page.waitForTimeout(3000);
    await this.dataTypeDropdown.click();
    await this.dataTypeOption(dataType).click();
    await this.saveBtn.click();
  }

  async updateMachineParameter(updateParameter: string, updateSampling: string) {
    await this.editBtn.click();
    await this.parameterInput.fill(updateParameter);
    await this.samplingIntervalInput.fill(updateSampling);
    await this.page.waitForTimeout(3000);
    await this.dataTypeDropdown.first().click();
    await this.dataTypeOption('Float').click();
    await this.updateBtn.click();
  }

  async deleteMachineParameter() {
    await this.deleteBtn.click();
    await this.confirmDeleteBtn.click();
  }


}










// import { Page, Locator, expect } from '@playwright/test';
// import { BasePages } from './BasePages';

// export class MachineParameter extends BasePages{
  
//   private tuneMachineParametersMenu: Locator;
//   private addBtn: Locator;
//   private machineDropdown: Locator;
//   private machineOption: (machine: string) => Locator;
//   private parameterInput: Locator;
//   private samplingIntervalInput: Locator;
//   private dataTypeDropdown: Locator;
//   private dataTypeOption: (type: string) => Locator;
//   private saveBtn: Locator;
//   private deletebtn:Locator;

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
//     this.deletebtn= page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first()
//   }

  
//   async addMachineParameter(machine: string, parameterName: string, samplingInterval: string, dataType: string) {
//     await this.tuneMachineParametersMenu.click();
//     await this.addBtn.click();
//     await this.machineDropdown.click();
//     await this.machineOption(machine).click();
//     await this.parameterInput.fill(parameterName);
//     await this.samplingIntervalInput.fill(samplingInterval);
//     await this.dataTypeDropdown.click();
//     await this.dataTypeOption(dataType).click();
//     await this.saveBtn.click();
//     await expect(  this.page.getByRole('alertdialog', { name: 'Record inserted successfully' })).toBeVisible({ timeout: 10000 });
//   }


//   async deleteMachineParameter() {
//     await this.deletebtn.click();
//    await this.page.getByRole('button', { name: 'Yes' }).click();

//   } 
//   async updateMachineParameter(updateparamter: string, updatesampling: string) {
//     await this.page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first().click();
//     await this.parameterInput.fill(updateparamter);
//     await this.samplingIntervalInput.fill(updatesampling);
//     await this.dataTypeDropdown.first().click();
//     await this.dataTypeOption('Float').click();
//     await this.page.getByRole('button', { name: 'Update' }).click();

//   }
// }
