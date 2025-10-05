import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class CheckListType extends BasePages {
 

     private checkListTypeMenu: Locator;
  private checklistTypeInput: Locator;
  private saveBtn: Locator;

    
    constructor(page:Page){
        super(page)
            this.checkListTypeMenu = page.getByText(' CheckList Type ');
    this.checklistTypeInput = page.getByRole('textbox', { name: 'Checklist Type' });
    this.saveBtn = page.getByRole('button').filter({ hasText: 'save' });
  }

     


    async addCheckListType(checklisttype: string) {
    await this.checkListTypeMenu.click();
    await this.checklistTypeInput.fill(checklisttype);
    await this.saveBtn.click();
  }

    }
