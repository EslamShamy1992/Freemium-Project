import { BasePages } from "./BasePages";
import { Page, Locator, expect } from "@playwright/test";

export class WasteConfig extends BasePages {
  private wasteConfigMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private machineOption: (machine: string) => Locator;
  private categoryTypeInput: Locator;
  private faultCodeInput: Locator;
  private faultNameInput: Locator;
  private reason1Input: Locator;
  private reason2Input: Locator;
  private reason3Input: Locator;
  private reason4Input: Locator;
  private saveBtn: Locator;
  private updateBtn: Locator;
  private deleteIcon: Locator;
  private editIcon: Locator;
  private confirmDeleteBtn: Locator;
  private closeDialogBtn: Locator;
  private grid: Locator;
  private horizontalScroll: Locator;

  constructor(page: Page) {
    super(page);
    this.wasteConfigMenu = page.getByText(' Waste Configuration ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.getByRole('combobox', { name: 'Machine' }).locator('span');
    this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).first();
    this.categoryTypeInput = page.getByRole('textbox', { name: 'Category Type' });
    this.faultCodeInput = page.getByRole('textbox', { name: 'Fault Code' });
    this.faultNameInput = page.getByRole('textbox', { name: 'Fault Name' });
    this.reason1Input = page.getByRole('textbox', { name: 'Reason 1' });
    this.reason2Input = page.getByRole('textbox', { name: 'Reason 2' });
    this.reason3Input = page.getByRole('textbox', { name: 'Reason 3' });
    this.reason4Input = page.getByRole('textbox', { name: 'Reason 4' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.deleteIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
    this.editIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, delete it!' });
    this.closeDialogBtn = page.locator('#mat-dialog-0 button').nth(2);
    this.grid = page.locator('.ag-center-cols-clipper');
    this.horizontalScroll = page.locator('.ag-body-horizontal-scroll-viewport');
  }

    private async scrollToRecord() {
    await this.page.waitForTimeout(2000);
    await this.grid.evaluate(el => el.scrollTop = el.scrollHeight);
    await this.horizontalScroll.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });
  }
  async addWasteConfig(machine: string, categoryType: string, faultCode: string, faultName: string, reasons: string[]) {
    await this.closeDialogBtn.click();
    await this.wasteConfigMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.machineOption(machine).click();
    await this.categoryTypeInput.fill(categoryType);
    await this.faultCodeInput.fill(faultCode);
    await this.faultNameInput.fill(faultName);
    await this.reason1Input.fill(reasons[0] || '');
    await this.reason2Input.fill(reasons[1] || '');
    await this.reason3Input.fill(reasons[2] || '');
    await this.reason4Input.fill(reasons[3] || '');
    await this.saveBtn.click();
  }

  async updateWasteConfig(newCategoryType: string, newFaultCode: string, newFaultName: string, newReasons: string[]) {
    await this.scrollToRecord();
    await this.editIcon.click();
    await this.categoryTypeInput.fill(newCategoryType);
    await this.faultCodeInput.fill(newFaultCode);
    await this.faultNameInput.fill(newFaultName);
    await this.reason1Input.fill(newReasons[0] || '');
    await this.reason2Input.fill(newReasons[1] || '');
    await this.reason3Input.fill(newReasons[2] || '');
    await this.reason4Input.fill(newReasons[3] || '');
    await this.updateBtn.click();
  }

  async deleteWasteConfig() {
    await this.scrollToRecord();
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }

  async assertWasteConfigAdded() {
    await expect(this.page.getByText('Waste fault created')).toBeVisible({ timeout: 10000 });
  }

 
}







