const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const config = require('config');
const cf = require('../../CommonUtils/CommonFunctions');
const authenticationPage = require ('./authentication-page.js');
const personalInformationForm = require ('./personal-information-form-page.js');
const userAccountPage = require ('./user-account-page-page.js');
const womenPage = require('./women-page.js');
const dressesPage = require('./dresses-page.js');
const tshirtsPage = require('./tshirts-page.js');
const cartProductLayerForm = require ('./products-added-page.js');
const shoppingCartPage = require ('./shopping-cart-page.js');
const until = webdriver.until;

require('log-timestamp');

class amMainPage {

    constructor(driver) {
        this.driver = driver;
        this.url = config.get("am-ui-url");
        this.authenticationPage = new authenticationPage(this.driver, this.url);
        this.personalInformationForm = new personalInformationForm(this.driver, this.url);
        this.userAccountPage = new userAccountPage(this.driver, this.url);
        this.womenPage = new womenPage(this.driver, this.url);
        this.dressesPage = new dressesPage(this.driver, this.url);
        this.tshirtsPage = new tshirtsPage(this.driver, this.url);
        this.cartProductLayerForm = new cartProductLayerForm(this.driver, this.url);
        this.shoppingCartPage = new shoppingCartPage(this.driver, this.url);

    };

    async mainPage() {

        try {
            await this.driver.get(this.url);
        } catch(err) {
            console.log("ERROR getting driver!!!:" + err)
        }

        await cf.waitForPageLoad(this.driver);

          try {
              await this.driver.getTitle().then(async function(currentTitle) {
                  assert(currentTitle, "My Store", "Error: Not correct page title for the main page");
                  //console.log('Current Page Title: ' + currentTitle);
              })
          } catch (err) {
              console.log("ERROR waiting on title!!!:" + err);
          }

    }

    // ======= AUTOMATION PRACTICE MAIN PAGE ======= //

    signInLink() {
        let elementXpath = '//a[@class="login"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    homeTabs(n) {
        let elementXpath = '//ul[@id="home-page-tabs"]//li['+n+']//a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    womenTab() {
        let elementXpath = '//*[@id="block_top_menu"]/ul/li[1]/a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    dressesTab() {
        let elementXpath = '//*[@id="block_top_menu"]/ul/li[2]/a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    tshirtsTab() {
        let elementXpath = '//*[@id="block_top_menu"]/ul/li[3]/a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    callUsNow() {
        let elementXpath = '//span[@class="shop-phone"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    contactUs() {
        let elementXpath = '//div[@id="contact-link"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    headerLogo() {
        let elementXpath = '//div[@id="header_logo"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    searchInputBox() {
        let elementXpath = '//input[@id="search_query_top"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }

    shoppingCart() {
        let elementXpath = '//div[@class="shopping_cart"]/a';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    }
}

module.exports = amMainPage;