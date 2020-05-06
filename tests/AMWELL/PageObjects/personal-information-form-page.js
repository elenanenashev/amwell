const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const config = require('config');

require('log-timestamp');

class personalInformationForm {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
        this.explicitWaitMS = config.get("explicitWaitMS");
    };

    // ======= PERSONAL INFORMATION FORM ======= //

    formHeader (){
        let elementXpath = '//h3[text() = "Your personal information"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    firstNameInputBox() {
        let elementXpath = '//*[@id="customer_firstname"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    lastNameInputBox() {
        let elementXpath = '//*[@id="customer_lastname"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    emailInputBox() {
        let elementXpath = '//*[@id="email"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    passwordInputBox() {
        let elementXpath = '//*[@id="passwd"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    address1InputBox() {
        let elementXpath = '//*[@id="address1"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    cityInputBox() {
        let elementXpath = '//*[@id="city"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    stateDropdown() {
        let elementXpath = '//*[@id="uniform-id_state"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    stateSelect(state){
        let elementXpath = "//*[@id='id_state']/option[text()= '"+state+"']";
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    zipCodeInputBox() {
        let elementXpath = '//*[@id="postcode"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    mobilePhoneInputBox() {
        let elementXpath = '//*[@id="phone_mobile"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    aliasAddressInputBox() {
        let elementXpath = '//*[@id="alias"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    registerButton() {
        let elementXpath = '//*[@id="submitAccount"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    socialTitleCheckboxMr() {
        let elementXpath = '//label[text() = "Social title"]//following::div[@id="uniform-id_gender1"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    socialTitleCheckboxMrs() {
        let elementXpath = '//label[text() = "Social title"]//following::div[@id="uniform-id_gender2"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    dayBirthDropdown() {
        let elementXpath = '//*[@id="uniform-days"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    dayBirthSelect(day){
        let elementXpath = '//*[@id="days"]/option['+day+']'; // option value[0]=1 day; option value[1]=2 day, etc...
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    monthBirthDropdown() {
        let elementXpath = '//*[@id="uniform-months"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    monthBirthSelect(month){
        let elementXpath = '//*[@id="months"]/option['+month+']'; // option value[0]=1 month January; option value[1]=2 month February, etc...
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    yearBirthDropdown() {
        let elementXpath = '//*[@id="uniform-years"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    yearBirthSelect(year){
        let elementXpath = '//*[@id="years"]/option['+year+']'; // option value[0]=1 month January; option value[1]=2 month February, etc...
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    saveButton() {
        let elementXpath = '//span[text()="Save"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    currentPasswordInputBox() {
        let elementXpath = '//*[@id="old_passwd"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    alertErrorMessage1() {
        let elementXpath = '//div[@class="alert alert-danger"]//p';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    alertErrorMessage2() {
        let elementXpath = '//div[@class="alert alert-danger"]//ol//li';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

    alertSuccessMessage() {
        let elementXpath = '//p[@class="alert alert-success"]';
        return this.driver.wait(until.elementLocated(By.xpath(elementXpath)), 10 * 1000);
    };

}

module.exports = personalInformationForm;