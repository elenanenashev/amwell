const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class tshirtsPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= T-SHIRTS PAGE ======= //


    addToCartButton() {
        //let elementXpath = '//button[@name="Submit"]';
        let elementXpath = '//*[@id="center_column"]/ul/li/div/div[2]/div[2]/a[1]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    tshirtsProductImage() {
        let elementXpath = '//*[@id="center_column"]/ul/li/div/div[1]/div';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    tshirtsCategoryName() {
        let elementXpath = '//span[@class="category-name"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    tshirtsCategoryContent(n) {
        let elementXpath = '//div[@class="rte"]//p['+n+']';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

}

module.exports = tshirtsPage;