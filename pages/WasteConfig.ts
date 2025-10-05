import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class WasteConfig extends BasePages {
 

  private wasteConfigMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private categoryTypeInput: Locator;
  private faultCodeInput: Locator;
  private faultNameDiv: Locator;
  private faultNameInput: Locator;
  private reason1Input: Locator;
  private reason2Input: Locator;
  private reason3Input: Locator;
  private reason4Input: Locator;
  private saveBtn: Locator;
  private closeDialogBtn: Locator;
    
    constructor(page:Page){
        super(page)
            this.closeDialogBtn = page.locator('#mat-dialog-0 button').nth(2);
    this.wasteConfigMenu = page.getByText(' Waste Configuration ');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.getByRole('combobox', { name: 'Machine' }).locator('span');
    this.categoryTypeInput = page.getByRole('textbox', { name: 'Category Type' });
    this.faultCodeInput = page.getByRole('textbox', { name: 'Fault Code' });
    this.faultNameDiv = page.locator('#mat-dialog-5 form div').filter({ hasText: '/100 Fault Name *' }).nth(3);
    this.faultNameInput = page.getByRole('textbox', { name: 'Fault Name' });
    this.reason1Input = page.getByRole('textbox', { name: 'Reason 1' });
    this.reason2Input = page.getByRole('textbox', { name: 'Reason 2' });
    this.reason3Input = page.getByRole('textbox', { name: 'Reason 3' });
    this.reason4Input = page.getByRole('textbox', { name: 'Reason 4' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });

     

    }



    
  async addWasteConfig(machine: string, categoryType: string, faultCode: string, faultName: string, reasons: string[]) {
    await this.closeDialogBtn.click();
    await this.wasteConfigMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.page.getByRole('option', { name: machine }).first().click();
    await this.categoryTypeInput.fill(categoryType);
    await this.faultCodeInput.fill(faultCode);
    await this.faultNameInput.fill(faultName);
    await this.reason1Input.fill(reasons[0] || '');
    await this.reason2Input.fill(reasons[1] || '');
    await this.reason3Input.fill(reasons[2] || '');
    await this.reason4Input.fill(reasons[3] || '');
    await this.saveBtn.click();
  }


}