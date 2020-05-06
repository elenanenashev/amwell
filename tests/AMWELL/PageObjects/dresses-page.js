const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class dressesPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= DRESSES PAGE ======= //

    addToCartButton(n) {
        let elementXpath = '//*[@id="center_column"]/ul/li['+n+']/div/div[2]/div[2]/a[1]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    dressProductImage(n) {
        let elementXpath = '//*[@id="center_column"]/ul/li['+n+']/div/div[1]/div';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    dressesCategoryName() {
        let elementXpath = '//span[@class="category-name"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    dressesCategoryContent(n) {
        let elementXpath = '//div[@class="rte"]//p['+n+']';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

}

module.exports = dressesPage;