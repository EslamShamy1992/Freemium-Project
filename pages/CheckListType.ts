import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class CheckListType extends BasePages {
 

     private checkListTypeMenu: Locator;
  private checklistTypeInput: Locator;
  private saveBtn: Locator;
  private updateBtn:Locator;

    
    constructor(page:Page){
        super(page)
            this.checkListTypeMenu = page.getByText(' CheckList Type ');
    this.checklistTypeInput = page.getByRole('textbox', { name: 'Checklist Type' });
    this.saveBtn = page.locator('button:has(mat-icon:text("save"))').first()
        this.updateBtn= page.locator('button:has(mat-icon:text("edit"))').first();

  }

     


    async addCheckListType(checklisttype: string) {
    await this.checkListTypeMenu.click();
    await this.checklistTypeInput.fill(checklisttype);
    await this.saveBtn.click();
  }


  async deleteCheckListType() {
  await this.page.waitForTimeout(1000);
  await this.page.locator('button:has(mat-icon:text("delete"))').first().click();

  }



  async updateCheckListType(updatedCheckListType: string) {
    await this.page.waitForTimeout(1000);
   await this.updateBtn.click();
    await this.checklistTypeInput.fill(updatedCheckListType);
       await this.updateBtn.click();

  }
    }
