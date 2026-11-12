const { test, expect } = require("@playwright/test");

test("homepage exposes all nine master-plan categories and the shared footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#categoryGrid .search-item")).toHaveCount(9);
  await expect(page.locator(".marjan-site-footer")).toBeVisible();
  await expect(page.locator(".marjan-site-footer a[href='/blog/']")).toBeVisible();
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

test("Blog pagination moves between pages", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page.locator("#blogGrid .blog-card:not([hidden])")).toHaveCount(4);
  await expect(page.locator("#blogNext")).toBeEnabled();
  await page.locator("#blogNext").click();
  await expect(page.locator("#blogPageStatus")).toHaveText("Page 2 of 2");
  await expect(page.locator("#blogGrid .blog-card:not([hidden])")).toHaveCount(2);
  await page.locator("#blogPrev").click();
  await expect(page.locator("#blogPageStatus")).toHaveText("Page 1 of 2");
});

test("Blog category filter updates visible articles", async ({ page }) => {
  await page.goto("/blog/");
  const category = page.locator("#blogCategory");
  await category.selectOption("Parenting");
  await expect(category).toHaveValue("Parenting");
  await expect(page.locator("#blogCount")).toHaveText("1 लेख मिले");
  await expect(page.locator(".blog-card:not([hidden])")).toHaveCount(1);
});

test("Blog search shows an empty state when no article matches", async ({ page }) => {
  await page.goto("/blog/");
  await page.locator("#blogSearch").fill("कोई लेख नहीं");
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
  await expect(header.locator("#primary-navigation.primary-navigation")).toBeAttached();
  await expect(header.locator("#primary-navigation .nav-group")).toHaveCount(8);
  await expect(header.locator(".nav-search")).toHaveAttribute("href", "/search/");
});

test("mobile bottom navigation is present across key page types", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile");
  for (const path of ["/", "/blog/", "/parenting", "/kids-education", "/worksheets", "/baby-names/", "/digital-products/"]) {
    await page.goto(path, { waitUntil: "load" });
    await expect(page.locator(".marjan-mobile-bottom")).toBeVisible();
    await expect(page.locator(".marjan-mobile-bottom .bottom-more")).toBeVisible();
  }
});

test("Baby Names directory loads 538 names and supports filters and shortlist", async ({ page }) => {
  const dataResponse = await page.request.get("/assets/data/baby-names.json");
  expect(dataResponse.status()).toBe(200);
  const data = await dataResponse.json();
  expect(data).toHaveLength(538);
  const pageErrors = [];
  const failedRequests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("requestfailed", request => { if (request.url().includes("baby-names.json")) failedRequests.push(request.url()+": "+request.failure()?.errorText); });
  await page.goto("/baby-names/");
  const browserFetch = await page.evaluate(async () => Promise.race([
    fetch("/assets/data/baby-names.json").then(async response => ({ status: response.status, bytes: (await response.text()).length })),
    new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 5000))
  ]));
  console.log("Baby Names runtime", browserFetch, await page.locator("#baby-name-result-count").textContent(), await page.locator("#baby-name-results .baby-name-card").count(), pageErrors, failedRequests);
  await expect(page.locator("#baby-name-result-count")).toHaveText("538 names");
  await expect(page.locator("#baby-name-results .baby-name-card").first()).toBeVisible({ timeout: 15000 });
  await page.locator("#baby-name-gender").selectOption("boy");
  await expect(page.locator("#baby-name-result-count")).toHaveText("244 names");
  await page.locator("#baby-name-religion").selectOption("muslim");
  await expect(page.locator("#baby-name-result-count")).toHaveText("56 names");
  const firstName = page.locator("#baby-name-results .baby-name-card").first();
  const save = firstName.getByRole("button", { name: /Shortlist/ });
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await page.locator("#baby-name-shortlist-filter").click();
  await expect(page.locator("#baby-name-result-count")).toHaveText("1 shortlisted name");
  await expect(page.locator("#baby-name-results .baby-name-card")).toHaveCount(1);
  expect(pageErrors).toEqual([]);
});

test("global header search is visible and searches site sections and articles", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("/");
  const headerDebug = await page.evaluate(() => ({ headerCount: document.querySelectorAll("header").length, navCount: document.querySelectorAll("header #primary-navigation").length, actionCount: document.querySelectorAll("header .marjan-header-actions").length, searchCount: document.querySelectorAll("header .nav-search").length, scriptLoaded: Array.from(document.scripts).map(s => s.src).filter(Boolean) }));
  console.log("Global header DOM", headerDebug, pageErrors);
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
  const moreButton = bar.getByRole("button", { name: "More" });
  await moreButton.click();
  await expect(moreButton).toHaveAttribute("aria-expanded", "true");
  const panel = page.locator("#marjan-bottom-more");
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link", { name: "Parenting" })).toBeVisible();
  await expect(panel.getByRole("link", { name: "Baby Names" })).toBeVisible();
  await expect(panel.getByRole("link", { name: "Products & Reviews" })).toBeVisible();
});
