import { Page, Locator, expect } from '@playwright/test';
import { BasePages } from './BasePages';

export class MachineParameter extends BasePages{
  private uploadMasterDataBtn: Locator;
  private manualSetupHeading: Locator;
  private tuneMachineParametersMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private machineOption: (machine: string) => Locator;
  private parameterInput: Locator;
  private samplingIntervalInput: Locator;
  private dataTypeDropdown: Locator;
  private dataTypeOption: (type: string) => Locator;
  private saveBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadMasterDataBtn = page.getByRole('button', { name: 'Upload Master Data' });
    this.manualSetupHeading = page.getByRole('heading', { name: 'Manual Setup' });
    this.tuneMachineParametersMenu = page.getByText(' Machine Parameters ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(3);
    this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).locator('span');
    this.parameterInput = page.getByRole('textbox', { name: 'Parameter' });
    this.samplingIntervalInput = page.getByRole('textbox', { name: 'Sampling Interval' });
    this.dataTypeDropdown = page.getByRole('combobox', { name: 'Data Type' }).locator('span');
    this.dataTypeOption = (type: string) => page.getByRole('option', { name: type }).locator('span');
    this.saveBtn = page.getByRole('button', { name: 'Save' });
  }

  
  async addMachineParameter(machine: string, parameterName: string, samplingInterval: string, dataType: string) {
    await this.tuneMachineParametersMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.machineOption(machine).click();
    await this.parameterInput.fill(parameterName);
    await this.samplingIntervalInput.fill(samplingInterval);
    await this.dataTypeDropdown.click();
    await this.dataTypeOption(dataType).click();
    await this.saveBtn.click();
    await expect(
      this.page.getByRole('alertdialog', { name: 'Record inserted successfully' })
    ).toBeVisible({ timeout: 10000 });
  }
}
