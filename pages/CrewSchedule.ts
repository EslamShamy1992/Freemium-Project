import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class CrewSchedule extends BasePages {
 


  private closeDialogBtn: Locator;
  private crewScheduleMenu: Locator;
  private addBtn: Locator;
  private shiftInput: Locator;
  private timePicker: Locator;
  private hourOption: Locator;
  private pmOption: Locator;
  private endTimeInput: Locator;
  private ampmToggle: Locator;
  private amOption: Locator;
  private okBtn: Locator;
  private slideToggleBar: Locator;
  private saveBtn: Locator;
 private deleteBtn: Locator;
  private confirmDeleteBtn: Locator;
  private updatebtn: Locator;
    
    constructor(page:Page){
        super(page)

     this.deleteBtn = page.getByTitle('Delete');
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, delete it!' });
    this.closeDialogBtn = page.locator('#mat-dialog-0 button').nth(2);
    this.crewScheduleMenu = page.getByText('schedule Crew Schedule');
    this.addBtn = page.getByRole('button', { name: 'Add' }).first();
    this.shiftInput = page.getByRole('textbox', { name: 'Shift' });
    this.timePicker = page.locator('nz-time-picker').first();
    this.hourOption = page.getByText('02').nth(1);
    this.pmOption = page.getByText('pm', { exact: true });
    this.endTimeInput = page.getByRole('textbox', { name: 'Select end time' });
    this.ampmToggle = page.getByText('ampm');
    this.amOption = page.getByText('am', { exact: true });
    this.okBtn = page.getByRole('button', { name: 'Ok' });
    this.slideToggleBar = page.locator('.mat-slide-toggle-bar');
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.updatebtn = page.getByText('edit');


    }

  async deleteCrewSchedule() {
    await this.page.waitForTimeout(2000);
    await this.deleteBtn.first().click();
    await this.confirmDeleteBtn.click();
  }

  async updateCrewSchedule(shift: string) {
    await this.page.waitForTimeout(2000);
    await this.updatebtn.first().click();
    await this.shiftInput.fill(shift);
    await this.slideToggleBar.click();
   await this.timePicker.click();
   await this.page.getByText('am', { exact: true }).click();
   await this.okBtn.click();
   await this.endTimeInput.click();
   await this.pmOption.last().click();
   await this.okBtn.click();
    await this.page.getByText('Update').click();

  }
 
  async addCrewSchedule(shift: string) {
    await this.crewScheduleMenu.click();
    await this.addBtn.click();
    await this.shiftInput.fill(shift);
    await this.timePicker.click();
    await this.hourOption.click();
    await this.page.waitForTimeout(2000);
    await this.pmOption.click();
    await this.endTimeInput.click();
    await this.hourOption.click();
    await this.pmOption.click();
    await this.ampmToggle.click();
    await this.amOption.click();
    await this.okBtn.click();
    await this.slideToggleBar.click();
    await this.saveBtn.click();
  }
}