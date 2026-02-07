import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { validUser, invalidUser } from "../fixtures/test-data-login";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
  test("Login with valid credentials", async ({ page }) => {
    await loginPage.fillUsernameInput(validUser.username);
    await loginPage.fillPasswordInput(validUser.password);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Login with invalid username", async ({ page }) => {
    await loginPage.fillUsernameInput(invalidUser.username);
    await loginPage.fillPasswordInput(validUser.password);
    await loginPage.clickLoginButton();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
  test("Login with invalid password", async ({ page }) => {
    await loginPage.fillUsernameInput(validUser.username);
    await loginPage.fillPasswordInput(invalidUser.password);
    await loginPage.clickLoginButton();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
  test("Login with empty fields", async ({ page }) => {
    await loginPage.fillUsernameInput("");
    await loginPage.fillPasswordInput("");
    await loginPage.clickLoginButton();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
  });
});
