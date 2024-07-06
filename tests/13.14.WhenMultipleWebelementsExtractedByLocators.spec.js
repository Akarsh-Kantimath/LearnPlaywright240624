const {test, expect} = require ('@playwright/test')

test('How to work with locators which extract multiple webelements in page', async({page}) => {
    
    //creating locators globally
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('Akarsh');
    await passWord.fill('learning');
    await signIn.click();

    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('password.');

    //already pre-filled input we are clearing with fill("")
    await userName.fill("");
    //once again input to text field is passed
    await userName.fill('rahulshettyacademy');
    await signIn.click();

    //CSS with traversing from parent to child
    //CSS parentTagname >> childTagName
    //console.log(await page.locator('.card-title a').textContent()); - it's returning four elements

    //To get first element text, we use .nth(0) or .first()
    //To get second element text, we use .nth(1) - so on by passing the index
    //To get last element text, .last() is used
    console.log(await page.locator('.card-title a').nth(0).textContent());
    console.log(await page.locator('.card-title a').nth(1).textContent());
    console.log(await page.locator('.card-title a').last().textContent());

    //14. Understanding how mait mechanism works if list of elemets are returned
    //to get all the elements texts using .allTextContents()

    //https://playwright.dev/docs/actionability auto waiting doc
    //previously when .nth(0) element text to be displayed. It was waiting for page to load and print the value
    //when only .allTextContents() method is run by commenting nth(0) or last(), locator won't wait complete page to load instaed it will give empty arrow [] though the test will pass, saying no texts are present
    //Unlike previously we are mentioning first(), nth(0), last() - so locator finder waits for complete page to load
    const allTitles = await page.locator('.card-title a').allTextContents();
    console.log(allTitles); //[ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

});