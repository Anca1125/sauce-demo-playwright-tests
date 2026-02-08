import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartIntemsName: Locator;
  readonly cartItemsPrice: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.cartIntemsName = page.locator(".inventory_item_name");
    this.cartItemsPrice = page.locator(".inventory_item_price");
    this.checkoutButton = page.locator("#checkout");
    this.continueShoppingButton = page.locator("#continue-shopping");
  }
}
