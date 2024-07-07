const {test, expect} = require ('@playwright/test')

test ('To handle radio button, web based popup and static select dropdown', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //for radio button just click action is performed
    await page.locator('span.checkmark').last().click();

    //Assertion of radio button 
    await expect(page.locator('span.checkmark').last()).toBeChecked();

    //To print in the console wheteher the radio button is checked or not using boolen value True/False
    console.log(await page.locator('span.checkmark').last().isChecked());

    //web based popup handling 
    await page.locator('#okayBtn').click();

    //to handle static select dropdown - 
    //1. find the locator of dropdown select
    //2. use .selectOption to select the option from dropdown - here pass the attribute value to select option from dropdown
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');

    //page.pause() - this method call is for playwright inspector to pause the page for debugging
    await page.pause();


})