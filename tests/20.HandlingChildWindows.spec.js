const {test, expect} = require ('@playwright/test');

test('Child window handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkingText = page.locator('.blinkingText');

    //upon clicking the above locator it opens up child window
    // blinkingText.click();
   //const newPage = context.waitForEvent('page'); //context.waitForEvent() listens for any new page


   //Now the above scenario is like once we are in the new page, we are trying to search the context of it. 
   //Instead we tie both the steps together till the time they return fulfilled promise. We don't put await, we want asynchronously to execute.
   
   //3 states of promises
   //1. promise pending  2. promise rejected  3. promise fulfilled

   //When we tie these steps together by Promise.all(), making them as an array and seperated by , (comma)

   //The expectation is to return fulfilled promise
   //We will write both the steps blinkingText.click() and context.waitForEvent('page') in an array []
   const [childPage1] = await Promise.all([context.waitForEvent('page'),blinkingText.click(),]) //[childPage1, childPage2] all the promises and multiple child windows can be captured as an array []
   
   //Question - In playwright how to handle multiple steps together parallel execution asynchronously in playwright

   const supportText = await childPage1.locator('.red').textContent();
   const splitText = await supportText.split('@');
   const email = await splitText[1].split(' ');
   //console.log(email[0]);

   await page.locator('#username').fill(email[0]);
   await page.pause();

})