import { test, expect } from "@playwright/test";
import { validUser } from "../fixtures/test-data-login";
import { LoginPage } from "../pages/login.page";
import { MenuPage } from "../pages/menu.page";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Page Tests", () => {
  let menuPage: MenuPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsernameInput(validUser.username);
    await loginPage.fillPasswordInput(validUser.password);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

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
    await menuPage.shoppingCart.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });

  test("cart page - cart items are visible", async ({ page }) => {
    await menuPage.shoppingCart.click();
    await expect(cartPage.cartItems.first()).toBeVisible();
  });

  test("cart page - sum of all item prices is calculated correctlyd", async ({
    page,
  }) => {
    const pricesText = await cartPage.cartItems
      .locator(".inventory_item_price")
      .allTextContents();
    const prices = pricesText.map((price) => Number(price.replace("$", "")));
    const total = prices.reduce((sum, price) => sum + price, 0);
    expect(total).toBeGreaterThan(0);
  });

  test("cart page - user can remove items from the cart", async ({ page }) => {
    await expect(cartPage.cartItems).toHaveCount(5);
    await cartPage.cartItems.first().locator("button").click();
    await expect(cartPage.cartItems).toHaveCount(4);
  });

  test("cart page - continue shopping navigates back to products page", async ({
    page,
  }) => {
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("cart page - proceed to checkoute", async ({ page }) => {
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html",
    );
  });
});
