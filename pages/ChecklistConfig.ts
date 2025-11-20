import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class ChecklistConfig extends BasePages {
 
 private checklistConfigLink: Locator;
  private addChecklistBtn: Locator;
  private checklistNameInput: Locator;
  private checklistTypeDropdown: Locator;
  private checklistTypeOption: (name: string) => Locator;
  private selectUnitsDropdown: Locator;
  private selectAllUnits: Locator;
  private dialogAddChecklist: Locator;
  private addGroupBtn: Locator;
  private groupInput: Locator;
  private saveGroupBtn: Locator;
  private closeGroupBtn: Locator;
  private itemInput: Locator;
  private dropdownGroupCell: Locator;
  private groupOption: (name: string) => Locator;
  private optionCell: Locator;
  private valueOption: Locator;
  private addTextInput: Locator;
  private minInput: Locator;
  private maxInput: Locator;
  private saveBtn: Locator;
  private goodImage:Locator;
  private badImage:Locator;
  private updateBtn:Locator;

    
    constructor(page:Page){
        super(page)

        this.checklistConfigLink = page.getByText("Checklist Configuration");
    this.addChecklistBtn = page.getByRole("button", { name: "" });
    this.checklistNameInput = page.getByRole("textbox", { name: "Checklist Name" });
    this.checklistTypeDropdown = page.getByRole("combobox", { name: "Checklist Type" }).locator("span");
    this.checklistTypeOption = (name: string) => page.getByText(name, { exact: true }).first();
    this.selectUnitsDropdown = page.getByLabel("Select Units").getByText("Select Units");
    this.selectAllUnits = page.getByRole("option", { name: "Select All" }).locator("mat-pseudo-checkbox");
    this.dialogAddChecklist = page.getByRole("dialog", { name: "Add CheckList " });

    this.addGroupBtn = page.getByLabel("Add CheckList").getByRole("button", { name: "" });
    this.groupInput = page.getByRole("textbox", { name: "Group" });
    this.saveGroupBtn = page.getByLabel("Add Group").getByRole("button", { name: "" });
    this.closeGroupBtn = page.getByLabel("Add Group").getByRole("button", { name: "" });

    this.itemInput = page.getByRole("textbox", { name: "Item" });
    this.dropdownGroupCell = page.getByRole("cell", { name: "Dropdown Group" });
    this.groupOption = (name: string) => page.getByText(name, { exact: true });
    this.optionCell = page.getByRole("cell", { name: "Option" });
    this.valueOption = page.getByText("Value");
    this.addTextInput = page.getByRole("textbox", { name: "Add Text" });

    this.minInput = page.getByPlaceholder('Add Value').nth(0)
    this.maxInput = page.getByPlaceholder('Add Value').nth(1)
    this.saveBtn = page.getByRole("button", { name: "" });
    this.goodImage = page.locator('input[type="file"]').nth(0); 
    this.badImage= page.locator('input[type="file"]').nth(1); 

    this.updateBtn= page.locator('.mat-focus-indicator.mat-mini-fab.mat-button-base.mat-primary').first();

     

    }



    async deleteChecklistConfig() {
    await this.page.getByRole('button', { name: 'delete' }).first().click();
    await this.page.getByRole('button', { name: 'Yes, delete it!' }).click();
  }

  async updateChecklistConfig(name: string, checklistType: string) {

    await this.updateBtn.click();
    await this.checklistNameInput.fill(name);
    await this.checklistTypeDropdown.first().click();
  await this.page.getByRole('option', { name: checklistType }).locator('span').click();
  }

  async navigateToChecklistConfig() {
    await this.checklistConfigLink.click();
  }

  async clickSaveUpdate() {
   await this.page.getByLabel('Update CheckList').getByRole('button').filter({ hasText: 'edit' }).click();
  }
  async addChecklistConfig(name: string, checklistType: string) {
    await this.addChecklistBtn.click();
    await this.checklistNameInput.fill(name);
    await this.checklistTypeDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: checklistType }).locator('span').click();
    await this.selectUnitsDropdown.click();
    await this.selectAllUnits.click();
    await this.page.mouse.click(0, 0); 
  }

  async addGroup(name: string) {
    await this.dialogAddChecklist.click();
    await this.addGroupBtn.click();
    await this.groupInput.fill(name);
    await this.saveGroupBtn.click();
    await this.closeGroupBtn.click();
  }

  async addItem(item: string, groupName: string) {
    await this.itemInput.fill(item);
    await this.dropdownGroupCell.click();
    await this.groupOption(groupName).click();
    await this.optionCell.click();
    await this.valueOption.click();
  }

  async addTextValue(text: string, min: string, max: string) {
    await this.addTextInput.fill(text);
    await this.minInput.fill(min);
    await this.maxInput.fill(max);
  }
  async addGoodImage(filePath: string) {
    await this.goodImage.setInputFiles(filePath);
  }
  async addBadImage(filePath: string) { 

    await this.badImage.setInputFiles(filePath);
  }

  async saveChecklist() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(2000);
  }
}