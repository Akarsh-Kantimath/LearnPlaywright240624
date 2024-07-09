const {test, expect } = require('@playwright/test');

test('Handling of checkbox and assertions to it', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#terms').click();

    //.toBeChecked() method is for checkbox checked assurtion
    await expect(page.locator('#terms')).toBeChecked();

    //to uncheck the checkbox
    await page.locator('#terms').uncheck();

    //Print a boolean value of true and false display, when checkbox is checked and unchecked respectively
    console.log(await page.locator('#terms').isChecked()); //returns false checkbox is unchecked

    //.toBeFalsy() or .toBeTruthy() assurtions are inbuilt inside the playwright to check whether returned boolean value is correct or wrong
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //On comparing with line number 11 and 17 line, 
    //In line 11 await is outside on the left extreme because action is performed 
    //while line 17 await is written inside the bracket, because we are not performing any action instead to that particular locator, we are just checking.


})