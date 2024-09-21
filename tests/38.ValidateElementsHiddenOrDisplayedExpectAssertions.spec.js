const {test,expect} = require('@playwright/test')

//Lecture 38 - explains about fixture page, nameless function declaration fat operator usage ()=> , global variable declaration of test, expect and many more
//Basic fundamentals clear
test("Popup validation", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    //Browser page goBack or goForward
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect (page.locator('#displayed-text')).toBeHidden();

})