import { test, expect } from '@playwright/test';
import { CrewSchedule } from '../pages/CrewSchedule';
import { PlantsPage } from '../pages/PlantsPage'; 
import { faker } from '@faker-js/faker';



test.describe('CrewSchedule', () => {
  let crewSchedule: CrewSchedule;
    let plantsPage: PlantsPage;
      let shift: string;


  test.beforeEach(async ({ page }) => {
    plantsPage = new PlantsPage(page);
    crewSchedule = new CrewSchedule(page);
    await page.goto('/userjourneyplants');
    shift = `Shift ${faker.person.firstName()}`;

  });

  test('verify add and delete CrewSchedule ', async ({page}) => {

   await plantsPage.openManulSetup()
   await crewSchedule.addCrewSchedule(shift);
  // await expect(page.getByText(shift)).toBeVisible();
   await crewSchedule.deleteCrewSchedule();
   await crewSchedule.addCrewSchedule(shift);
   await expect(page.getByText('Shift and Crew Schedule created')).toBeVisible();

  // await expect(page.getByText(shift)).not.toBeVisible();
  console.log('Crew Schedule Added and Deleted:',shift);



});


});