const { test, expect } = require("@playwright/test");

test("homepage exposes all nine master-plan categories and the shared footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#categoryGrid .search-item")).toHaveCount(9);
  await expect(page.locator(".marjan-site-footer")).toBeVisible();
  await expect(page.locator(".marjan-site-footer a[href='/blog']")).toBeVisible();
});

test("mobile menu opens and reaches the Blog listing", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  await page.goto("/");
  const toggle = page.locator("header .menu-toggle");
  await expect(toggle).toBeVisible();
  await expect(page.locator("header .nav-search")).toBeVisible();
  await expect(page.locator("#primary-navigation")).toBeHidden();
  await toggle.click();
  await expect(page.locator("#primary-navigation")).toHaveClass(/is-open/);
  const resources = page.locator("#primary-navigation .nav-group").last();
  await resources.locator("summary").click();
  await resources.getByRole("link", { name: "Blog & Latest Articles" }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
});

test("Blog search, category filter and pagination work", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page.locator(".blog-card:visible")).toHaveCount(4);
  await expect(page.locator("#blogNext")).toBeEnabled();
  await page.locator("#blogNext").click();
  await expect(page.locator("#blogPageStatus")).toHaveText("Page 2 of 2");
  await expect(page.locator(".blog-card:visible")).toHaveCount(2);
  await page.locator("#blogCategory").selectOption("Parenting");
  await expect(page.locator(".blog-card:visible")).toHaveCount(1);
  await expect(page.locator("#blogCount")).toContainText("1 लेख मिले");
  await page.locator("#blogSearch").evaluate((input) => { input.value = "कोई लेख नहीं"; input.dispatchEvent(new Event("input", { bubbles: true })); });
  await expect(page.locator("#blogCount")).toHaveText("0 लेख मिले");
  await expect(page.locator("#blogEmpty")).toBeVisible();
});

test("article pages provide breadcrumbs, a generated contents list and related reading", async ({ page }) => {
  await page.goto("/article-reading-habit/");
  await expect(page.locator(".marjan-article-breadcrumbs")).toBeVisible();
  await expect(page.locator("#marjanArticleToc")).toBeVisible();
  const tocLinks = await page.locator("#marjanArticleToc a").count();
  expect(tocLinks).toBeGreaterThan(0);
  await expect(page.locator(".marjan-related-articles .marjan-related-card")).toHaveCount(3);
});

test("Digital Products page distinguishes available and planned products", async ({ page }) => {
  await page.goto("/digital-products/");
  await expect(page.getByRole("heading", { name: "बच्चों के सीखने के लिए Digital Products" })).toBeVisible();
  await expect(page.locator(".product-status.available")).toHaveCount(1);
  await expect(page.locator(".product-card")).toHaveCount(7);
  await expect(page.getByRole("link", { name: /Free PDF डाउनलोड करें/ })).toHaveAttribute("href", /script\.google\.com/);
});

test("mobile pages do not create horizontal overflow", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  for (const path of ["/", "/blog/", "/digital-products/", "/worksheets/", "/ebooks-pdfs/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.locator("body").waitFor();
    const dimensions = await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth, path).toBeLessThanOrEqual(dimensions.width + 1);
  }
});

test("legacy homepage markup is upgraded to the shared global navigation", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header.marjan-header");
  await expect(header).toBeVisible();
  await expect(header.locator("#primary-navigation.primary-navigation")).toBeVisible();
  await expect(header.locator("#primary-navigation .nav-group")).toHaveCount(8);
  await expect(header.locator(".nav-search")).toHaveAttribute("href", "/search/");
});

test("mobile bottom navigation is present across key page types", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  for (const path of ["/", "/blog/", "/parenting/", "/kids-education/", "/worksheets/", "/baby-names/", "/digital-products/"]) {
    await page.goto(path);
    await expect(page.locator(".marjan-mobile-bottom")).toBeVisible();
    await expect(page.locator(".marjan-mobile-bottom .bottom-more")).toBeVisible();
  }
});

test("global header search is visible and searches site sections and articles", async ({ page }) => {
  await page.goto("/");
  const searchLink = page.locator("header .nav-search");
  await expect(searchLink).toBeVisible();
  await searchLink.click();
  await expect(page).toHaveURL(/\/search\//);
  await page.locator("#global-search-input").fill("vaccination");
  await expect(page.locator("#search-results a[href='/parenting']")).toBeVisible();
  await page.locator("#global-search-input").fill("Hindi Story Books");
  await expect(page.locator("#search-results a[href='/article-bachon-ke-liye-hindi-story-books']")).toBeVisible();
});

test("desktop header has no hamburger and exposes search beside the main navigation", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop");
  await page.goto("/");
  await expect(page.locator("header .menu-toggle")).toBeHidden();
  await expect(page.locator("header .nav-search")).toBeVisible();
  await expect(page.locator("#primary-navigation .nav-group")).toHaveCount(8);
  await expect(page.locator("#primary-navigation > .nav-home")).toHaveCount(1);
  await expect(page.locator("#primary-navigation > .nav-direct")).toHaveCount(0);
  const navBox = await page.locator("#primary-navigation").boundingBox();
  expect(navBox.height).toBeLessThan(48);
  await expect(page.locator("#primary-navigation .nav-group").last().locator(".nav-mega a", { hasText: "Blog & Latest Articles" })).toBeAttached();
});

test("mobile header keeps logo, search and compact menu on one row", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  await page.goto("/");
  const logo = page.locator("header.marjan-header > .brand");
  const actions = page.locator("header.marjan-header > .marjan-header-actions");
  const search = page.locator("header .nav-search");
  const toggle = page.locator("header .menu-toggle");
  await expect(search).toBeVisible();
  await expect(toggle).toBeVisible();
  await expect(toggle.locator("span")).toBeHidden();
  await expect(page.locator("#primary-navigation")).not.toHaveClass(/is-open/);
  const logoBox = await logo.boundingBox();
  const actionsBox = await actions.boundingBox();
  expect(Math.abs((logoBox.y + logoBox.height / 2) - (actionsBox.y + actionsBox.height / 2))).toBeLessThan(12);
});


test("mobile fixed bottom navigation shows primary shortcuts and More categories", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  await page.goto("/");
  const bar = page.locator(".marjan-mobile-bottom");
  await expect(bar).toBeVisible();
  for (const label of ["Home", "Blog", "Learn", "Worksheets", "More"]) {
    await expect(bar.getByText(label, { exact: true })).toBeVisible();
  }
  await bar.getByRole("button", { name: "More" }).click();
  const panel = page.locator("#marjan-bottom-more");
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link", { name: "Parenting" })).toBeVisible();
  await expect(panel.getByRole("link", { name: "Baby Names" })).toBeVisible();
  await expect(panel.getByRole("link", { name: "Products & Reviews" })).toBeVisible();
});
