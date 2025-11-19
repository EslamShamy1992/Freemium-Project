import { test, expect } from '@playwright/test';
import { CrewSchedule } from '../pages/CrewSchedule';
import { PlantsPage } from '../pages/PlantsPage'; 
import { faker } from '@faker-js/faker';



test.describe('CrewSchedule', () => {
  let crewSchedule: CrewSchedule;
    let plantsPage: PlantsPage;
      let shift: string;
      let updatedShift: string;


  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    crewSchedule = new CrewSchedule(page);
    await page.goto('/userjourneyplants');
    shift = `Shift ${faker.word.noun()}`;
    updatedShift= faker.word.noun()

  });

  test('verify add and delete CrewSchedule ', async ({page}) => {

   await plantsPage.openManulSetup()
   await crewSchedule.addCrewSchedule(shift);
   await crewSchedule.deleteCrewSchedule();
   await crewSchedule.addCrewSchedule(shift);
   await expect(page.getByText('Shift and Crew Schedule created')).toBeVisible();
  console.log('Crew Schedule Added and Deleted:',shift);


});

test('verify update CrewSchedule ', async ({page}) => {  
  await plantsPage.openManulSetup()
  await crewSchedule.addCrewSchedule(shift);  
  console.log('Crew Schedule Added:',shift);
  await crewSchedule.updateCrewSchedule(updatedShift);
  console.log('Crew Schedule Updated:',updatedShift);
  await expect(page.getByText('Shift and crew schedule updated')).toBeVisible();

});

test('verify delete CrewSchedule ', async ({page}) => {  
  await plantsPage.openManulSetup()
  await crewSchedule.addCrewSchedule(shift);
  await crewSchedule.deleteCrewSchedule();
  await expect(page.getByText('Shift and crew schedule deleted')).toBeVisible();
  await expect(page.getByText(shift)).not.toBeVisible();
  console.log('Crew Schedule Deleted:',shift);  
});

});