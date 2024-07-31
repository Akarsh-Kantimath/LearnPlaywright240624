import {test, expect} from '@playwright/test';

test('getByLocator special locator', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    //.getByLabel locator works when html have label attribute
    //<label class="form-check-label" for="inlineRadio1" xpath="1">Student</label>
    //In the fornt end - click on the labels to see whether they work - for ex. clicking on the text of radio button label or label name of dropdown
    // The action must be associated with the label - then getByLabel locator works
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Student').check();
    
    //UI test runner command - npx playwright test --ui





})