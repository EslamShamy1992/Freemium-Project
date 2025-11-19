import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class PlantsPage extends BasePages {
 

private uploadMasterDataBtn: Locator;
  private manualSetupHeading: Locator;
  private licenseKeyBtn: Locator;
  private licenseKey: Locator;
    private syncDownBtn: Locator;
  private fileInput: Locator;
    
    constructor(page:Page){
        super(page)

        this.uploadMasterDataBtn = page.getByRole('button', { name: 'Upload Master Data' });
    this.manualSetupHeading = page.getByRole('heading', { name: 'Manual Setup' });
    this.licenseKeyBtn = page.getByRole('button', { name: 'License Key' })
    this.licenseKey = page.locator('pre[style*="background-color: #0f172a; color: #34d399"]');
    this.syncDownBtn = page.getByRole('button', { name: 'Sync Down' });
    this.fileInput = page.locator('input[type="file"]');
  }
    
    

     

    

  async uploadFile(fileName: string) {
    await this.fileInput.setInputFiles(fileName);
  }

  
  async syncDownOnEdge(context: any): Promise<Page> {
    const pagePromise = context.waitForEvent('page');
    await this.syncDownBtn.click();
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    return newTab;
  }

   async openManulSetup() {
    await this.uploadMasterDataBtn.click();
    await this.manualSetupHeading.click();
  }

 async clickOnUploadMasterData() {
    await this.uploadMasterDataBtn.click();
  }


  async getLicenseKey() {
    await this.licenseKeyBtn.click();
    return await this.licenseKey.textContent();
  }





}