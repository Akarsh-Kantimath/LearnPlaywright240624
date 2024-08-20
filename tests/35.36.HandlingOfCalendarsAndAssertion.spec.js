import {test, expect} from '@playwright/test';

test('Calender Validations', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const TopDeals = page.locator('.cart').locator('a[href="#/offers"]');

    //ChildTab handling
    const [childPage1] = await Promise.all([context.waitForEvent('page'),TopDeals.click()]);
    
    // Wait for the child tab to fully load
    await childPage1.waitForLoadState();

    // Now you can interact with the child tab
    console.log('Child tab URL:', childPage1.url());

    var date = '7';
    var modifiedDate = date;
    var monthNumber = '7';
    var modifiedMonthNumber = monthNumber;
    const year = '2022';
    
    //console.log(modifiedDate.length);
    if(date.length === 1){
        var modifiedDate = '0'+date;
    }
    //console.log(date);
    if(monthNumber.length === 1) {
        var modifiedMonthNumber = '0'+monthNumber;
    }
    //console.log(monthNumber);
    
    const concatenatedDate = year+'-'+modifiedMonthNumber+'-'+modifiedDate;
    
    

    await childPage1.locator('.react-date-picker__calendar-button').click();
    await childPage1.locator('.react-calendar__navigation__label').click();
    await childPage1.locator('.react-calendar__navigation__label').click();

    await childPage1.getByText(year).click();
    //Convert string to number in JS
    //By using Number(passThePreviouslyDeclaredString)
    await childPage1.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber) - 1).click();
    
    // Playwright's advanced selectors allow you to combine CSS selectors with text content.
    //const element = page.locator('button:has-text("Text")');

    //how to pass declared variable inside a locator method in playwright ?
    // Use the variable inside the locator method
    //const button = page.locator('text="' + buttonText + '"');

    
    await childPage1.locator('.react-calendar__month-view__days button').locator('text="' +date+ '"').nth(0).click();
    const Finaldate = await childPage1.locator('.react-date-picker__inputGroup input').nth(0).getAttribute('value');
    //console.log(Finaldate);
    await expect(Finaldate).toBe(concatenatedDate);


    //Method two - Validating the calender month/date/year
    //declaring array of const month, date, year value
    const expectedList = [monthNumber,date,year];

    const inputs = await childPage1.locator('.react-date-picker__inputGroup input');
    for(let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute('value');
        expect(value).toBe(expectedList[index]);
    }



//Handling of Child-tab in Playwright tool.
//     const { chromium } = require('playwright');

// (async () => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // Navigate to the parent page
//     await page.goto('https://example.com');

//     // Perform the action that opens a new tab (child tab)
//     const [newPage] = await Promise.all([
//         context.waitForEvent('page'), // Waits for the new tab to open
//         page.click('a[target="_blank"]'), // Click the link that opens the new tab
//     ]);

//     // Wait for the child tab to fully load
//     await newPage.waitForLoadState();

//     // Now you can interact with the child tab
//     console.log('Child tab URL:', newPage.url());

//     // Example: Interacting with the child tab
//     await newPage.click('button#someButton');
//     const text = await newPage.textContent('h1');
//     console.log('Text in child tab:', text);

//     // Close the browser
//     await browser.close();
// })();

})