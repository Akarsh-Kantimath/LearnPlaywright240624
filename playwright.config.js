// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',  //testDir - test directory, in ./tests where we have written the tests
  timeout : 30 * 1000,  //30 sec added as a timeout and also global timeout - maximum time one test can run for, for any reason if the test fail to execute - it will report as a failure post 30 sec
  expect : {    //expect it's for assertions
      timeout : 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use : {  //use is a key - whatever we declare here, all the test spec can use them
    //here we write about what browser to use, when to take screenshots and many more

    browserName : 'chromium', //browser engines - chromium, firefox, webkit (safari browser engine) 

    //to run the test everytime, we use npx playwright test tests/8.filename.spec.js --headed
    //instead of giving  --headed everytime, it can configured to run in headed mode
    headless : false,

  },
  
  };

 module.exports = config; //Config object is being exported

