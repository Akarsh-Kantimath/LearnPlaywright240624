//45. Playwright request method to make API calls and grab response - Example
//46. Parsing API response & passing token to browser local storage with Playwright

//request is added a part of API web testing library
const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail:"testabc483@gmail.com",userPassword:"Abcd1234#"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]};
let token ;
let orderID;


//Test annotations .beforeAll() and .beforeEach()

//.beforeAll() method is used to execute the test before all test starts
test.beforeAll(async()=>{

    // 1. Login API
    //similar to the browser context creation API context request is created
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data : loginPayload //global the login payload is stored in one of the variable, along with the request data is being passed as one variable
        }
    )
    expect(loginResponse.ok()).toBeTruthy();

    //from the loginReponseJSON we need token parameter
    //from the site we can format and collect the required parameter from the response body https://jsonformatter.org/json-editor#google_vignette 
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    // 2. Order number collecting API 
    // const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    //     {
    //         data : orderPayload,
    //         headers : {
    //             'Authorization' : token,
    //             'content-type' : 'application/json'
    //         }
    //     }
    // )
    // const orderResponseJson = await orderResponse.json();
    // console.log
    // orderID  = orderResponseJson.orders[0];
     


})


test('check on login with credentails by injecting token from local stotage', async({page})=> {
    
    //addInitScript method is used to - Adds a script which would be evaluated
    await page.addInitScript(value => { // value is the argument
        window.localStorage.setItem('token', value);
    }, token);
    
    
    
    const productName = 'ADIDAS ORIGINAL';
    const email = 'testabc483@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client');
    //await page.locator('#userEmail').fill(email);
    //await page.locator('#userPassword').fill('Abcd1234#');
    //await page.locator('#login').click();
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
   // await page.locator('div li').first().waitFor();

    //Element with text and putting a assertions with isVisible()
    //Usage of Pseudo class that can be used inside a CSS selector
    //Text of an element can be searched - on top of the CSS playwright gave an option to search an locator with the visible text 
    const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible(); //isVisible() gives the boolean values
    //Assertion for boolean value
    //expect(bool).toBeTruthy();

    //27. Handling auto suggestive dropdown options with playwright 
    //Usage of CSS with text selector
    await page.locator('text=Checkout').click();
    await page.waitForLoadState('networkidle');
    await page.locator('[value*="4542"]').fill('1234123412341234');
    const month = page.locator('.ddl').nth(0);
    await month.selectOption('07');
    const year = page.locator('.ddl').nth(1);
    await year.selectOption('14');
    const CVV = page.locator('.small').nth(1)
    await CVV.locator('[type="text"]').fill('123');
    const NameOnCard = page.locator('.row').nth(3);
    await NameOnCard.locator('.input').fill('Akarsh K');
    await page.locator('[name="coupon"]').fill('rahulshettyacademy');
    await page.locator('[type="submit"]').click();

    await expect( page.locator('[style*=green]') ).toContainText('* Coupon Applied');

    await page.locator('[placeholder*="Country"]').pressSequentially('ind');
    const dropdown = page.locator('.list-group');
    await dropdown.waitFor();
    const country = " India";
    const optionCount = await dropdown.locator("button").count();

    for(let i = 0; i <= optionCount; i++){
        if(await dropdown.locator("button").nth(i).textContent() === country) {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //28. Complete E2E flow of placing the order and grab the orderID with playwright
    expect (page.locator('.mt-5 [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();

    expect (page.locator('h1')).toHaveText(' Thankyou for the order. ');
    const orderID = await page.locator('tr label').last().textContent();

    //30. Dynamically find the order from Order History page using PalyWright Script logic
    // Click on view button - My logic and try 
    // console.log(orderID);
    // const orderIDs =  orderID.slice(3,27);

    // await page.locator('li [routerlink*=orders]').click();
    // await page.locator('table').waitFor();

    // const rows = page.locator('tbody tr');
    // const totalRows = await page.locator('tbody tr').count();
    // //console.log(totalRows);

    // for (let i = 0; i<= totalRows; i++ ){
    //     if(await page.locator('tbody th').nth(i).textContent() === orderIDs){
    //         await page.locator('tbody td button').nth(i).click();
    //         break;
    //     }
    // }


    //Video lecture 30 
    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr');

    for(let i = 0; i <= await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderID.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    await page.locator('.email-wrapper').waitFor();
    const OrderIdSummary = await page.locator('.col-text').textContent();
    await page.pause();
    expect (orderID.includes(OrderIdSummary)).toBeTruthy();
    const emailIdSummary = await page.locator('div[class="address"] p').nth(0).textContent();
    console.log(email);
    console.log(emailIdSummary.trim());
    expect (email.includes(emailIdSummary.trim())).toBeTruthy();
    const countryNameSummary = await page.locator('div[class="address"] p').nth(1).textContent();
    console.log(country);
    console.log(countryNameSummary);
    expect (countryNameSummary.includes(country)).toBeTruthy();


    //await page.pause();

})