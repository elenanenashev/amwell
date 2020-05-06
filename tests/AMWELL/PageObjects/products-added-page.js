const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class cartProductLayerForm {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= SHOPPING CART LAYER FORM ======= //


    continueShoppingButton() {
        let elementXpath = '//span[@title="Continue shopping"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    proceedToCheckoutButton() {
        let elementXpath = '//a[@title="Proceed to checkout"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

}

module.exports = cartProductLayerForm;