import {Page, Locator} from '@playwright/test'

export class LoginPage { readonly page: Page
                         readonly userNameInput: Locator
                         readonly passwordInput: Locator
                         readonly loginButton: Locator
                         readonly errorMessage: Locator

                  constructor (page: Page){
                                    this.page = page
                                    this.userNameInput = page.locator('#user-name')
                                    this.passwordInput = page.locator('#password')
                                    this.loginButton = page.locator('#login-button')
                                    this.errorMessage = page.locator('[data-test="error"]')


                 
}
                 async fillUsernameInput(username:string){
                    await this.userNameInput.fill(username)
                 }
                 async fillPasswordInput(password:string){
                    await this.passwordInput.fill(password)
                 }
                 async clickLoginButton(){
                  await this.loginButton.click()
                 }
}

