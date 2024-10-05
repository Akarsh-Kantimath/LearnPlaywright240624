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
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data : orderPayload,
            headers : {
                'Authorization' : token,
                'content-type' : 'application/json'
            }
        }
    )
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderID  = orderResponseJson.orders[0];
     


})


test('check on login with credentails by injecting token from local stotage', async({page})=> {
    
    //addInitScript method is used to - Adds a script which would be evaluated
    await page.addInitScript(value => { // value is the argument
        window.localStorage.setItem('token', value);
    }, token);
    
    
    

     await page.goto('https://rahulshettyacademy.com/client');

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


})