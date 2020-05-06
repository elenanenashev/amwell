const assert = require('assert');
const test = require('selenium-webdriver/testing');
const amMainPage = require('../PageObjects/am-main-page');
const driverFactory = require('../../CommonUtils/DriverFactory');
const cf = require('../../CommonUtils/CommonFunctions');
const config = require('config');
const timeOut = config.get("timeOut");

let driver;
let page;

const emailAddress = "05061123@test.com";

// this case is for already registered user; user forgot the password
test.describe('test-6: verify forgot your password form ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' main page => click on "Sign In" link => "Already Registered" form: enter email => click "Forgot your password?" link ', async function() {

        await page.signInLink().click(); // header bar click on Sign In
        await cf.sleep(1000);

        await page.authenticationPage.registeredEmailInputBox().sendKeys(emailAddress);
        await page.authenticationPage.registeredForgotPasswordLink().click();
     });

   test.it(' "Forgot Password" page => verify page title, page header, text and "Retrieve Password" button ', async function() {

       await driver.getTitle().then(async function(currentTitle) {
           assert.strictEqual(currentTitle, "Forgot your password - My Store", "Error: Not correct page title for forgot password page ");
           //console.log('Current Page Title: ' + currentTitle);
       });

       await page.authenticationPage.forgotPasswordHeader()
           .getText()
           .then(function(header) {
               assert.strictEqual(header, "FORGOT YOUR PASSWORD?", "Error: not correct header for 'Forgot your password' page " );
               //console.log('Forgot your password page header: ' + header);
           });

       await page.authenticationPage.forgotPasswordText()
           .getText()
           .then(function(passwordText) {
               assert.strictEqual(passwordText, "Please enter the email address you used to register. We will then send you a new password.", "Error: not correct password text for 'Forgot your password' page" );
               //console.log('Forgot your password page text: ' + passwordText);
           });

       await page.authenticationPage.retrievePasswordButton()
           .getText()
           .then(function(button) {
               assert.strictEqual(button, "Retrieve Password", "Error: 'Forgot your password' page 'Retrieve password' button is not correct " );
               //console.log('Forgot your password button: ' + button);
           });
   });

   test.it(' "Forgot Password" page => enter valid email and click on "Retrieve Password" => verify success message is displayed', async function() {

       await page.authenticationPage.registeredEmailInputBox().sendKeys(emailAddress);
       await page.authenticationPage.retrievePasswordButton().click();


       await page.authenticationPage.retrievePasswordAlertSuccess()
           .getText()
           .then(function(message) {
               assert.strictEqual(message, "A confirmation email has been sent to your address: 05061123@test.com", "Error: alert success message is not correct " );
               //console.log('Alert Success message: ' + message);
           });
   });

    after(function(){
        driver.quit();
    });
});
