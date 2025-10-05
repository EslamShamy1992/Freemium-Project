import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class DowntimeConfig extends BasePages {
 


  private downtimeMenu: Locator;
  private addBtn: Locator;
  private machineDropdown: Locator;
  private categoryTypeDropdown: Locator;
  private plannedDowntimeOption: Locator;
  private faultCodeInput: Locator;
  private faultNameInput: Locator;
  private reason1Input: Locator;
  private reason2Input: Locator;
  private reason3Input: Locator;
  private reason4Input: Locator;
  private saveBtn: Locator;
    
    constructor(page:Page){
        super(page)

    this.downtimeMenu = page.getByText('timer_off Downtime');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(3);
    this.categoryTypeDropdown = page.locator('div').filter({ hasText: /^Category Type \*$/ }).nth(3);
    this.plannedDowntimeOption = page.getByRole('option', { name: 'Planned Downtime', exact: true }).locator('span');
    this.faultCodeInput = page.getByRole('textbox', { name: 'Fault Code' });
    this.faultNameInput = page.getByRole('textbox', { name: 'Fault Name' });
    this.reason1Input = page.getByRole('textbox', { name: 'Reason 1' });
    this.reason2Input = page.getByRole('textbox', { name: 'Reason 2' });
    this.reason3Input = page.getByRole('textbox', { name: 'Reason 3' });
    this.reason4Input = page.getByRole('textbox', { name: 'Reason 4' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });

     

    }



      async addDownTimeConfig(machine: string, faultCode: string, faultName: string, reasons: string[]) {
    await this.downtimeMenu.click();
    await this.addBtn.click();
    await this.machineDropdown.click();
    await this.page.getByRole('option', { name: machine }).first().click();
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
}