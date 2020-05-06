const assert = require('assert');
const test = require('selenium-webdriver/testing');
const amMainPage = require('../PageObjects/am-main-page');
const driverFactory = require('../../CommonUtils/DriverFactory');
const cf = require('../../CommonUtils/CommonFunctions');
const config = require('config');
const timeOut = config.get("timeOut");

let driver;
let page;

function getEmail(){
    return Date.now() + "@test.com"
}

const emailAddress = getEmail(); //using timestamp to generate random email "1524379940@test.com"

const firstName = "Angie";
const lastName = "White";
const password = "$1qaTesting";
const state = "Pennsylvania";

const address = "332255 Chocolate Drive";
const city = "Hershey";
const zip = "12478";
const mobile = "784-100-4723";
const alias = "to be entered";


test.describe('test-1: verify user can create new account ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' main page => click on "Sign In" link => "Create an account" form is displayed => verify Header, Email Text, Email Address Label, Input Box and Button ', async function() {

        await page.signInLink().click(); // header bar click on Sign In
        await cf.sleep(2000);

        await page.authenticationPage.createAccountHeader()
            .getText()
            .then(function(formHeader) {
                assert.strictEqual(formHeader, "CREATE AN ACCOUNT", "Error: 'CREATE AN ACCOUNT' form, header is not correct");
                //console.log('Create an account form header: ' + formHeader);
            });

        await page.authenticationPage.createAccountEnterEmailText()
            .getText()
            .then(function(emailText) {
                assert.strictEqual(emailText, "Please enter your email address to create an account.", "Error: 'CREATE AN ACCOUNT' form, email text is not correct");
                //console.log('Create an account form email text: ' + emailText);
            });

        await page.authenticationPage.createAccountEmailLabel()
            .getText()
            .then(function(emailLabel) {
                assert.strictEqual(emailLabel, "Email address", "Error: 'CREATE AN ACCOUNT' form, email label is not correct");
                //console.log('Create an account form email label: ' + emailLabel);
            });

        await page.authenticationPage.createAccountCreateButton()
            .getText()
            .then(function(createButton) {
                assert.strictEqual(createButton, "Create an account", "Error: 'CREATE AN ACCOUNT' form, create button is not correct");
                //console.log('Create an account form button: ' + createButton);
            });
    });

   test.it(' enter valid email address and click on "Create an account" button => verify user is taken to "Personal Information" form ', async function() {

        await page.authenticationPage.createAccountEmailInputBox().sendKeys(emailAddress);
        await page.authenticationPage.createAccountCreateButton().click();
        await cf.sleep(1000);

        await page.personalInformationForm.formHeader()
            .getText()
            .then(function(formHeader) {
                assert.strictEqual(formHeader, "YOUR PERSONAL INFORMATION", "Error: 'Personal Information' form, header is not correct ");
                //console.log('Personal Information form header: ' + formHeader);
            });
   });

    test.it(' "Personal Information" form => verify that entered emailed is correct ', async function() {

        await page.personalInformationForm.emailInputBox()
            .getAttribute("value")
            .then(function(email) {
                assert.strictEqual(email, emailAddress, "Error: 'Personal Information' form, value for entered email is not correct");
                //console.log("Personal Information form, email input box shows: " + email);
            });
    });

    test.it(' "Personal Information" form => fill out all required fields => click "Register" button ', async function() {

        await page.personalInformationForm.firstNameInputBox().sendKeys(firstName);
        await page.personalInformationForm.lastNameInputBox().sendKeys(lastName);
        await page.personalInformationForm.passwordInputBox().sendKeys(password);

        await page.personalInformationForm.address1InputBox().sendKeys(address);
        await page.personalInformationForm.cityInputBox().sendKeys(city);

        await driver.actions().mouseMove(page.personalInformationForm.stateDropdown()).perform();
        await page.personalInformationForm.stateSelect(state).click();
        await page.personalInformationForm.stateDropdown().click();
        await cf.sleep(1000);

        await page.personalInformationForm.zipCodeInputBox().sendKeys(zip);
        await page.personalInformationForm.mobilePhoneInputBox().sendKeys(mobile);

        await page.personalInformationForm.aliasAddressInputBox().clear();
        await page.personalInformationForm.aliasAddressInputBox().sendKeys(alias);

        await page.personalInformationForm.registerButton().click();
        await cf.sleep(2000);
    });

   test.it(' verify if all required fields entered correctly user is registered and taken to the "My Account" page ', async function() {

       await page.userAccountPage.pageHeader()
           .getText()
           .then(function(pageHeader) {
               assert.strictEqual(pageHeader, "MY ACCOUNT", "Error: 'My Account' page, header is not correct " );
               //console.log('My Account page header: ' + pageHeader);
           });

       await page.userAccountPage.welcomeText()
           .getText()
           .then(function(welcomeText) {
               assert.strictEqual(welcomeText, "Welcome to your account. Here you can manage all of your personal information and orders.", "Error: 'My Account' page, welcome message is not correct " );
               //console.log('My Account page welcome message: ' + welcomeText);
           });

       await page.userAccountPage.headerCustomerName()
           .getText()
           .then(function(customerName) {
               assert.strictEqual(customerName, firstName + " " + lastName, "Error: 'My Account' page, header does not show correct customer name " );
               //console.log('My Account page header shows customer name as: ' + customerName);
           });
   });

    after(function(){
        driver.quit();
    });
});
