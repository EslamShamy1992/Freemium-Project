import { BasePages } from "./BasePages";
import { Page, Locator } from "@playwright/test";

export class DowntimeConfig extends BasePages {
  private downtimeMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private machineOption: (machine: string) => Locator;
  private categoryTypeDropdown: Locator;
  private plannedDowntimeOption: Locator;
  private unplannedDowntimeOption: Locator;
  private faultCodeInput: Locator;
  private faultNameInput: Locator;
  private reason1Input: Locator;
  private reason2Input: Locator;
  private reason3Input: Locator;
  private reason4Input: Locator;
  private saveBtn: Locator;
  private updateBtn: Locator;
  private confirmDeleteBtn: Locator;
  private grid: Locator;
  private horizontalScroll: Locator;
  private editIcon: Locator;
  private deleteIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.downtimeMenu = page.getByText('timer_off Downtime');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(3);
    this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).first();
    this.categoryTypeDropdown = page.locator('div').filter({ hasText: /^Category Type \*$/ }).nth(3);
    this.plannedDowntimeOption = page.getByRole('option', { name: 'Planned Downtime', exact: true }).locator('span');
    this.unplannedDowntimeOption = page.getByRole('option', { name: 'Unplanned Downtime', exact: true }).locator('span');
    this.faultCodeInput = page.getByRole('textbox', { name: 'Fault Code' });
    this.faultNameInput = page.getByRole('textbox', { name: 'Fault Name' });
    this.reason1Input = page.getByRole('textbox', { name: 'Reason 1' });
    this.reason2Input = page.getByRole('textbox', { name: 'Reason 2' });
    this.reason3Input = page.getByRole('textbox', { name: 'Reason 3' });
    this.reason4Input = page.getByRole('textbox', { name: 'Reason 4' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, delete it!' });
    this.grid = page.locator('.ag-center-cols-clipper');
    this.horizontalScroll = page.locator('.ag-body-horizontal-scroll-viewport');
    this.editIcon = page.locator('.ag-center-cols-container mat-icon:text("edit")').first();
    this.deleteIcon = page.locator('.ag-center-cols-container mat-icon:text("delete")').first();
  }

  private async scrollToRecord() {
    await this.page.waitForTimeout(2000);
    await this.grid.evaluate(el => el.scrollTop = el.scrollHeight);
    await this.horizontalScroll.evaluate(el => {
      el.scrollLeft = el.scrollWidth;
    });
  }

  async addDownTimeConfig(machine: string, faultCode: string, faultName: string, reasons: string[]) {
    await this.downtimeMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.machineOption(machine).click();
    await this.categoryTypeDropdown.click();
    await this.plannedDowntimeOption.click();
    await this.faultCodeInput.fill(faultCode);
    await this.faultNameInput.fill(faultName);
    await this.reason1Input.fill(reasons[0] || '');
    await this.reason2Input.fill(reasons[1] || '');
    await this.reason3Input.fill(reasons[2] || '');
    await this.reason4Input.fill(reasons[3] || '');
    await this.saveBtn.click();
  }

  async updateDowntimeConfig(machine: string) {
    await this.scrollToRecord();
    await this.editIcon.click();
    await this.page.getByRole('combobox', { name: 'Machine M-' }).locator('div').nth(3).click();
    await this.machineOption(machine).click();
    await this.page.getByRole('combobox', { name: 'Category Type Planned Downtime' }).locator('div').nth(3).click();
    await this.unplannedDowntimeOption.click();
    await this.updateBtn.click();
  }

  async deleteDowntimeConfig() {
    await this.scrollToRecord();
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }
}






















