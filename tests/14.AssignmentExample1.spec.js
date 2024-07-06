const {test, expect} = require('@playwright/test')

test('test assignment of the shoping site', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('[routerlink="/auth/register"]').click();
    await page.locator('input#firstName').fill('Hello');
    await page.locator('input#lastName').fill('there');
    await page.locator('input#userEmail').fill('testghf abd48454654@yahoo.com');
    await page.locator('input#userMobile').fill('5433434312');
    await page.locator('input#userPassword').fill('Abcd1234#');
    await page.locator('input#confirmPassword').fill('Abcd1234#');
    await page.locator('[type="checkbox"]').click();
    await page.locator('input#login').click();
    await page.locator('.btn.btn-primary').click();
    await page.locator('input#userEmail').fill('testabd484@yahoo.com');
    await page.locator('input#userPassword').fill('Abcd1234#');
    await page.locator('[type="submit"]').click();

    //Fetch first element text
    console.log(await page.locator('h5 b').nth(0).textContent());

    //to handle all the element texts using .allTextContents() 
    //is in 15 spec file
    


});