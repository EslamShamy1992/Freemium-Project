import { test, expect } from '@playwright/test';
import { CheckListType } from '../Freemium-Project/pages/CheckListType';
import { PlantsPage } from '../Freemium-Project/pages/PlantsPage';
import { faker } from '@faker-js/faker';


test.describe('CheckListType', () => {
  let checkListType: CheckListType;
  let plantsPage: PlantsPage;
  let checklisttype: string;

  
  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    checkListType = new CheckListType(page);
    await page.goto('/userjourneyplants');
    checklisttype = faker.word.noun();
  });

  test('verify add CheckListType', async ({page}) => {

  await  plantsPage.openManulSetup()
  checkListType.addCheckListType(checklisttype);
  await expect( page.getByText('CheckList Type Added')).toBeVisible();
  console.log('CheckList Type Added:',checklisttype);


  });


});
