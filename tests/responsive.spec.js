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
  await toggle.click();
  await expect(page.locator("#primary-navigation")).toHaveClass(/is-open/);
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
});

test("Blog search, category filter and pagination work", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page.locator(".blog-card:visible")).toHaveCount(4);
  await page.locator("#blogNext").click();
  await expect(page.locator(".blog-card:visible")).toHaveCount(2);
  await page.locator("#blogCategory").selectOption("Parenting");
  await expect(page.locator(".blog-card:visible")).toHaveCount(1);
  await expect(page.locator("#blogCount")).toContainText("1 लेख मिले");
  await page.locator("#blogSearch").fill("कोई लेख नहीं");
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
    await page.goto(path);
    const dimensions = await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth, path).toBeLessThanOrEqual(dimensions.width + 1);
  }
});
