// import {Page,Locator} from '@playwright/test'
 
// export class BasePages{
//     protected page:Page;
 
//     constructor(page:Page){
//         this.page=page;


//     }}
import { Page } from "@playwright/test";

export class BasePages {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}

