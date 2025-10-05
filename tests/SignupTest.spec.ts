import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SignupPage } from "../pages/SignupPage";


test.describe("Signup Flow (Latest POM)", () => {
let companyName:string,
companyCr:string,
companyFirst:string,  
companyLast:string,
companyEmail:string,
companyPhone:string,
pkPrefix:number;  
let plantName:string,
plantCr:string,
plantFirst:string,  
plantLast:string,
plantEmail:string,
plantPhone:string;
let signupPage :SignupPage;
    test.beforeEach(async({page})=> {

      signupPage = new SignupPage(page);    
      await signupPage.goto("/signup");   
       // ==== Company Data (Pakistan) ====
     companyName = faker.company.name();
     companyCr = `CR${faker.number.int({ min: 100000, max: 999999 })}`;
     companyFirst = faker.person.firstName();
     companyLast = faker.person.lastName();
     companyEmail = `${companyFirst.toLowerCase()}.${companyLast.toLowerCase()}@yopmail.com`;

    // Valid Pakistan mobile prefix (307–330)
     pkPrefix = faker.number.int({ min: 307, max: 330 });
     companyPhone = `${pkPrefix}${faker.number.int({ min: 1000000, max: 9999999 })}`;

       // ==== Plant Data (USA) ====
     plantName = faker.company.name();
     plantCr = `CRA${faker.number.int({ min: 100000, max: 999999 })}`;
     plantFirst = faker.person.firstName();
     plantLast = faker.person.lastName();
     plantEmail = `${plantFirst.toLowerCase()}.${plantLast.toLowerCase()}@yopmail.com`;
     plantPhone = `201${faker.number.int({ min: 1000000, max: 9999999 })}`;

    });


  test("should successfully sign up with company in Pakistan and plant in USA", async ({ page }) => {

    await signupPage.fillCompanyInfo( companyName, companyCr, companyFirst, companyLast, companyEmail,  companyPhone);
    await signupPage.fillPlantInfo( plantName, plantCr, plantFirst, plantLast, plantEmail, plantPhone );
    await signupPage.submitForm();
    await signupPage.assertSignupSuccess();
    console.log("Company Data:", { companyName, companyCr, companyFirst, companyLast, companyEmail, companyPhone });
    console.log("Plant Data:", { plantName, plantCr, plantFirst, plantLast, plantEmail, plantPhone });
  });
});
