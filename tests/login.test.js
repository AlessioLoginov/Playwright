const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { getEmail, getPass, getRandomE, getRandomPass } = require("./user");

test("Should Successful Auth", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 4000,
    devtools: false,
  });
  const page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.screenshot({ path: "screenshots/step1-opened-login-page.png" });

  await page.click('input[name="email"]');
  await page.screenshot({ path: "screenshots/step2-clicked-email.png" });

  await page.fill('input[name="email"]', getEmail());
  await page.screenshot({ path: "screenshots/step3-filled-email.png" });

  await page.click('input[name="password"]');
  await page.screenshot({ path: "screenshots/step4-clicked-password.png" });

  await page.fill('input[name="password"]', getPass());
  await page.screenshot({ path: "screenshots/step5-filled-password.png" });

  await page.click('button[data-testid="login-submit-btn"]');
  await page.screenshot({ path: "screenshots/step6-submitted-form.png" });

  //assertion
  await expect(page.url()).toBe("https://netology.ru/profile");

  await browser.close();
});

test("Should not successful auth", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 4000,
    devtools: false,
  });
  const page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.screenshot({
    path: "screenshots/negative-step1-opened-login-page.png",
  });

  await page.click('input[name="email"]');
  await page.screenshot({
    path: "screenshots/negative-step2-clicked-email.png",
  });

  await page.fill('input[name="email"]', getRandomE());
  await page.screenshot({
    path: "screenshots/negative-step3-filled-email.png",
  });

  await page.click('input[name="password"]');
  await page.screenshot({
    path: "screenshots/negative-step4-clicked-password.png",
  });

  await page.fill('input[name="password"]', getRandomPass());
  await page.screenshot({
    path: "screenshots/negative-step5-filled-password.png",
  });

  await page.click('button[data-testid="login-submit-btn"]');
  await page.screenshot({
    path: "screenshots/negative-step6-submitted-form.png",
  });

  await page.waitForSelector("text=Вы ввели неправильно логин или пароль", {
    timeout: 60000,
  });
  const errorText = await page.$("text=Вы ввели неправильно логин или пароль");
  expect(errorText).toBeTruthy();

  await browser.close();
});
