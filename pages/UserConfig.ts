import { BasePages } from "./BasePages";
import { Page, Locator, expect } from "@playwright/test";

export class UserConfig extends BasePages {
  private userConfigMenu: Locator;
  private addBtn: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private countryDropdown: Locator;
  private countrySearchInput: Locator;
  private egyptCountryOption: Locator;
  private phoneInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private saveBtn: Locator;
  private updateBtn: Locator;
  private deleteIcon: Locator;
  private editIcon: Locator;
  private confirmDeleteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.userConfigMenu = page.getByText('people User Configuration');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.countryDropdown = page.locator('.iti__selected-flag');
    this.countrySearchInput = page.getByRole('textbox', { name: 'Search Country' });
    this.egyptCountryOption = page.getByText('Egypt (‫مصر‬‎)');
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updateBtn = page.getByRole('button', { name: 'Update' });
    this.deleteIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.delete-icon').first();
    this.editIcon = page.locator('.mat-icon.notranslate.material-icons.mat-icon-no-color.edit-icon').first();
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, delete it!' });
  }

  async addUserConfig(firstName: string, lastName: string, phone: string, email: string, password: string) {
    await this.userConfigMenu.click();
    await this.addBtn.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.selectEgyptCountry();
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.saveBtn.click();
  }

  async updateUserConfig(newFirstName: string, newLastName: string, newPhone: string) {
    await this.editIcon.click();
    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.selectEgyptCountry();
    await this.phoneInput.fill(newPhone);
    await this.updateBtn.click();
  }

  async deleteUserConfig() {
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }

  private async selectEgyptCountry() {
    await this.countryDropdown.click();
    await this.countrySearchInput.fill('eg');
    await this.egyptCountryOption.click();
  }


}

