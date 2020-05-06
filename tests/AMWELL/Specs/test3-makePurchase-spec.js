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

test.describe('test-3: user should be able to make a purchase ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' user is on Main Page => click on tab "T-Shirts" => hover over and click on the image => click "Add to cart" ', async function() {

        await page.tshirtsTab().click(); // click on T-Shirts tab
        await cf.sleep(1000);
        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "T-shirts - My Store", "Error: Not correct page title for t-shirts page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await driver.executeScript("window.scrollBy(0,500)");
        await driver.actions().mouseMove(page.tshirtsPage.tshirtsProductImage()).perform();
        await page.tshirtsPage.addToCartButton().click();
        await cf.sleep(2000);
   });

    test.it(' click on "Continue Shopping" button => click on tab "Dresses" => hover over and click on the image => click "Add to cart" ', async function() {

        await page.cartProductLayerForm.continueShoppingButton().click(); // click on continue shopping button
        await cf.sleep(1000);

        await page.dressesTab().click(); // click on Dresses tab
        await cf.sleep(2000);
        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "Dresses - My Store", "Error: Not correct page title for dresses page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await driver.executeScript("window.scrollBy(0,700)");
        await driver.actions().mouseMove(page.dressesPage.dressProductImage(3)).perform(); // third dress
        await page.dressesPage.addToCartButton(3).click();
        await cf.sleep(2000);
    });

    test.it(' cart Product form => click on "Proceed to checkout" button  => "Summary" page click on "Proceed to checkout" button ', async function() {

        await page.cartProductLayerForm.proceedToCheckoutButton().click(); // click on proceed to checkout button
        await cf.sleep(1000);

        await driver.executeScript("window.scrollBy(0,700)");
        await page.cartCheckoutPage.proceedCheckoutButton().click();
    });


    // when user started shopping he didn't sign in. This step is for already registered user
    test.it(' "Sign in" page => for registered user enter email address, password => click "Sign In" => "Address" page click on "Proceed to checkout" button', async function() {

        await page.authenticationPage.registeredEmailInputBox().sendKeys(emailAddress);
        await page.authenticationPage.registeredPasswordInputBox().sendKeys(password);
        await page.authenticationPage.registeredSignInButton().click();
        await cf.sleep(1000);

        await driver.executeScript("window.scrollBy(0,700)");
        await page.cartCheckoutPage.proceedCheckoutButton().click();
    });

    test.it(' "Shipping" page => click on checkbox for "Terms of services" => click on "Proceed to checkout" button', async function() {

        await page.cartCheckoutPage.termsOfServiceLabel()
            .getText()
            .then(function(termsLabel) {
                assert.strictEqual(termsLabel, "Terms of service", "Error: 'Shipping' page no label 'Terms of service' " );
                //console.log('Shipping Page label: ' + termsLabel);
            });

        await page.cartCheckoutPage.termsCheckbox().click();
        await page.cartCheckoutPage.shippingProceedCheckoutButton().click();
    });

    test.it(' "Payment" page => click on "Pay by check" option => click on "I Confirm my order" button => verify successful message ', async function() {

        await page.cartCheckoutPage.payByCheckOption().click();
        await page.cartCheckoutPage.confirmOrderButton().click();


        await page.cartCheckoutPage.successfulMessage()
            .getText()
            .then(function(message) {
                assert.strictEqual(message, "Your order on My Store is complete.", "Error: successful message is not displayed " );
                //console.log('Order Complete Successful Message: ' + message);
            });
    });

    after(function(){
        driver.quit();
    });
});
