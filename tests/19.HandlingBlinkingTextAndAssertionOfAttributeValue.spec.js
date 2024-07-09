const {test, expect} = require('@playwright/test');

test('to validate blinking text', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const BlinkingText = page.locator('.blinkingText');

    //By using assertion of attribute value validation - to check whether attribute and it's value are same, we can verify the Blinking text

    await expect(BlinkingText).toHaveAttribute('class','blinkingText');

})