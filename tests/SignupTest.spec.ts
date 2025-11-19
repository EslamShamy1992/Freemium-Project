import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SignupPage } from "../pages/SignupPage";

test.describe("Signup TestCases", () => {
    test.use({ storageState:{cookies: [], origins: []} });

  let signupPage: SignupPage;
  let companyName: string;
  let companyCr: string;
  let companyFirst: string;  
  let companyLast: string;
  let companyEmail: string;
  let companyPhone: string;
  let plantName: string;
  let plantCr: string;
  let plantFirst: string;  
  let plantLast: string;
  let plantEmail: string;
  let plantPhone: string;

  test.beforeEach(async ({ page }) => {

    signupPage = new SignupPage(page);    
    await page.goto("/signup");
    companyName = faker.company.name();
    companyCr = `CR${faker.number.int({ min: 100000, max: 999999 })}`;
    companyFirst = faker.person.firstName();
    companyLast = faker.person.lastName();
    companyEmail = faker.internet.email({ firstName: companyFirst, lastName: companyLast, provider: 'hotmail.com' });
    companyPhone = `5${faker.number.int({ min: 10000000, max: 99999999 })}`;
    plantName = faker.company.name();
    plantCr = `CRA${faker.number.int({ min: 100000, max: 999999 })}`;
    plantFirst = faker.person.firstName();
    plantLast = faker.person.lastName();
    plantEmail = faker.internet.email({ firstName: plantFirst, lastName: plantLast, provider: 'hotmail.com' });
    plantPhone = `5${faker.number.int({ min: 10000000, max: 99999999 })}`;
  });

  test("should successfully sign up with a valid company and plant data", async ({ page }) => {

    await signupPage.fillCompanyInfo(companyName, companyCr, companyFirst, companyLast, companyEmail, companyPhone);
    await signupPage.fillPlantInfo(plantName, plantCr, plantFirst, plantLast, plantEmail, plantPhone);
    await signupPage.submitForm();
    await signupPage.assertSignupSuccess();
    console.log("Company Data:", { companyName, companyCr, companyFirst, companyLast, companyEmail, companyPhone });
    console.log("Plant Data:", { plantName, plantCr, plantFirst, plantLast, plantEmail, plantPhone });
 
  });

  test("verify Signup with missing required fields Plant Info", async ({ page }) => {

    await signupPage.fillCompanyInfo(companyName, companyCr, companyFirst, companyLast, companyEmail, companyPhone);
    await signupPage.signupWithMissingRequiredFields();
    await page.getByText('Admin first name is required').isVisible();
    await page.getByText('Admin last name is required').isVisible();
    await page.getByText('Admin email is required').isVisible();
    await page.getByText('Admin phone number is required').isVisible();
    await page.getByText('Plant name is required').isVisible();
    await page.getByText('CR number is required').isVisible();


});
  test("verify Signup with missing required fields Company Info", async ({ page }) => {

    await signupPage.fillPlantInfo(plantName, plantCr, plantFirst, plantLast, plantEmail, plantPhone);
    await signupPage.signupWithMissingRequiredFields();
    await page.getByText('Group name is required').isVisible();
    await page.getByText('CR number is required').isVisible();
    await page.getByText('First name is required').isVisible();
    await page.getByText('Last name is required').isVisible();
    await page.getByText('Company email is required').isVisible();
    await page.getByText('phone number is required').isVisible();

});
});

