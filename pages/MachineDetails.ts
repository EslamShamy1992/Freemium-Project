import { Page, Locator, expect } from '@playwright/test';
import { BasePages } from './BasePages';

export class MachineDetails extends BasePages {
 
   private machineDetailsMenu: Locator;
  private addBtn: Locator;
  private departmentNameInput: Locator;
  private machineInput: Locator;
  private saveBtn: Locator;
  private editIcon: Locator;
  private deleteIcon: Locator;
  private updateBtn: Locator;
  private confirmDeleteBtn: Locator;

  constructor(page: Page) {
    super(page);
     this.machineDetailsMenu = page.getByText(' Machine Details ');
    this.addBtn = page.getByRole('button', { name: 'Add' });
    this.departmentNameInput = page.getByRole('textbox', { name: 'Department Name' });
    this.machineInput = page.getByRole('textbox', { name: 'Machine' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.editIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
    this.deleteIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, delete it!' });
  }

  async navigateToMachineDetails() {
    await this.machineDetailsMenu.first().click();
  }
 

   async addMachineDetails(departmentName: string, machineName: string) {
    await this.addBtn.click();
    await this.departmentNameInput.fill(departmentName);
    await this.machineInput.fill(machineName);
    await this.saveBtn.click();
  }

  async updateMachine( oldMachine: string, newMachine: string) {
    // await this.page.getByRole('gridcell', { name: department }).click();
    await this.page.getByRole('gridcell', { name: oldMachine }).click();
    await this.editIcon.click();
    await this.machineInput.fill(newMachine);
    await this.updateBtn.click();
  }

  async deleteMachine() {
    await this.deleteIcon.first().click();
    await expect(this.page.getByRole('heading', { name: 'Are you sure?' })).toBeVisible();
    await this.confirmDeleteBtn.click();
    await expect(this.page.getByRole('alertdialog', { name: 'Record deleted successfully' })).toBeVisible({ timeout: 10000 });
  }

}
