import {test, expect} from '@playwright/test';

test('Special locator getByPlaceholder getByRole getByText One line filter', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('[name="name"]').first().fill('Abc Xyz');
    await page.locator('[name="email"]').fill('abc223abc@gmail.com');
    // .getByPlaceholder - if a input has a placeholder name then we can use this locator - placeholder attribute will be present for that input
    // <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password" xpath="1">
    await page.getByPlaceholder('Password').fill('Abcd1234#');

    // .getByRole - this locator is used find a component based on the role 
    // "alert" "alertdialog" "banner" "button" "checkbox" "document" "link" "list" "menu" "menubar"
    //below ex. is of button role and button text Submit is used
    await page.getByRole("button", {name : "Submit"}).click();

    // .getByText locator is to find the component in the page by text, any message popup with text
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole("link", {name : "Shop"}).click();

    //Applying filter, when n no. of elements is returned
    //filter(options?: { has?: Locator; hasNot?: Locator; hasNotText?: string | RegExp; hasText?: string | RegExp; }): Locator
    //This method narrows existing locator according to the options, for example filters by text. It can be chained to filter multiple times.
    //Usage
    //const rowLocator = page.locator('tr');
    // ...
    //await rowLocator.filter({ hasText: 'text in column 1' }).filter({ has: page.getByRole('button', { name: 'column 2 button' }) })


    await page.locator('app-card').filter({hasText : 'Nokia Edge'}).getByRole("button", {name : 'Add '}).click();
    await expect (page.locator('.btn-primary')).toContainText(' Checkout ( 1 )');
})