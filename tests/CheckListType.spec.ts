import { test, expect } from '@playwright/test';
import { CheckListType } from '../pages/CheckListType';
import { PlantsPage } from '../pages/PlantsPage';
import { faker } from '@faker-js/faker';


test.describe('CheckListType', () => {
  let checkListType: CheckListType;
  let plantsPage: PlantsPage;
  let checklisttypeinput: string;
  let updatedCheckListType: string;

  
  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    checkListType = new CheckListType(page);
    await page.goto('/userjourneyplants');
    checklisttypeinput = faker.word.noun();
    updatedCheckListType = faker.word.noun();
  });


  test('verify add CheckListType', async ({page}) => {
  await  plantsPage.openManulSetup()
  await checkListType.addCheckListType(checklisttypeinput);
  await expect( page.getByText('CheckList Type Added Successfully')).toBeVisible();
  console.log('CheckList Type Added:',checklisttypeinput);

  });


  test('verify update CheckListType', async ({page}) => {  
  await plantsPage.openManulSetup()
  await checkListType.addCheckListType(checklisttypeinput);  
  console.log('CheckList Type Added:',checklisttypeinput);
  await checkListType.updateCheckListType(updatedCheckListType);
  console.log('CheckList Type Updated:',updatedCheckListType);
   await expect( page.getByText('Updated Successfully')).toBeVisible();
});


  test('verify delete CheckListType', async ({page}) => {  
    await plantsPage.openManulSetup()
    await checkListType.addCheckListType(checklisttypeinput);
    console.log('CheckList Type Added:',checklisttypeinput);
    await checkListType.deleteCheckListType(); 
    await expect( page.getByText('Deleted Successfully')).toBeVisible();
    await expect(page.getByText(checklisttypeinput)).not.toBeVisible();


});


});
