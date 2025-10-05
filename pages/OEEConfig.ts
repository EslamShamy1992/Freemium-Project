import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class OEEConfig extends BasePages {
 

      private oeeConfigMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private netGrossDropdown: Locator;
  private autoPoDropdown: Locator;
  private faultDropdown: Locator;
  private saveBtn: Locator;


    
    constructor(page:Page){
        super(page)

    this.oeeConfigMenu = page.getByText(' OEE Configuration ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.getByRole('combobox', { name: 'Machine' }).locator('span');
    this.netGrossDropdown = page.getByRole('combobox', { name: 'Net/Gross Count' }).locator('span');
    this.autoPoDropdown = page.getByRole('combobox', { name: 'Configure Auto PO' }).locator('span');
    this.faultDropdown = page.locator('div').filter({ hasText: /^Fault \*$/ }).nth(3);
    this.saveBtn = page.getByRole('button', { name: 'Save' });
     

    }


      async addOEEConfig(machine: string, netgross: string, auto: string, fault: string) {
    await this.oeeConfigMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.page.getByRole('option', { name: machine }).first().click();
    await this.page.waitForTimeout(2000);
    await this.netGrossDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option', { name: netgross }).first().click();
    await this.autoPoDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option', { name: auto }).first().click();
    await this.faultDropdown.click();
    await this.page.getByRole('option', { name: fault }).first().click();
    await this.saveBtn.click();
  }
}