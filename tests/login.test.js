const { test, expect } = require("@playwright/test");
const { getEmail, getPass, getRandomE, getRandomPass } = require("./user");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Should Successful Auth", async ({ page }) => {
  await page.fill('input[name="email"]', getEmail());
  await page.fill('input[name="password"]', getPass());
  await page.click('button[data-testid="login-submit-btn"]');

  // Добавим задержку перед ожиданием текста ошибки
  await page.waitForTimeout(5000);
  await expect(page.url()).toBe("https://netology.ru/profile");
});

test("Should not successful auth", async ({ page }) => {
  await page.fill('input[name="email"]', getRandomE());
  await page.fill('input[name="password"]', getRandomPass());
  await page.click('button[data-testid="login-submit-btn"]');

  // Добавим задержку перед ожиданием текста ошибки
  await page.waitForTimeout(5000);

  const errorTextSelector = "text=Вы ввели неправильно логин или пароль";
  await page.waitForSelector(errorTextSelector, { timeout: 60000 });
  const errorText = await page.$(errorTextSelector);
  expect(errorText).toBeTruthy();
});
