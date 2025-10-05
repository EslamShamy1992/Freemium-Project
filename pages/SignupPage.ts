import { Page, Locator, expect } from "@playwright/test";
import { BasePages } from "./BasePages";
 
export class SignupPage extends BasePages {
  // Locators
  readonly companyName: Locator;
  readonly companyCrNumber: Locator;
  readonly companyFirstName: Locator;
  readonly companyLastName: Locator;
  readonly companyEmail: Locator;
  readonly companyPhoneDropdown: Locator;
  readonly companyPhoneSearch: Locator;
  readonly companyPhoneInput: Locator;
 
  readonly plantName: Locator;
  readonly plantCrNumber: Locator;
  readonly plantFirstName: Locator;
  readonly plantLastName: Locator;
  readonly plantEmail: Locator;
  readonly plantCountryDropdown: Locator;
  readonly plantCountrySearch: Locator;
  readonly plantPhoneInput: Locator;
 
  readonly reviewBtn: Locator;
  readonly confirmBtn: Locator;
  readonly okBtn: Locator;
 
  // ✅ New: Confirmation message locator
  readonly confirmationMessage: Locator;
 
  constructor(page: Page) {
    super(page);
 
    // Company Info
    this.companyName = page.getByRole('textbox', { name: 'Company Name * !' });
    this.companyCrNumber = page.getByLabel(
      'CR Number * !Provide the unique Company Registration number assigned to your company.',
      { exact: true }
    );
    this.companyFirstName = page.getByPlaceholder('Enter first name');
    this.companyLastName = page.getByPlaceholder('Enter last name');
    this.companyEmail = page.getByRole('textbox', { name: 'Company Email * !' });
    this.companyPhoneDropdown = page.locator('#groupPhone div').filter({ hasText: '+' }).nth(2);
    this.companyPhoneSearch = page.getByRole('textbox', { name: 'Search Country' });
    this.companyPhoneInput = page.getByRole('textbox', { name: '21' });
 
    // Plant Info
    this.plantName = page.getByRole('textbox', { name: 'Plant Name * !' });
    this.plantCrNumber = page.getByLabel(
      'CR Number * !Provide the unique Company Registration number assigned to your plant. e.g (CRA90321X)',
      { exact: true }
    );
    this.plantFirstName = page.getByPlaceholder('First name', { exact: true });
    this.plantLastName = page.getByPlaceholder('Last name', { exact: true });
    this.plantEmail = page.getByRole('textbox', { name: 'Email Address * !' });
    this.plantCountryDropdown = page.locator(
      '.iti.iti--allow-dropdown.separate-dial-code.iti-sdc-4 > .iti__flag-container > .iti__selected-flag > .iti__arrow'
    );
    this.plantCountrySearch = page.getByRole('textbox', { name: 'Search Country' });
    this.plantPhoneInput = page.getByRole('textbox', { name: '-555-0123' });
 
    // Buttons
    this.reviewBtn = page.getByRole('button', { name: 'Review Data' });
    this.confirmBtn = page.getByRole('button', { name: 'Confirm & Submit' });
    this.okBtn = page.getByRole('button', { name: 'OK' });
 
    // ✅ Confirmation message (text ko real app ke hisaab se adjust karein)
    this.confirmationMessage = page.getByText('Thank You!');
  }
 
  // Fill Company Info
  async fillCompanyInfo(companyName: string, companyCr: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    await this.companyName.fill(companyName);
    await this.companyCrNumber.fill(companyCr);
    await this.companyFirstName.fill(firstName);
    await this.companyLastName.fill(lastName);
    await this.companyEmail.fill(email);
 
    await this.companyPhoneDropdown.click();
    await this.companyPhoneSearch.fill('Pakistan');
    await this.page.getByText('Pakistan (‫پاکستان‬‎)').click();
    await this.companyPhoneInput.fill(phone);
  }
 
  // Fill Plant Info
  async fillPlantInfo(
    plantName: string,
    plantCr: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    await this.plantName.fill(plantName);
    await this.plantCrNumber.fill(plantCr);
    await this.plantFirstName.fill(firstName);
    await this.plantLastName.fill(lastName);
    await this.plantEmail.fill(email);
 
    await this.plantCountryDropdown.click();
    await this.plantCountrySearch.fill('United States');
    await this.page.locator('#adminPhone_1').getByText('United States').click();
    await this.plantPhoneInput.fill(phone);
  }
 
  // Submit form only
  async submitForm() {
    await this.reviewBtn.click();
    await this.confirmBtn.click();
  }
 
  // Assert signup success
  async assertSignupSuccess() {
    await expect(this.confirmationMessage).toBeVisible({ timeout: 100000 });
    await this.page.waitForTimeout(2000);
    await this.okBtn.click();
  }
}
 
 