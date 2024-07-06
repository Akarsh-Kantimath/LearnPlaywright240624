//How to handle all the element texts in a page using .allTextContents() wothout using .nth(0) .first() .last()

const {test, expect} = require ('@playwright/test')

test ('Techniques of Wait dynamically for new page in service base app where API call request happen', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('input#userEmail').fill('testabc483@gmail.com');
    await page.locator('input#userPassword').fill('Abcd1234#');
    await page.locator('[type="submit"]').click();

    //fetch all the product title in the shopping site
    //Solution 1 : 
    // await page.waitForLoadState('networkidle'); //It waits for complete page to load with API service call request
    // const allTitle = await page.locator('h5 b').allTextContents();
    // console.log(allTitle);

    //Solution 2 : why ? because sometimes solution 1 can be flaky 
    //so, instead of 'networkidle' 
    //We simply call the locator and ask to .waitFor()
    //either call the .first() or .last() all the element text and ask to .waitFor() and then print all the webElement Texts

    await page.locator('h5 b').last().waitFor()
    const allTitle = await page.locator('h5 b').allTextContents();
    console.log(allTitle);

});