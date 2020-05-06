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
const firstName = "John";
const lastName = "Smith";


test.describe('test-2: User is on "My Account" Page => verify page forms ', function() {
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

   test.it(' user is on "My Account" page => verify page title, page header and welcome message ', async function() {

       await driver.getTitle().then(async function(currentTitle) {
           assert.strictEqual(currentTitle, "My account - My Store", "Error: Not correct page title for 'My Account' page ");
           //console.log('Current Page Title: ' + currentTitle);
       });

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

    test.it(' user is on "My Account" page => verify user links', async function() {

        let expectedUserLinks = ["ORDER HISTORY AND DETAILS", "MY CREDIT SLIPS", "MY ADDRESSES", "MY PERSONAL INFORMATION" , "MY WISHLISTS"]; //

        await page.userAccountPage.userAccountLinks()
            .then(function(elements){
                i = 0;
                elements.forEach(function(element){
                    element.getText().then(elem=>{
                        assert.strictEqual(elem,expectedUserLinks[i++])
                    })
                })
            });
    });

    test.it(' user is on "My Account" page => verify that upon click on "home icon" user is taken back to the main page' , async function() {

        await page.userAccountPage.iconHome().click();
        await cf.sleep(1000);

        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "My Store", "Error: Not correct page title for main page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await page.homeTabs(1)
            .getText()
            .then(function(tab) {
                assert.strictEqual(tab, "POPULAR", "Error: Main page, 'Popular' tab is not correct " );
                //console.log('Main Page, tab: ' + tab);
            });

        await page.homeTabs(2)
            .getText()
            .then(function(tab) {
                assert.strictEqual(tab, "BEST SELLERS", "Error: Main page, 'Best Sellers' tab is not correct " );
                //console.log('Main Page, tab: ' + tab);
            });

    });

    after(function(){
        driver.quit();
    });
});
