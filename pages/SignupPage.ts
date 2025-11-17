import { Page, Locator, expect } from "@playwright/test";
import { BasePages } from "./BasePages";

export class SignupPage extends BasePages {
  private companyName: Locator;
  private companyCrNumber: Locator;
  private companyFirstName: Locator;
  private companyLastName: Locator;
  private companyEmail: Locator;
  private companyPhoneInput: Locator;
  private plantName: Locator;
  private plantCrNumber: Locator;
  private plantFirstName: Locator;
  private plantLastName: Locator;
  private plantEmail: Locator;
  private plantPhoneInput: Locator;
  private reviewBtn: Locator;
  private confirmBtn: Locator;
  private okBtn: Locator;
  private confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.companyName = page.getByRole('textbox', { name: 'Company Name * !' });
    this.companyCrNumber = page.getByLabel('CR Number * !Provide the unique Company Registration number assigned to your company.', { exact: true });
    this.companyFirstName = page.getByPlaceholder('Enter first name');
    this.companyLastName = page.getByPlaceholder('Enter last name');
    this.companyEmail = page.getByRole('textbox', { name: 'Company Email * !' });
    this.companyPhoneInput = page.locator('#groupPhone').getByRole('textbox', { name: '234 5678' })
    this.plantName = page.getByRole('textbox', { name: 'Plant Name * !' });
    this.plantCrNumber = page.getByLabel('CR Number * !Provide the unique Company Registration number assigned to your plant. e.g (CRA90321X)', { exact: true });
    this.plantFirstName = page.getByPlaceholder('First name', { exact: true });
    this.plantLastName = page.getByPlaceholder('Last name', { exact: true });
    this.plantEmail = page.getByRole('textbox', { name: 'Email Address * !' });
    this.plantPhoneInput = page.locator('#adminPhone_1').getByRole('textbox', { name: '234 5678' })
    this.reviewBtn = page.getByRole('button', { name: 'Review Data' });
    this.confirmBtn = page.getByRole('button', { name: 'Confirm & Submit' });
    this.okBtn = page.getByRole('button', { name: 'OK' });
    this.confirmationMessage = page.getByText('Thank You!');

  }

  async fillCompanyInfo(companyName: string, companyCr: string, firstName: string, lastName: string, email: string, phone: string) {
    await this.companyName.fill(companyName);
    await this.companyCrNumber.fill(companyCr);
    await this.companyFirstName.fill(firstName);
    await this.companyLastName.fill(lastName);
    await this.companyEmail.fill(email);
    await this.companyPhoneInput.fill(phone);
  }

  async fillPlantInfo(plantName: string, plantCr: string, firstName: string, lastName: string, email: string, phone: string) {
    await this.plantName.fill(plantName);
    await this.plantCrNumber.fill(plantCr);
    await this.plantFirstName.fill(firstName);
    await this.plantLastName.fill(lastName);
    await this.plantEmail.fill(email);
    await this.plantPhoneInput.fill(phone);
  }

  async submitForm() {
    await this.reviewBtn.click();
    await this.confirmBtn.click();
  }

  async assertSignupSuccess() {
    await expect(this.confirmationMessage).toBeVisible({ timeout: 100000 });
    await this.page.waitForTimeout(2000);
    await this.okBtn.click();
  }
}





