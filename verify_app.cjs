const { chromium } = require("C:/Users/ASUS/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const { pathToFileURL } = require("url");
const path = require("path");
const fs = require("fs");

(async () => {
  const outDir = "C:/Users/ASUS/.codex/visualizations/2026/08/31/01a05817-c0ad-74d0-8c5e-75358cb49191/mvp_shots";
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.route(/^https?:\/\//, (route) => route.abort());
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  const url = pathToFileURL("D:/vb相关/大学生减脂餐/index.html").href;

  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(1400);
  const imgCheck = await page.evaluate(() => {
    const imgs = [...document.images];
    return {
      total: imgs.length,
      broken: imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).length,
      firstSrc: imgs[0] ? imgs[0].currentSrc || imgs[0].src : null
    };
  });
  console.log("IMAGES", JSON.stringify(imgCheck));
  const quickBefore = await page.evaluate(() => JSON.parse(localStorage.getItem("zyx_records") || "[]").length);
  await page.click('.pick-card [data-action="record-recipe"] >> nth=0');
  await page.waitForTimeout(500);
  const quickAfter = await page.evaluate(() => JSON.parse(localStorage.getItem("zyx_records") || "[]").length);
  console.log("QUICK_RECORD", quickBefore, "->", quickAfter);
  console.log("QUICK_MODAL", await page.locator(".sheet").count());
  await page.screenshot({ path: path.join(outDir, "home.png") });

  await page.click('[data-action="tab"][data-value="recipes"]');
  await page.waitForTimeout(600);
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
  });
  await page.waitForTimeout(500);
  const recipesImgs = await page.evaluate(() => ({
    total: document.images.length,
    broken: [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).length
  }));
  console.log("RECIPES_IMAGES", JSON.stringify(recipesImgs));
  const filterLabels = await page.locator(".filter-group-label").allTextContents();
  const sourceChips = await page.locator(".filter-group", { hasText: "来源" }).locator(".chip").allTextContents();
  const calChips = await page.locator(".filter-group", { hasText: "kcal" }).locator(".chip").allTextContents();
  const priceChips = await page.locator(".filter-group", { hasText: "预算" }).locator(".chip").allTextContents();
  console.log("FILTER_LABELS", JSON.stringify(filterLabels));
  console.log("SOURCE_CHIPS", JSON.stringify(sourceChips));
  console.log("CAL_CHIPS", JSON.stringify(calChips));
  console.log("PRICE_CHIPS", JSON.stringify(priceChips));

  await page.click('[data-more="source"]');
  const sourceMore = await page.locator('[data-more-panel="source"] .chip').allTextContents();
  console.log("SOURCE_MORE", JSON.stringify(sourceMore));
  await page.click('[data-more="source"]');
  if (await page.locator('[data-more="cal"]').count()) {
    await page.click('[data-more="cal"]');
    const calMore = await page.locator('[data-more-panel="cal"] .chip').allTextContents();
    console.log("CAL_MORE", JSON.stringify(calMore));
    await page.click('[data-more="cal"]');
  } else {
    console.log("CAL_MORE none");
  }
  const recipeCount = await page.evaluate(() => RECIPES.length);
  console.log("RECIPES_COUNT", recipeCount);
  const sourceCounts = await page.evaluate(() =>
    Object.fromEntries(
      ["canteen", "takeout", "supermarket", "cook", "convenience", "bakery", "fruit", "stall", "single"].map((s) => [
        s,
        RECIPES.filter((r) => r.source === s).length
      ])
    )
  );
  console.log("SOURCE_COUNTS", JSON.stringify(sourceCounts));

  await page.click('[data-action="recipe-filter"][data-type="meal"][data-value="snack"]');
  await page.waitForTimeout(400);
  const snackLabels = await page.locator(".filter-group-label").allTextContents();
  const sceneChips = await page.locator(".filter-group", { hasText: "加餐场景" }).locator(".chip").allTextContents();
  console.log("SNACK_FILTER", JSON.stringify({ labels: snackLabels, chips: sceneChips }));
  await page.click('[data-more="snackScene"]');
  const sceneMore = await page.locator('[data-more-panel="snackScene"] .chip').allTextContents();
  console.log("SNACK_MORE", JSON.stringify(sceneMore));
  await page.click('[data-more="snackScene"]');

  await page.click('[data-more="snackScene"]');
  await page.click('[data-action="recipe-filter"][data-type="snackScene"][data-value="cardio"]');
  await page.waitForTimeout(400);
  console.log("CARDIO_COUNT", await page.locator(".recipe-card").count());

  await page.click('[data-action="recipe-filter"][data-type="meal"][data-value="all"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, "recipes.png") });

  await page.fill("#recipeSearch", "鸡胸");
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "recipes-search.png") });

  await page.click('[data-action="open-detail"]');
  await page.waitForTimeout(600);
  const detailImg = await page.evaluate(() => ({
    total: document.images.length,
    broken: [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).length
  }));
  console.log("DETAIL_IMAGES", JSON.stringify(detailImg));
  await page.screenshot({ path: path.join(outDir, "detail.png") });
  await page.click('[data-action="close-detail"]');

  await page.fill("#recipeSearch", "燕麦");
  await page.waitForTimeout(300);
  await page.click('[data-action="open-detail"]');
  await page.waitForTimeout(500);
  const tagSection = await page.locator(".detail-section", { hasText: "加餐场景" }).count();
  const tagChips = await page.locator(".detail-section", { hasText: "加餐场景" }).locator(".chip").allTextContents();
  console.log("SNACK_TAG_SECTION", tagSection);
  console.log("SNACK_TAG_CHIPS", JSON.stringify(tagChips));
  await page.click('[data-action="toggle-recipe-tag"]');
  await page.waitForTimeout(300);
  console.log("ACTIVE_TAGS", await page.locator(".detail-section", { hasText: "加餐场景" }).locator(".chip.active").count());
  await page.fill("#customTagInput", "游泳后");
  await page.click('[data-action="add-recipe-tag"]');
  await page.waitForTimeout(400);
  console.log("CUSTOM_TAG", await page.locator(".detail-section", { hasText: "加餐场景" }).locator(".chip", { hasText: "游泳后" }).count());
  await page.click('[data-action="close-detail"]');
  await page.waitForTimeout(300);
  await page.click('[data-action="recipe-filter"][data-type="meal"][data-value="snack"]');
  await page.waitForTimeout(400);
  await page.click('[data-more="snackScene"]');
  await page.click('[data-action="recipe-filter"][data-type="snackScene"][data-value="游泳后"]');
  await page.waitForTimeout(400);
  console.log("CUSTOM_FILTER_COUNT", await page.locator(".recipe-card").count());
  await page.click('[data-action="recipe-filter"][data-type="meal"][data-value="all"]');
  await page.waitForTimeout(300);

  await page.click('[data-action="tab"][data-value="records"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "records.png") });

  await page.click('[data-action="add-record"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "add-modal.png") });

  await page.click('[data-action="add-tab"][data-value="manual"]');
  await page.waitForTimeout(300);
  await page.setInputFiles("#photo-file", {
    name: "meal.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64"
    )
  });
  await page.waitForTimeout(700);
  console.log("PHOTO_PREVIEW", await page.locator(".photo-preview").count());

  await page.click('[data-action="add-tab"][data-value="estimate"]');
  await page.waitForTimeout(400);
  const foodNames = await page.locator(".food-item h5").allTextContents();
  console.log("FOOD_NAMES", JSON.stringify(foodNames.slice(0, 24)));
  await page.click('[data-action="estimate-pick"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, "estimator.png") });
  await page.click('[data-action="save-estimate-record"]');
  await page.waitForTimeout(600);
  const recPhoto = await page.evaluate(() => {
    const recs = JSON.parse(localStorage.getItem("zyx_records") || "[]");
    const last = recs[recs.length - 1];
    return last && last.photo ? last.photo.slice(0, 22) : null;
  });
  console.log("RECORD_PHOTO", recPhoto);
  const homeCal = await page.locator(".ring-inner strong").textContent();
  console.log("HOME_CAL", homeCal);
  await page.screenshot({ path: path.join(outDir, "home-after-record.png") });

  await page.click('[data-action="tab"][data-value="records"]');
  await page.waitForTimeout(400);
  await page.click('[data-action="record-subtab"][data-value="stats"]');
  await page.waitForTimeout(400);
  const statCells = await page.locator(".stat-cell b").allTextContents();
  console.log("STATS", JSON.stringify(statCells));
  await page.screenshot({ path: path.join(outDir, "stats.png") });

  await page.click('[data-action="tab"][data-value="mine"]');
  await page.waitForTimeout(400);
  const goalBefore = await page.locator(".goal-value").textContent();
  await page.click('[data-action="goal-plus"]');
  const goalAfter = await page.locator(".goal-value").textContent();
  console.log("GOAL", goalBefore.trim(), "->", goalAfter.trim());
  await page.screenshot({ path: path.join(outDir, "mine.png") });

  const page2 = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page2.route(/^https?:\/\//, (route) => route.abort());
  await page2.goto(url, { waitUntil: "load" });
  await page2.waitForTimeout(1200);
  const imgCheck2 = await page2.evaluate(() => ({
    total: document.images.length,
    broken: [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).length
  }));
  console.log("DESKTOP_IMAGES", JSON.stringify(imgCheck2));
  await page2.screenshot({ path: path.join(outDir, "desktop.png") });

  console.log("ERRORS", errors.length);
  errors.slice(0, 12).forEach((e) => console.log("ERR", e));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
