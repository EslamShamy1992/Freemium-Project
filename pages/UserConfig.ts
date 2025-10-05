import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class UserConfig extends BasePages {
 

  private userConfigMenu: Locator;
  private addBtn: Locator;
  private firstNameInput: Locator;
  private firstNameDiv: Locator;
  private lastNameInput: Locator;
  private phoneInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private saveBtn: Locator;

    
    constructor(page:Page){
        super(page)

    this.userConfigMenu = page.getByText('people User Configuration');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.firstNameDiv = page.locator('#mat-dialog-6 form div').filter({ hasText: '/100 First Name *' }).nth(3);
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });

     

    }


    async addUserConfig(firstName: string, lastName: string, phone: string, email: string, password: string) {
    await this.userConfigMenu.click();
    await this.addBtn.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.saveBtn.click();
  }



}