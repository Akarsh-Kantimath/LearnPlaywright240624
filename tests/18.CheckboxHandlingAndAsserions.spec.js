const {test, expect } = require('@playwright/test');
const { Console } = require('console');

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


})