import { test, expect } from '@playwright/test';
import { ChecklistConfig } from '../pages/ChecklistConfig';
import { PlantsPage } from '../pages/PlantsPage';
import { fa, faker } from '@faker-js/faker';

test.describe('ChecklistConfig', () => {
  let checklistConfig: ChecklistConfig;
  let plantsPage: PlantsPage;
  let checklistNameInput: string;
  let checklisttype: string;
  let groupName: string;
  let addtext:string;
  let itemName: string;
  let goodImagePath: string;
  let badImagePath: string; 


  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    checklistConfig = new ChecklistConfig(page);
    await page.goto('/userjourneyplants'); 
    checklistNameInput = faker.word.noun();
    checklisttype = 'freckle';
    groupName =faker.word.noun();
    addtext = faker.word.noun();
    itemName = faker.word.noun();
    goodImagePath = 'o3ozone.png'; 
    badImagePath = 'image2.png'; 

  });

  test('verify add ChecklistConfig ', async ({page}) => {


   await plantsPage.openManulSetup()
   await checklistConfig.addChecklistConfig(checklistNameInput, 'freckle');
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


});