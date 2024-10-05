//45. Playwright request method to make API calls and grab response - Example
//46. Parsing API response & passing token to browser local storage with Playwright

//request is added a part of API web testing library
const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('./Utils/APIUtils');

const loginPayload = {userEmail:"testabc483@gmail.com",userPassword:"Abcd1234#"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]};
let token ;
let orderID;


//Test annotations .beforeAll() and .beforeEach()

//.beforeAll() method is used to execute the test before all test starts
let response;
test.beforeAll(async()=>{

    //1. Login API
    //similar to the browser context creation API context request is created
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);


    // 2. Order number collecting API 
    
     


})


test('check on login with credentails by injecting token from local stotage', async({page})=> {
    // const APIUtils = new APIUtils(apiContext, loginPayload); //created a object for class APIUtils.js
    // const orderID = createOrder(orderPayload)
    
    
    //addInitScript method is used to - Adds a script which would be evaluated
    await page.addInitScript(value => { // value is the argument
        window.localStorage.setItem('token', value);
    }, response.token);
    
    
    

     await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr');

    for(let i = 0; i <= await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(response.orderID.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    await page.locator('.email-wrapper').waitFor();
    const OrderIdSummary = await page.locator('.col-text').textContent();
    await page.pause();
    expect (response.orderID.includes(OrderIdSummary)).toBeTruthy();
    const emailIdSummary = await page.locator('div[class="address"] p').nth(0).textContent();


})