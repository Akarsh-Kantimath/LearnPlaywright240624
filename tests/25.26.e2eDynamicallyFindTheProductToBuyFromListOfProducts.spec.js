import {test, expect} from '@playwright/test';

test('e2e', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const productName = 'IPHONE 13 PRO';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('testabc483@gmail.com');
    await page.locator('#userPassword').fill('Abcd1234#');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    const products = await page.locator('.card-body');
    const count = await products.count();
    
    for(let i = 0; i < count; i++ ) {
        //console.log(await products.nth(i).locator('b').textContent());
        if (await products.nth(i).locator('b').textContent() === productName) //chaining mechanism - products.nth(i).locator('b')
            {  
                await products.nth(i).locator('text = Add To Cart').click();  //parent to child navigation
                break;

        }
    }

    //26. Add assertions for the actions performed and implement necessary sync steps
    await page.locator('[routerlink*="cart"]').click();

    //When the button is clicked, it open up new page - There's also other type wait to have all the components of page to load using waitFor() method
    await page.locator('div li').first().waitFor();

    //Element with text and putting a assertions with isVisible()
    //Usage of Pseudo class that can be used inside a CSS selector
    //Text of an element can be searched - on top of the CSS playwright gave an option to search an locator with the visible text 
    const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible(); //isVisible() gives the boolean values
    //Assertion for boolean value
    expect(bool).toBeTruthy();

    

    await page.pause();
})