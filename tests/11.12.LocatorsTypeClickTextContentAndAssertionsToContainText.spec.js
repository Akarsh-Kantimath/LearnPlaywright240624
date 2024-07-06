const {test, expect} = require ('@playwright/test')

test('To find locators and fill, type method', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect (page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    //there are two types of locator selectors playwright support
    //1. CSS selector - recommended by playwright
    //2. Xpath selector

    //CSS selectors and it's syntax
    //when id attribute is present - tagname#id or #id
    //when the class attribute is present - Tagname.class or .class
    //when attribute is present - [attribueName = 'attributeValue']

    //locator() - is used to find the attribute
    //fill() - fill method is used to input a text into textfields
    await page.locator('input#username').fill('Akarsh');
    await page.locator('[type = "password"]').fill('learning');
    await page.locator('[value="Sign In"]').click();

    //12. Extracting the text from the browser and inserting valid expect assertions in test

    //CSS selectors and it's syntax

    //when attribute is present - [attribueName = 'attributeValue'] we can enter partial attribute value by
    //giving * at the end of [attributeName* = 'partialValue']

    //To extract content from the element .textContent() is used

    console.log(await page.locator('[style*="block"]').textContent());

    //Assrtion of element textContent() - .toContainText() is used

    //toContainText() accepts the partial text as well

    //WHENEVER there's display of element partially, 
    //In playwright , we need not write explicitely to wait, playwright have the intelligence to wait automatically to show up that partial hidden locator with the config timeout seconds (timeout : 5000)
    //https://playwright.dev/docs/test-assertions
    await expect(page.locator('[style*="block"]')).toContainText('/password');

});