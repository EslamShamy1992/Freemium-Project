import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class ParameterSpecifications extends BasePages {
 

    private parameterSpecMenu: Locator;
  private addBtn: Locator;
  private parametersDropdown: Locator;
  private productsDropdown: Locator;
  private backdrop: Locator;
  private lrlInput: Locator;
  private lslInput: Locator;
  private lwlInput: Locator;
  private targetInput: Locator;
  private tooltip: Locator;
  private uwlInput: Locator;
  private uslInput: Locator;
  private saveBtn: Locator;

    
    constructor(page:Page){
        super(page)


            this.parameterSpecMenu = page.getByText('settings_input_component');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.parametersDropdown = page.locator('div').filter({ hasText: /^Parameters \*$/ }).nth(3);
    this.productsDropdown = page.locator('div').filter({ hasText: /^Products \*$/ }).nth(3);
    this.backdrop = page.locator('.cdk-overlay-backdrop.cdk-overlay-transparent-backdrop').first();
    this.lrlInput = page.getByRole('spinbutton', { name: 'LRL' });
    this.lslInput = page.getByRole('spinbutton', { name: 'LSL' });
    this.lwlInput = page.getByRole('spinbutton', { name: 'LWL' });
    this.targetInput = page.getByRole('spinbutton', { name: 'Target' });
    this.tooltip = page.locator('mat-tooltip-component');
    this.uwlInput = page.getByRole('spinbutton', { name: 'UWL' });
    this.uslInput = page.getByRole('spinbutton', { name: 'USL' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
     

    }



    
  async addParameterSpecification(param: string, product: string, lrl: string, lsl: string, lwl: string, target: string, uwl: string, usl: string) {
  

    await this.parameterSpecMenu.click();
    await this.page.waitForTimeout(2000);
    await this.addBtn.click();
    await this.parametersDropdown.click();
  await this.page.getByRole('option', { name: param }).locator('span').click();
    await this.productsDropdown.click();
    await this.page.getByRole('option', { name: product }).first().click();
        await this.page.mouse.click(0,0)  

    await this.lrlInput.fill(lrl);
    await this.lslInput.fill(lsl);
    await this.lwlInput.fill(lwl);
    await this.targetInput.fill(target);
    // await this.tooltip.click();
    await this.uwlInput.fill(uwl);
    await this.uslInput.fill(usl);
    await this.saveBtn.click();
  }
}