const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class shoppingCartPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= SHOPPING CART PAGES ======= //


    proceedCheckoutButton() {
        let elementXpath = '//span[text()="Proceed to checkout"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    shippingProceedCheckoutButton() {
        let elementXpath = '//*[@id="form"]/p/button';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    termsOfServiceLabel() {
        let elementXpath = '//p[text()="Terms of service"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    termsCheckbox() {
        let elementXpath = '//input[@id="cgv"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    payByCheckOption() {
        let elementXpath = '//a[@title="Pay by check."]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    confirmOrderButton() {
        let elementXpath = '//span[text()="I confirm my order"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    successfulMessage() {
        let elementXpath = '//p[@class="alert alert-success"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    shoppingCartHeader() {
        let elementXpath = '//h1[@id="cart_title"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    shoppingCartAlertWarning() {
        let elementXpath = '//p[@class="alert alert-warning"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };


}

module.exports = shoppingCartPage;