const {test} = require('@playwright/test');

test('Handling of Hidden elements and browser forward and backward page navigation', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/#/practice-page');
    await page.goto('https://google.com');
    await page.goBack(); //It will navigate back to the previous page - rahul shetty practice page
    await page.goForward(); //It will navigate, once agin to google.com
    await page.goBack();

    //To run the tests in debug mode
    //npx playwright test tests/38.test.spec.js --headed --debug
    // In the playwright inspector, click on forward arrow/StepOver(F10 key)
    
})