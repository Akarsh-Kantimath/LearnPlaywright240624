const {test,expect} = require('@playwright/test')

test('Java/JavaScript Alert popups handling and Hover over component', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.pause();
    await page.locator('#confirmbtn').click();
    //Popup other name is dialog in playwright
    //If you can't inspect a popup element then it's not a web based popup, it's a java/javascript based popup
    //There is a work around to handle the dialog

    //We can write anywhere in the script, it's not mandatory to write in sequence 
    //So, when the popup is open either you can accept it or reject it

    //Listner step
    page.on('dialog', dialog => dialog.accept()); //the accept option of the popup

    page.on('dialog', dialog=> dialog.dismiss()); //the reject option of the popup

    await page.locator('#mousehover').hover();
    await page.locator('a[href="#top"]').click();







} )