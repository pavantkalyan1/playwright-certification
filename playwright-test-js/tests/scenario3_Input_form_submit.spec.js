const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
test.describe('LambdaTest Input Form Submit', () => {
  test('Validate error and successful submission', async ({ page }) => {

    await page.goto('https://www.lambdatest.com/selenium-playground', {
      waitUntil: 'domcontentloaded'
    });

    await page.getByText('Input Form Submit').click();

    
await page.locator('form button[type="submit"]').last().click();


const nameInput = page.locator('input[name="name"]');


// const validationMessage = await nameInput.evaluate(el => el.validationMessage);
// expect(validationMessage).toContain('Please').tobe

// await playwright.expect(
//   page.locator('input[name="name"]')
// ).toBeInvalid();

const isValid = await page
  .locator('input[name="name"]')
  .evaluate(el => el.checkValidity());

expect(isValid).toBe(false);

  
    await page.fill('input[name="name"]', 'John Doe');
    await page.locator('input[name="email"]').last().fill('john@example.com');
    await page.fill('input[name="password"]', 'TestPassword123');
    await page.fill('input[name="company"]', 'TestCompany');
    await page.fill('input[name="website"]', 'https://www.example.com');

    
    await page.selectOption('select[name="country"]', 'US');

    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="address_line1"]', '123 Main Street');
    await page.fill('input[name="address_line2"]', '123 Main Street');
    await page.fill('input[id="inputState"]', 'AP');
    await page.fill('input[name="zip"]', '10001');

    await page.locator('form button[type="submit"]').last().click();

    
    await expect(
      page.getByText('Thanks for contacting us')
    ).toBeVisible();
  });
});
