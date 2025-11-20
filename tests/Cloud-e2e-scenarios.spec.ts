import { test ,expect} from "@playwright/test";
import {  faker} from "@faker-js/faker";
import { LoginPage } from "../pages/LoginPage";
import { PlantsPage } from "../pages/PlantsPage";
import { MachineDetails } from "../pages/MachineDetails";
import { MachineParameter } from "../pages/MachineParameter";
import { ProductConfig } from "../pages/ProductConfig";
import { DowntimeConfig } from "../pages/DowntimeConfig";
import{ WasteConfig } from "../pages/WasteConfig";
import { UserConfig } from "../pages/UserConfig";
import { CrewSchedule } from "../pages/CrewSchedule";
import { OEEConfig } from "../pages/OEEConfig";
import { ParameterSpecifications } from "../pages/ParameterSpecifications";
import { CheckListType } from "../pages/CheckListType";
import { ChecklistConfig } from "../pages/ChecklistConfig";
import { config } from 'dotenv';
config();


test.describe("End-to-End Flow", () => { 
 test.use({ storageState:{cookies: [], origins: []} });
 let loginpage:LoginPage;
let companyAdminUsername:string,
companyAdminPassword:string;
let plantsPage: PlantsPage;
let machineDetails: MachineDetails;
let machineParameter: MachineParameter;
let productConfig: ProductConfig;
let downtimeConfig: DowntimeConfig;
let wasteConfig: WasteConfig; 
let userConfig: UserConfig;
let crewSchedule: CrewSchedule;
let oeeConfig: OEEConfig;
let parameterSpecifications: ParameterSpecifications;
let checkListType: CheckListType;
let checklistConfig: ChecklistConfig;
let departmentName: string;
let machineName: string;
let Parameter: string;
let samplingInterval: string;
let preferredDataType: string;
 let productCode: string;
  let productDesc: string;
  let speed: string;
  let uom: string;
  let faultCode: string;
  let faultName: string;
  let reasons: string[];
  let categoryType: string;
  let firstName: string;
  let lastName: string;
  let phone: string;
  let email: string;
  let password: string;
  let shift: string;
  let auto: string;
  let lrl: string;
  let lsl: string;
  let lwl: string;
  let target: string;
  let uwl: string;
  let usl: string;
  let product: string;
  let checklisttype: string;
  let checklistNameInput: string;
  let groupName: string;
  let addtext: string;
  let itemName: string;
  let goodImagePath: string;
  let badImagePath: string;
  

      test.beforeEach(async({page})=> {
        loginpage= new LoginPage(page);
        plantsPage = new PlantsPage(page);
        machineDetails = new MachineDetails(page);
        machineParameter = new MachineParameter(page);
        productConfig = new ProductConfig(page);
        downtimeConfig = new DowntimeConfig(page);
        wasteConfig = new WasteConfig(page);  
        userConfig = new UserConfig(page);
        crewSchedule = new CrewSchedule(page);
        oeeConfig = new OEEConfig(page);
        parameterSpecifications = new ParameterSpecifications(page);
        checkListType = new CheckListType(page);
        checklistConfig = new ChecklistConfig(page);
        companyAdminUsername=process.env.CompanyAdminUsername as string
        companyAdminPassword= process.env.CompanyAdminPassword as string
       await page.goto('/login');
        departmentName = faker.commerce.department();
        machineName = `M-${faker.number.int({ min: 100, max: 999 })}`;
        Parameter = `Param-${faker.word.noun()}`;
        samplingInterval = faker.number.int({ min: 1, max: 60 }).toString();
        preferredDataType = 'Int';
           productCode = faker.string.alpha(6).toUpperCase();
        productDesc = faker.commerce.productDescription();
        product= productCode + ' - ' + productDesc;
        speed = faker.number.int({ min: 50, max: 500 }).toString();
        uom = faker.string.alpha(3).toUpperCase();
        faultCode = faker.number.int({ min: 10, max: 99 }).toString();
       faultName = faker.word.noun();
        reasons = [ faker.word.noun(), faker.word.noun(),  faker.word.noun(),faker.word.noun() ];
         categoryType = 'Waste';
          firstName = faker.person.firstName();
         lastName = faker.person.lastName();
         phone = '10' + faker.string.numeric(8);
          email = faker.internet.email();
         password = '12345Sport@';
          shift = `Shift ${faker.person.firstName()}`;
          auto = 'Yes';
            lrl = faker.number.int({ min: 10, max: 100 }).toString();
         lsl = faker.number.int({ min: 1000, max: 9999 }).toString();
        lwl = faker.number.int({ min: 1000, max: 9999 }).toString();
        target = faker.number.int({ min: 1000, max: 9999 }).toString();
        uwl = faker.number.int({ min: 1000, max: 99999 }).toString();
        usl = faker.number.int({ min: 1000, max: 99999 }).toString();
        checklisttype = faker.word.noun();
         checklistNameInput = faker.word.noun();
         groupName =faker.word.noun();
    addtext = faker.word.noun();
    itemName = faker.word.noun();
    goodImagePath = 'o3ozone.png'; 
    badImagePath = 'image2.png'; 

    
      });

      test('verify get the plant license key ', async ({ page }) => {  
       await loginpage.login_with_valid_account(companyAdminUsername,companyAdminPassword);
       const licenseKey = await plantsPage.getLicenseKey();
       expect(licenseKey).not.toBeNull();
       expect(licenseKey?.trim().length).toBeGreaterThan(0);
       console.log('License Key:', licenseKey);

      });



      test('verify bulk upload functionality for master data creation', async ({ page, context }) => {  
        await loginpage.login_with_valid_account(companyAdminUsername,companyAdminPassword)
        await plantsPage.clickOnUploadMasterData();
        await plantsPage.uploadFile('Master_Data_Bulk_Upload.xlsm');
        await expect(page.getByText('Master_Data_Bulk_Upload.xlsm')).toBeVisible();
        const newTab = await plantsPage.syncDownOnEdge(context);
         expect(newTab.url()).toBe('http://localhost:4200/login');
         await expect(newTab.getByText('Login').last()).toBeVisible(); 
    
        });




  test("verify create manual master data", async ({ page }) => {

     await loginpage.login_with_valid_account(companyAdminUsername,companyAdminPassword)
    await plantsPage.openManulSetup();
    await machineDetails.addMachineDetails(departmentName, machineName);
    console.log('Machine Details Added:', departmentName, machineName);
    await expect(page.getByText('Record added successfully')).toBeVisible();
    await machineParameter.addMachineParameter(machineName, Parameter, samplingInterval,preferredDataType);
    console.log('Machine Parameter Added:', machineName, Parameter, samplingInterval, preferredDataType);
    await expect(page.getByText('Record Inserted successfully')).toBeVisible();
    await productConfig.addProductConfig(productCode, productDesc, machineName, speed, uom);
    console.log('Product Config Added:',productCode, productDesc, machineName, speed, uom);
    await expect(page.getByText('Product configuration created')).toBeVisible();
    await downtimeConfig.addDownTimeConfig(machineName, faultCode, faultName, reasons);
    console.log('DownTime Config Added:',machineName, faultCode, faultName, reasons);
    await expect(page.getByText('Downtime fault created')).toBeVisible();
    await wasteConfig.addWasteConfig(machineName,categoryType, faultCode, faultName, reasons);
    console.log('Waste Config Added:',machineName,categoryType, faultCode, faultName, reasons);
    await expect(page.getByText('Waste fault created')).toBeVisible();
    await userConfig.addUserConfig(firstName, lastName, phone, email, password);
    console.log('User Config Added:', firstName, lastName, phone, email);
    await expect(page.getByText('Employee Created Successfully')).toBeVisible();
   await crewSchedule.addCrewSchedule(shift);
   await crewSchedule.deleteCrewSchedule();
   await crewSchedule.addCrewSchedule(shift);
   await expect(page.getByText('Shift and Crew Schedule created')).toBeVisible();
    await oeeConfig.addOEEConfig(machineName,Parameter,auto,faultName);
    console.log('OEE Config Added:', machineName,Parameter,auto,faultName);
    await expect (page.getByText('OEE Configuration Added Successfully')).toBeVisible();
    await parameterSpecifications.navigatetoParameterSpecifications();
    await parameterSpecifications.addParameterSpecification( Parameter, product, lrl, lsl, lwl, target, uwl,usl );
    console.log('Parameter Specifications Added:', Parameter, product, lrl, lsl, lwl, target, uwl, usl);
    await checkListType.addCheckListType(checklisttype);
    console.log('CheckList Type Added:',checklisttype);
    await expect( page.getByText('CheckList Type Added')).toBeVisible();
    await checklistConfig.navigateToChecklistConfig();
    await checklistConfig.addChecklistConfig(checklistNameInput,checklisttype);
    await checklistConfig.addGroup(groupName);
    await checklistConfig.addItem(itemName, groupName);
    await checklistConfig.addTextValue(addtext, '10', '100');
    await checklistConfig.addGoodImage(goodImagePath);
    await checklistConfig.addBadImage(badImagePath);
    await expect(page.getByText(goodImagePath)).toBeVisible();
    await expect(page.getByText(badImagePath)).toBeVisible();
    await checklistConfig.saveChecklist();
    console.log(` Checklist Name: ${checklistNameInput} Checklist Type: ${checklisttype} Group: ${groupName} Item: ${itemName}Text: ${addtext}`);
    await expect(page.getByText('CheckList Added Successfuly')).toBeVisible();
 

});


})