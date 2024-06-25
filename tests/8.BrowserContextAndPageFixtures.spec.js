const {test} = require('@playwright/test')

//In general termilogy fixtures are global variable, which are available across all the spec files
// ex. of global fixtures - browser, we use them for every test annotations 
// fixtures usually come by default by playwright module
// now to invoke browser inside the function, we must send the browser as a paramter to test function first, that paremter will be passed inside the function body
// to evaluvate as a playwright fixture one must put the fixtures inside the curly braces {browser}, if it's not placed inside {} then it's recognised as a variable.

// There are four fixtures in playwright - browser, page and another two (in upcoming letures)

//browser fixture example
test('Browser context playwright test', async ({browser})=> {

    //test annotations will only come when we import the package require ('@playwright/test')

    //Create one new context - it's like creating a new instance of the variable
    //newContext() -> it helps to inject cookies by default into the browser
    //chrome - plugins/cookies
    const context = await browser.newContext();  //now browser instance is opened like incognito page
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

//page fixture example
test('page playwright test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});