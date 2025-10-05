import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class ProductConfig extends BasePages {
 

private productMenu: Locator;
  private addBtn: Locator;
  private productCodeInput: Locator;
  private productDescDiv: Locator;
  private productDescInput: Locator;
  private machineDropdown: Locator;
  private speedInput: Locator;
  private uomInput: Locator;
  private saveBtn: Locator;

    constructor(page:Page){
        super(page)

    this.productMenu = page.getByText('inventory_2 Product');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.productCodeInput = page.getByRole('textbox', { name: 'Product Code' });
    this.productDescDiv = page.locator('#mat-dialog-3 form div').filter({ hasText: '/100 Product Description *' }).nth(3);
    this.productDescInput = page.getByRole('textbox', { name: 'Product Description' });
    this.machineDropdown = page.locator('div').filter({ hasText: /^Machine \*$/ }).nth(2);
    this.speedInput = page.getByRole('spinbutton', { name: 'Speed' });
    this.uomInput = page.getByRole('textbox', { name: 'UOM' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
     

    }




 async addProductConfig(productCode: string, productDesc: string, machine: string, speed: string, uom: string) {
    await this.productMenu.click();
    await this.addBtn.click();
    await this.productCodeInput.fill(productCode);
    await this.productDescInput.fill(productDesc);
    await this.machineDropdown.click();
    await this.page.getByRole('option', { name: machine }).first().click();
    await this.speedInput.fill(speed);
    await this.uomInput.fill(uom);
    await this.saveBtn.click();
  }
}