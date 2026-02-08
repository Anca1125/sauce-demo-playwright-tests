import { test, expect } from "@playwright/test";
import { validUser } from "../fixtures/test-data-login";
import { LoginPage } from "../pages/login.page";
import { MenuPage } from "../pages/menu.page";
import { CartPage } from "../pages/cart.page";

test("E2E - user can complete checkout successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  //LOGIN
  await page.goto("https://www.saucedemo.com/");
  await loginPage.fillUsernameInput(validUser.username);
  await loginPage.fillPasswordInput(validUser.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  //ADD TO CART
  await menuPage.addToCartButton("sauce-labs-backpack").click();
  await menuPage.shoppingCart.click();

  //CHWECKOUT STEP 1
  await cartPage.checkoutButton.click();
  await page.fill('[data-test="firstName"]', "Iliuta");
  await page.fill('[data-test="lastName"]', "MIsu");
  await page.fill('[data-test="postalCode"]', "12345");
  await page.click('[data-test="continue"]');

  //CHECKOUT STEP 2
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
  // await page.click('[data-test="finish"]');
  await page.locator("#finish").click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );

  //ASSERTIONS
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!",
  );
});
