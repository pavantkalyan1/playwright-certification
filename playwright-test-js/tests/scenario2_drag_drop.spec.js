const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');

test.describe('LambdaTest Drag & Drop Sliders', () => {
  test('Drag & Drop Sliders: Drag default value 15 to 95', async ({ page }) => {
    
    await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo', { waitUntil: 'load' });
    
    
    await expect(page).toHaveURL(/drag-drop-range-sliders-demo/, { timeout: 5000 });
    console.log('URL validated: Drag & Drop Range Sliders Demo page loaded');
    
   
    await page.waitForTimeout(1500);
    
    
    const sliders = await page.$$('input[type="range"]');
    console.log(`Found ${sliders.length} sliders on the page`);
    
    
    let targetSlider = null;
    for (let slider of sliders) {
      const value = await page.evaluate(el => el.value, slider);
      if (value === '15') {
        targetSlider = slider;
        console.log(`Found slider with default value 15`);
        break;
      }
    }
    
    if (targetSlider) {
      
      const box = await targetSlider.boundingBox();
      
      if (box) {
        const currentValue = await page.evaluate(el => el.value, targetSlider);
        console.log(`Default slider value: ${currentValue}`);
        
        
        const startX = box.x + (box.width * (parseInt(currentValue) / 100));
        const endX = box.x + (box.width * 0.93); 
        const centerY = box.y + box.height / 2;
        
        console.log(`Dragging slider from value ${currentValue} to 95`);
        
       
        await page.mouse.move(startX, centerY);
        await page.mouse.down();
        await page.mouse.move(endX, centerY, { steps: 20 });
        await page.mouse.up();
        
        console.log('Slider drag operation completed');
      }
    } else {
      console.log('Slider element loaded on page');
    }
    
    
    await page.waitForTimeout(1000);
    
    
    const allSliders = await page.$$('input[type="range"]');
    let verifiedValue = null;
    
    for (let slider of allSliders) {
      const value = await page.evaluate(el => el.value, slider);
      
      if (parseInt(value) >= 90 && parseInt(value) <= 100) {
        
        verifiedValue = value;
        break;
      }
    }
    
    console.log(`Slider value after drag: ${verifiedValue}`);
    

    const value = parseInt(verifiedValue || 0);
    expect(value).toBe(95);
    console.log(`Assertion passed: Default value 15 slider successfully dragged to exactly 95`);
    
    
    await expect(page).toHaveURL(/drag-drop-range-sliders-demo/);
    console.log('Test Scenario 2 Passed: Drag & Drop Sliders test completed successfully');
  });
});
