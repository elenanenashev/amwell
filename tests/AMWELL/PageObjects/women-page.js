const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class womenPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= WOMEN PAGE ======= //

    womenCategoryName() {
        let elementXpath = '//span[@class="category-name"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    womenCategoryContent(n) {
        let elementXpath = '//div[@class="rte"]//p['+n+']';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };
}

module.exports = womenPage;