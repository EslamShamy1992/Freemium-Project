import { BasePages } from "./BasePages";
import { Page, Locator, expect } from "@playwright/test";

export class OEEConfig extends BasePages {
  private oeeConfigMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private machineOption: (machine: string) => Locator;
  private netGrossDropdown: Locator;
  private netGrossOption: (netgross: string) => Locator;
  private autoPoDropdown: Locator;
  private autoPoOption: (auto: string) => Locator;
  private faultDropdown: Locator;
  private faultOption: (fault: string) => Locator;
  private saveBtn: Locator;
  private updateBtn: Locator;
  private deleteIcon: Locator;
  private editIcon: Locator;
  private confirmDeleteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.oeeConfigMenu = page.getByText(' OEE Configuration ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.getByRole('combobox', { name: 'Machine' }).locator('span');
    this.machineOption = (machine: string) => page.getByRole('option', { name: machine }).first();
    this.netGrossDropdown = page.getByRole('combobox', { name: 'Net/Gross Count' }).locator('span');
    this.netGrossOption = (netgross: string) => page.getByRole('option', { name: netgross }).first();
    this.autoPoDropdown = page.getByRole('combobox', { name: 'Configure Auto PO' }).locator('span');
    this.autoPoOption = (auto: string) => page.getByRole('option', { name: auto }).first();
    this.faultDropdown = page.locator('div').filter({ hasText: /^Fault \*$/ }).nth(3);
    this.faultOption = (fault: string) => page.getByRole('option', { name: fault }).first();
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.deleteIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
    this.editIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes' });
  }

  async addOEEConfig(machine: string, netgross: string, auto: string, fault: string) {
    await this.oeeConfigMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.machineOption(machine).click();
    await this.page.waitForTimeout(2000);
    await this.netGrossDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.netGrossOption(netgross).click();
    await this.autoPoDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.autoPoOption(auto).click();
    await this.faultDropdown.click();
    await this.faultOption(fault).click();
    await this.saveBtn.click();
  }

  async updateOEEConfig(newAuto: string) {
    await this.editIcon.click();
    await this.autoPoDropdown.first().click();
    await this.page.waitForTimeout(1000);
    await this.autoPoOption(newAuto).click();
    await this.updateBtn.click();
  }

  async deleteOEEConfig() {
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }


}

























// import { BasePages } from "./BasePages";
// import { Page,Locator } from "@playwright/test";



// export class OEEConfig extends BasePages {
 

//       private oeeConfigMenu: Locator;
//   private addBtn: Locator;
//   private machineDropdown: Locator;
//   private netGrossDropdown: Locator;
//   private autoPoDropdown: Locator;
//   private faultDropdown: Locator;
//   private saveBtn: Locator;


    
//     constructor(page:Page){
//         super(page)

//     this.oeeConfigMenu = page.getByText(' OEE Configuration ');
//     this.addBtn = page.getByRole('button', { name: 'Add' }).first();
//     this.machineDropdown = page.getByRole('combobox', { name: 'Machine' }).locator('span');
//     this.netGrossDropdown = page.getByRole('combobox', { name: 'Net/Gross Count' }).locator('span');
//     this.autoPoDropdown = page.getByRole('combobox', { name: 'Configure Auto PO' }).locator('span');
//     this.faultDropdown = page.locator('div').filter({ hasText: /^Fault \*$/ }).nth(3);
//     this.saveBtn = page.getByRole('button', { name: 'Save' });
     

//     }


//       async addOEEConfig(machine: string, netgross: string, auto: string, fault: string) {
//     await this.oeeConfigMenu.click();
//     await this.addBtn.click();
//     await this.machineDropdown.click();
//     await this.page.getByRole('option', { name: machine }).first().click();
//     await this.page.waitForTimeout(1000);
//     await this.netGrossDropdown.click();
//     await this.page.waitForTimeout(1000);
//     await this.page.getByRole('option', { name: netgross }).first().click();
//     await this.autoPoDropdown.click();
//     await this.page.waitForTimeout(1000);
//     await this.page.getByRole('option', { name: auto }).first().click();
//     await this.faultDropdown.click();
//     await this.page.getByRole('option', { name: fault }).first().click();
//     await this.saveBtn.click();
//   }
//   async deleteOEEConfig() {
    

//     await this.page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first().click();
//     await this.page.getByRole('button', { name: 'Yes' }).click(); 


//   } 
//   async updateOEEConfig() {
//     await this.page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first().click();
//     await this.autoPoDropdown.first().click();
//     await this.page.waitForTimeout(1000);
//     await this.page.getByRole('option', { name: 'Yes' }).first().click();
//     await this.page.getByRole('button', { name: 'Update' }).click();

//   }
// }