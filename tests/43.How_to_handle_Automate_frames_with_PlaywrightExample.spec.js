const {test, expect} = require('@playwright/test')

test('handle & Automate frames with playwright', async({page})=> {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/#top');
    
    const elementHandle = await page.locator('#courses-iframe');
    const isVisible = await elementHandle.isVisible();
// const framePage = page.frameLocator('#courses-iframe');
  //  await framePage.locator('a[href*="lifetime-access"] : visible').click();
    });
