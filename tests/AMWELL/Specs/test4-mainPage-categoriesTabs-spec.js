const assert = require('assert');
const test = require('selenium-webdriver/testing');
const amMainPage = require('../PageObjects/am-main-page');
const driverFactory = require('../../CommonUtils/DriverFactory');
const cf = require('../../CommonUtils/CommonFunctions');
const config = require('config');
const timeOut = config.get("timeOut");

let driver;
let page;


test.describe('test-4: verify main page categories tabs "Women", "Dresses", "T-Shirts"; verify each tab can be clicked and correct pages displayed ', function() {
    this.timeout(timeOut);

    test.it(" get on automation practice main page ", async function(){

        this.timeout(timeOut);
        this.retries(config.get("retries"));

        driver = driverFactory.getDriver();
        page = new amMainPage(driver);
        await page.mainPage();
    });

    test.it(' main Page => verify 3 categories tabs are displayed ', async function() {

        await page.womenTab()
            .getText()
            .then(function(tab1) {
                assert.strictEqual(tab1, "WOMEN", "Error: main page 'WOMEN' tab is not correct ");
                //console.log('Main page tab: ' + tab1);
            });

        await page.dressesTab()
            .getText()
            .then(function(tab2) {
                assert.strictEqual(tab2, "DRESSES", "Error: main page 'DRESSES' tab is not correct ");
                //console.log('Main page tab: ' + tab2);
            });

        await page.tshirtsTab()
            .getText()
            .then(function(tab3) {
                assert.strictEqual(tab3, "T-SHIRTS", "Error: main page 'T-SHIRTS' tab is not correct ");
                //console.log('Main page tab: ' + tab3);
            });
    });

    test.it(' click on "WOMEN" tab and verify correct page is opened' , async function() {

        await page.womenTab().click(); // click on women tab
        await cf.sleep(2000);
        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "Women - My Store", "Error: Not correct page title for women page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await page.womenPage.womenCategoryName()
            .getText()
            .then(function(category) {
                assert.strictEqual(category, "Women", "Error: women page does not show 'Women' as category name ");
                //console.log('Women Page category name: ' + category);
            });

        await page.womenPage.womenCategoryContent(1)
            .getText()
            .then(function(text1) {
                assert.strictEqual(text1, "You will find here all woman fashion collections.", "Error: women page does not show correct text in 'Women' category ");
                //console.log('Women Page category text1: ' + text1);
            });

        await page.womenPage.womenCategoryContent(2)
            .getText()
            .then(function(text2) {
                assert.strictEqual(text2, "This category includes all the basics of your wardrobe and much more:", "Error: women page does not show correct text in 'Women' category ");
                //console.log('Women Page category text2: ' + text2);
            });

        await page.womenPage.womenCategoryContent(3)
            .getText()
            .then(function(text3) {
                assert.strictEqual(text3, "shoes, accessories, printed t-shirts, feminine dresses, women's jeans!", "Error: women page does not show correct text in 'Women' category ");
                //console.log('Women Page category text3: ' + text3);
            });
    });

    test.it(' click on "DRESSES" tab and verify correct page is opened' , async function() {

        await page.dressesTab().click(); // click on dresses tab
        await cf.sleep(2000);
        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "Dresses - My Store", "Error: Not correct page title for dresses page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await page.dressesPage.dressesCategoryName()
            .getText()
            .then(function(category) {
                assert.strictEqual(category, "Dresses", "Error: dresses page does not show 'Dresses' as category name ");
                //console.log('Dresses Page category name: ' + category);
            });

        await page.dressesPage.dressesCategoryContent(1)
            .getText()
            .then(function(text1) {
                assert.strictEqual(text1, "Find your favorites dresses from our wide choice of evening, casual or summer dresses!", "Error: dresses page does not show correct text in 'Dresses' category ");
                //console.log('Dresses Page category text1: ' + text1);
            });

        await page.dressesPage.dressesCategoryContent(2)
            .getText()
            .then(function(text2) {
                assert.strictEqual(text2, "We offer dresses for every day, every style and every occasion.", "Error: dresses page does not show correct text in 'Dresses' category ");
                //console.log('Dresses Page category text2: ' + text2);
            });
    });

    test.it(' click on "T-SHIRTS" tab and verify correct page is opened' , async function() {

        await page.tshirtsTab().click(); // click on t-shirts tab
        await cf.sleep(2000);
        await driver.getTitle().then(async function(currentTitle) {
            assert.strictEqual(currentTitle, "T-shirts - My Store", "Error: Not correct page title for t-shirts page ");
            //console.log('Current Page Title: ' + currentTitle);
        });

        await page.tshirtsPage.tshirtsCategoryName()
            .getText()
            .then(function(category) {
                assert.strictEqual(category, "T-shirts", "Error: t-shirts page does not show 'T-shirts' as category name ");
                //console.log('T-shirts Page category name: ' + category);
            });

        await page.tshirtsPage.tshirtsCategoryContent(1)
            .getText()
            .then(function(text1) {
                assert.strictEqual(text1, "The must have of your wardrobe, take a look at our different colors,", "Error: t-shirts page does not show correct text in 'T-shirts' category ");
                //console.log('T-shirts Page category text1: ' + text1);
            });

        await page.tshirtsPage.tshirtsCategoryContent(2)
            .getText()
            .then(function(text2) {
                assert.strictEqual(text2, "shapes and style of our collection!", "Error: t-shirts page does not show correct text in 'T-shirts' category ");
                //console.log('T-shirts Page category text2: ' + text2);
            });
    });

    after(function(){
        driver.quit();
    });
});
