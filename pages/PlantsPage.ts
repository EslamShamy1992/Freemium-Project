import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class PlantsPage extends BasePages {
 

private uploadMasterDataBtn: Locator;
  private manualSetupHeading: Locator;
    
    constructor(page:Page){
        super(page)

        this.uploadMasterDataBtn = page.getByRole('button', { name: 'Upload Master Data' });
    this.manualSetupHeading = page.getByRole('heading', { name: 'Manual Setup' });
     

    }



   async openManulSetup() {
    await this.uploadMasterDataBtn.click();
    await this.manualSetupHeading.click();
  }

  



}