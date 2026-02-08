import { Page, Locator } from "@playwright/test";

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeMenuButton: Locator;
  readonly productsList: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;
  readonly filterItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.allItemsLink = page.locator("#inventory_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.resetAppStateLink = page.locator("#reset_sidebar_link");
    this.closeMenuButton = page.locator("#react-burger-cross-btn");
    this.productsList = page.locator(".inventory_item");
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.filterItems = page.locator(".product_sort_container");
  }

  addToCartButton(productName: string) {
    return this.page.locator(`[data-test="add-to-cart-${productName}"]`);
  }
  removeFromTheCartButton(productName: string) {
    return this.page.locator(`[data-test="remove-${productName}"]`);
  }
  productTitle(productName: string) {
    return this.page.locator(`.inventory_item_name:has-text("${productName}")`);
  }
}
