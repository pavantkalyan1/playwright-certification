const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');

test.describe('LambdaTest Simple Form Demo - Parallel Test', () => {
  test('Simple Form Demo: Enter Message and Validate', async ({ page }) => {
    const text = "Welcome to LambdaTest";

    
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo', { waitUntil: 'domcontentloaded' });
    
    
    await page.waitForTimeout(2000);
    
    
    await expect(page).toHaveURL(/simple-form-demo/, { timeout: 10000 });
    
    
    const userMessageInput = page.locator('input[id="user-message"]');
    await userMessageInput.waitFor({state:'visible', timeout: 10000});
    await userMessageInput.fill(text);
    
    
    await page.waitForTimeout(500);
    
    
    const showInputButton = page.locator('button#showInput');
    await showInputButton.waitFor({state:'visible', timeout: 10000});
    await showInputButton.click();
    
    
    await page.waitForTimeout(1500);
    
    
    const messageElement = page.locator('p#message');
    await expect(messageElement).toHaveText(text, { timeout: 10000 });
  });
});
