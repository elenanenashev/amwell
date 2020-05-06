const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class authenticationPage {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= CREATE AN ACCOUNT FORM ======= //

    createAccountHeader (){
        let elementXpath = '//h3[text() = "Create an account"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    createAccountEnterEmailText() {
        let elementXpath = '//h3[text() = "Create an account"]//following::p[1]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    createAccountEmailLabel() {
        let elementXpath = '//h3[text() = "Create an account"]//following::label[1]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    createAccountEmailInputBox() {
        let elementXpath = '//*[@id="email_create"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    createAccountCreateButton() {
        let elementXpath = '//*[@id="SubmitCreate"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };


    // ======= ALREADY REGISTERED? FORM ======= //

    registeredEmailInputBox() {
        let elementXpath = '//*[@id="email"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    registeredPasswordInputBox() {
        let elementXpath = '//*[@id="passwd"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    registeredSignInButton() {
        let elementXpath = '//*[@id="SubmitLogin"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    registeredForgotPasswordLink() {
        let elementXpath = '//a[text() = "Forgot your password?"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };


// ======= FORGOT YOUR PASSWORD? FORM ======= //

    forgotPasswordHeader() {
        let elementXpath = '//h1[text() = "Forgot your password?"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    forgotPasswordText() {
        let elementXpath = '//*[@id="center_column"]/div/p';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    retrievePasswordButton() {
        let elementXpath = '//*[@id="form_forgotpassword"]/fieldset/p/button';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    retrievePasswordAlertSuccess() {
        let elementXpath = '//p[@class="alert alert-success"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };
}

module.exports = authenticationPage;