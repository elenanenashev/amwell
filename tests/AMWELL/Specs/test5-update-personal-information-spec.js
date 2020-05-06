const assert = require('assert');
const test = require('selenium-webdriver/testing');
const amMainPage = require('../PageObjects/am-main-page');
const driverFactory = require('../../CommonUtils/DriverFactory');
const cf = require('../../CommonUtils/CommonFunctions');
const config = require('config');
const timeOut = config.get("timeOut");

let driver;
let page;

const emailAddress = "05051405@test.com";
const password = "qatest";
const day = '15'; // option value[0]=1 day; option value[1]=2 day, etc...value[15] is day 14
const month = '11'; // option value[0]=1 month January; option value[1]=2 month February, etc...value[11] is October
const year = '22'; // option value[0]=2020; option value[1]=2019, etc...value[22] is 2020 year

// this case is for already registered user; updating personal information: adding Social title and Date of Birth
test.describe('test-5: user can update personal information ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' click on "Sign In" button => "Already Registered" form: enter email and password, click "Sign In" button ', async function() {

        await page.signInButton().click(); // click on Sign In button
        await cf.sleep(1000);

        await page.authenticationPage.registeredEmailInputBox().sendKeys(emailAddress);
        await page.authenticationPage.registeredPasswordInputBox().sendKeys(password);
        await page.authenticationPage.registeredSignInButton().click();
        await cf.sleep(1000);

   });

   test.it(' "My Account" page => click on "My Personal Information" option => select "Mr." radio-box for Social Title => enter Date of Birth', async function() {

       await page.userAccountPage.selectUserAccountLink(4).click();
       await page.personalInformationForm.socialTitleCheckboxMr().click();
       await driver.executeScript("window.scrollBy(0,500)");

       await page.personalInformationForm.dayBirthSelect(day).click();
       await page.personalInformationForm.dayBirthDropdown().click();

       await page.personalInformationForm.monthBirthSelect(month).click();
       await page.personalInformationForm.monthBirthDropdown().click();

       await page.personalInformationForm.yearBirthSelect(year).click();
       await page.personalInformationForm.yearBirthDropdown().click();
   });

   test.it(' verify if current password is not entered user information can not be saved and error message displayed', async function() {

       await page.personalInformationForm.saveButton().click();

       await page.personalInformationForm.alertErrorMessage1()
           .getText()
           .then(function(message1) {
               assert.strictEqual(message1, "There is 1 error", "Error: alert error message is not correct " );
               //console.log('Alert Error message1: ' + message1);
           });

       await page.personalInformationForm.alertErrorMessage2()
           .getText()
           .then(function(message2) {
               assert.strictEqual(message2, "The password you entered is incorrect.", "Error: alert error message is not correct " );
               //console.log('Alert Error message2: ' + message2);
           });
   });

    test.it(' enter current password => click "Save" => verify success message is displayed ', async function() {

        await page.personalInformationForm.currentPasswordInputBox().sendKeys(password);
        await page.personalInformationForm.saveButton().click();

        await page.personalInformationForm.alertSuccessMessage()
            .getText()
            .then(function(message) {
                assert.strictEqual(message, "Your personal information has been successfully updated.", "Error: alert success message is not correct " );
                //console.log('Alert Success message: ' + message);
            });
    });

    after(function(){
        driver.quit();
    });
});
