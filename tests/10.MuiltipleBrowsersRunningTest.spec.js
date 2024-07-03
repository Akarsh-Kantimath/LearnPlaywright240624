//title of the page
//await page.title()

//inherit the expect assertion from the same package -@playwright/test
const {test, expect }= require('@playwright/test')

//make a habit of putting await before every line

//to run the test in multiple browser - in playwright.config.js under use : {browserName : either one can be used chromium, firefox, webkit (safari browser engine)}

test('Assertion of the page title', async({page}) => {
    await page.goto("https://google.com");
    console.log(await page.title());

    //info about playwright assertions - https://playwright.dev/docs/test-assertions
    await expect(page).toHaveTitle("Google");

})
