class APIUtils {
    //APIUtils.js it is a file of precondition data set-up.
    //create a constructor to get the apiContext
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext; //this keyword will have apiContxt value, to pass the value whole class using this.apiUtils
        this.loginPayload = loginPayload;
    }




    async getToken(){
            // 1. Login API
    
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data : this.loginPayload //global the login payload is stored in one of the variable, along with the request data is being passed as one variable
        }
    )
    

    //from the loginReponseJSON we need token parameter
    //from the site we can format and collect the required parameter from the response body https://jsonformatter.org/json-editor#google_vignette 
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data : orderPayload,
                headers : {
                    'Authorization' : response.token,
                    'content-type' : 'application/json'
                },
            }
        )
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderID  = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
    }


}
module.exports = {APIUtils}; //In order to have visibility to other class we export it.