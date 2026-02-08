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

  test("menu page - user can open the menu", async () => {
    await menuPage.menuButton.click();

    await expect(menuPage.closeMenuButton).toBeVisible();
  });

  test("menu page -user can close the menu", async () => {
    await menuPage.menuButton.click();
    await menuPage.closeMenuButton.click();

    await expect(menuPage.closeMenuButton).not.toBeVisible();
  });

  test(" menu page user can logout from the menu", async ({ page }) => {
    await menuPage.menuButton.click();
    await menuPage.logoutLink.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("menu page user can open About page from the menu", async ({ page }) => {
    await menuPage.menuButton.click();
    await menuPage.aboutLink.click();

    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("menu page - products list is visible", async ({ page }) => {
    await expect(menuPage.productsList.first()).toBeVisible();
    await expect(menuPage.productsList).toHaveCount(6);
  });

  test("menu page - click on shopping cart icon navigate to cart page", async ({
    page,
  }) => {
    await menuPage.shoppingCart.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });

  test("menu page - the user is able to add to cart items", async ({
    page,
  }) => {
    await menuPage.addToCartButton("sauce-labs-backpack").click();
    await expect(menuPage.cartBadge).toHaveText("1");
  });

  test("menu page - the user is able to add multiple items to  the cart", async ({
    page,
  }) => {
    const products = [
      "sauce-labs-backpack",
      "sauce-labs-bolt-t-shirt",
      "sauce-labs-onesie",
      "sauce-labs-bike-light",
      "sauce-labs-fleece-jacket",
    ];

    for (const product of products) {
      await menuPage.addToCartButton(product).click();
    }

    await expect(menuPage.cartBadge).toHaveText("5");
  });

  test("menu page - the user is able to remove items from the cart", async ({
    page,
  }) => {
    const productBackpack = "sauce-labs-backpack";

    await menuPage.addToCartButton(productBackpack).click();
    await menuPage.removeFromTheCartButton(productBackpack).click();

    await expect(menuPage.cartBadge).toHaveCount(0);
  });

  test("menu page - the user is able to filter items from highier price to lowest", async ({
    page,
  }) => {
    await expect(menuPage.productsList.first()).toBeVisible();

    const before = await menuPage.productsList.allTextContents();

    await menuPage.filterItems.click();
    await menuPage.filterItems.selectOption("hilo");

    const after = await menuPage.productsList.allTextContents();

    expect(before).not.toEqual(after);
  });

  test("menu page - the user is able to filter items bt name, from Z to A", async ({
    page,
  }) => {
    await expect(menuPage.productsList.first()).toBeVisible();

    const before = await menuPage.productsList.allTextContents();

    await menuPage.filterItems.click();
    await menuPage.filterItems.selectOption("za");

    const after = await menuPage.productsList.allTextContents();

    expect(before).not.toEqual(after);
  });

  test("menu page - the user is able to filter items from lowest price to highest", async ({
    page,
  }) => {
    await expect(menuPage.productsList.first()).toBeVisible();

    const before = await menuPage.productsList.allTextContents();

    await menuPage.filterItems.click();
    await menuPage.filterItems.selectOption("lohi");

    const after = await menuPage.productsList.allTextContents();

    expect(before).not.toEqual(after);
  });

  test("menu page - the user is able to filter items bt name, from A to Z", async ({
    page,
  }) => {
    await expect(menuPage.productsList.first()).toBeVisible();

    const names = await menuPage.productsList.allTextContents();
    const sortedNames = [...names].sort();

    await menuPage.filterItems.click();
    await menuPage.filterItems.selectOption("az");

    expect(names).toEqual(sortedNames);
  });

  test("menu page - when click on a product, the user is redirected to the page with details of that product", async ({
    page,
  }) => {
    const productName = "Sauce Labs Backpack";

    await expect(menuPage.productsList.first()).toBeVisible();

    await menuPage.productTitle(productName).click();

    await expect(page).toHaveURL(/.inventory-item.html/);
    await expect(page.locator(".inventory_details_name")).toHaveText(
      productName,
    );
  });
});
