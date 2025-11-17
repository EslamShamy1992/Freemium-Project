import { test, expect } from '@playwright/test';
import { ChecklistConfig } from '../pages/ChecklistConfig';
import { PlantsPage } from '../pages/PlantsPage';
import {  faker } from '@faker-js/faker';
import { CheckListType } from '../pages/CheckListType';

test.describe('ChecklistConfig', () => {
  let checklistConfig: ChecklistConfig;
  let plantsPage: PlantsPage;
  let checkListType: CheckListType;
  let checklistNameInput: string;
  let checklisttype: string;
  let groupName: string;
  let addtext:string;
  let itemName: string;
  let goodImagePath: string;
  let badImagePath: string; 
  let updatchecklistNameInput: string;

  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    checklistConfig = new ChecklistConfig(page);
    checkListType = new CheckListType(page);
    await page.goto('/userjourneyplants'); 
    checklistNameInput = faker.word.noun();
    checklisttype = faker.word.noun();
    updatchecklistNameInput = faker.word.noun();
    groupName =faker.word.noun();
    addtext = faker.word.noun();
    itemName = faker.word.noun();
    goodImagePath = 'o3ozone.png'; 
    badImagePath = 'image2.png'; 

  });

  test('verify add ChecklistConfig ', async ({page}) => {

   await plantsPage.openManulSetup()
   await checkListType.addCheckListType(checklisttype);
   await checklistConfig.navigateToChecklistConfig();
   await checklistConfig.addChecklistConfig(checklistNameInput, checklisttype);
   await checklistConfig.addGroup(groupName);
   await checklistConfig.addItem(itemName, groupName);
   await checklistConfig.addTextValue(addtext, '10', '100');
   await checklistConfig.addGoodImage(goodImagePath);
   await checklistConfig.addBadImage(badImagePath);
   await expect(page.getByText(goodImagePath)).toBeVisible();
   await expect(page.getByText(badImagePath)).toBeVisible();
   await checklistConfig.saveChecklist();
   await expect(page.getByText('CheckList Added Successfuly')).toBeVisible();
  console.log(`Checklist Config Added:
   Checklist Name: ${checklistNameInput}
   Checklist Type: ${checklisttype}
   Group: ${groupName}
   Item: ${itemName}
   Text: ${addtext}
   Min Value: 10
   Max Value: 100`);

  });


    test('verify update ChecklistConfig ', async ({page}) => {  
    await plantsPage.openManulSetup() 
    await checkListType.addCheckListType(checklisttype);
    await checklistConfig.navigateToChecklistConfig();
    await checklistConfig.addChecklistConfig(checklistNameInput, checklisttype);   
    await checklistConfig.addGroup(groupName);
    await checklistConfig.addItem(itemName, groupName);
    await checklistConfig.addTextValue(addtext, '10', '100');
    await checklistConfig.addGoodImage(goodImagePath);
    await checklistConfig.addBadImage(badImagePath);
    await checklistConfig.saveChecklist();
    await checklistConfig.updateChecklistConfig(updatchecklistNameInput,checklisttype); 
    await checklistConfig.addTextValue(addtext, '20', '101');
    await checklistConfig.addGoodImage(goodImagePath);
    await checklistConfig.addBadImage(badImagePath);
    await checklistConfig.clickSaveUpdate();
    await expect(page.getByText('Check List Updated Successfuly Success')).toBeVisible();

     });




  test('verify delete ChecklistConfig ', async ({page}) => {  
   await plantsPage.openManulSetup()
   await checkListType.addCheckListType(checklisttype);
   await checklistConfig.navigateToChecklistConfig();
   await checklistConfig.addChecklistConfig(checklistNameInput, checklisttype);
   await checklistConfig.addGroup(groupName);
   await checklistConfig.addItem(itemName, groupName);
   await checklistConfig.addTextValue(addtext, '10', '100');
   await checklistConfig.addGoodImage(goodImagePath);
   await checklistConfig.addBadImage(badImagePath);
   await expect(page.getByText(goodImagePath)).toBeVisible();
   await expect(page.getByText(badImagePath)).toBeVisible();
   await checklistConfig.saveChecklist();
   await checklistConfig.deleteChecklistConfig();
    await expect(page.getByText('Deleted!')).toBeVisible();
    await expect(page.getByText(checklistNameInput)).not.toBeVisible();
    
  });




});