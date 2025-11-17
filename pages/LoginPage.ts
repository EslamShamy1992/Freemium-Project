import { BasePages } from "./BasePages";
import { Page,Locator } from "@playwright/test";



export class LoginPage extends BasePages {
 

    private username:Locator;
    private password:Locator;
    private loginButton:Locator;
    constructor(page:Page){
        super(page)

        this.username=page.getByPlaceholder('Email');
        this.password=page.getByPlaceholder('Password');
        this.loginButton=page.getByRole('button',{name: 'Login'});


    }



    async login_with_valid_account(username:string,pass:string){

        await this.username.fill(username);
        await this.password.fill(pass);
        await this.loginButton.click()

    }

}