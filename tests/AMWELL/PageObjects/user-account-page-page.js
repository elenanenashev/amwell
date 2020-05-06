const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class userAccountPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= MY ACCOUNT PAGE ======= //

    pageHeader (){
        let elementXpath = '//h1[text() = "My account"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    welcomeText() {
        let elementXpath = '//h1[text() = "My account"]//following::p[1]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    headerCustomerName() {
        let elementXpath = '//div[@class="header_user_info"][1]'; // user first name and last name
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    headerSignOut() {
        let elementXpath = '//div[@class="header_user_info"][2]'; // Sign Out Button
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    userAccountLinks() {
        let elementXpath = '//ul[@class="myaccount-link-list"]//span';
        this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 5 * 1000);
        return this.driver.findElements(By.xpath(elementXpath));
    }

    selectUserAccountLink(n) {
        let elementXpath = '//ul[@class="myaccount-link-list"]//li['+n+']//a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    iconHome() {
        let elementXpath = '//i[@class="icon-home"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };


    
}

module.exports = userAccountPage;