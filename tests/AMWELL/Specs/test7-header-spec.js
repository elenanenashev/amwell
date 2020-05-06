const assert = require('assert');
const test = require('selenium-webdriver/testing');
const amMainPage = require('../PageObjects/am-main-page');
const driverFactory = require('../../CommonUtils/DriverFactory');
const cf = require('../../CommonUtils/CommonFunctions');
const config = require('config');
const timeOut = config.get("timeOut");

let driver;
let page;

test.describe('test-7: verify header of the main page ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' main page => verify "Call us now" is displayed => verify header logo => verify "Contact us" and "Sign in" ', async function() {

        await page.callUsNow()
            .getText()
            .then(function(shopPhone) {
                assert.strictEqual(shopPhone, "Call us now: 0123-456-789", "Error: main page, not correct Shop Phone" );
                //console.log('Call us now: : ' + shopPhone);
            });

        await page.headerLogo().isDisplayed().then(function (isDisplayed) {
            assert.strictEqual(isDisplayed, true, 'Error: header logo should be disolayed');
        });

        await page.contactUs()
            .getText()
            .then(function(contactLink) {
                assert.strictEqual(contactLink, "Contact us", "Error: main page, not correct 'Contact us' link" );
                //console.log('Contact us now: ' + contactLink);
            });

        await page.signInLink()
            .getText()
            .then(function(signInLink) {
                assert.strictEqual(signInLink, "Sign in", "Error: main page, not correct 'Sign in' link" );
                //console.log('Sing in: ' + signInLink);
            });
    });

    test.it(' main page => verify search bar placeholder => verify by default "Cart is empty" (user has not shopped yet) ', async function() {

        await page.searchInputBox()
            .getAttribute('placeholder')
            .then(function(searchPlaceholder) {
                assert.strictEqual(searchPlaceholder, "Search", "Error: search placeholder is not correct");
                //console.log("Search Placeholder seen as: " + searchPlaceholder);
            });

        await page.shoppingCart()
            .getText()
            .then(function(cart) {
                assert.strictEqual(cart, "Cart (empty)", "Error: main page, not correct 'Contact us' link" );
                //console.log('Shopping cart: ' + cart);
            });

    });

    test.it(' main page => click on "Cart is empty" => verify user is take to shopping cart summary page and "Empty cart" message is displayed ', async function() {

        await page.shoppingCart().click();
        await cf.sleep(2000);

        await page.shoppingCartPage.shoppingCartHeader()
            .getText()
            .then(function(header) {
                assert.strictEqual(header, "SHOPPING-CART SUMMARY", "Error: not correct header for shopping cart page " );
                //console.log('Shopping cart header: ' + header);
            });

        await page.shoppingCartPage.shoppingCartAlertWarning()
            .getText()
            .then(function(warningMessage) {
                assert.strictEqual(warningMessage, "Your shopping cart is empty.", "Error: not correct warning message for an empty shopping cart " );
                //console.log('Shopping cart warning message: ' + warningMessage);
            });
    });


    after(function(){
        driver.quit();
    });
});
