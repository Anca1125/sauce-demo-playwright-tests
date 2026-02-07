import { test, expect } from "@playwright/test";
import { validUser } from "../fixtures/test-data-login";
import { LoginPage } from "../pages/login.page";
import { MenuPage } from "../pages/menu.page";

test.describe("Menu Page Tests", () => {
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsernameInput(validUser.username);
    await loginPage.fillPasswordInput(validUser.password);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("user can open the menu", async () => {
    await menuPage.menuButton.click();

    await expect(menuPage.closeMenuButton).toBeVisible();
  });

  test("user can close the menu", async () => {
    await menuPage.menuButton.click();
    await menuPage.closeMenuButton.click();

    await expect(menuPage.closeMenuButton).not.toBeVisible();
  });

  test("user can logout from the menu", async ({ page }) => {
    await menuPage.menuButton.click();
    await menuPage.logoutLink.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("user can open About page from the menu", async ({ page }) => {
    await menuPage.menuButton.click();
    await menuPage.aboutLink.click();

    await expect(page).toHaveURL("https://saucelabs.com/");
  });
});
