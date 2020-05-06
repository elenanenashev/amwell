const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let driver;

let chromeCapabilities=webdriver.Capabilities.chrome();
let chromeOptions = {
    args: ['--incognito', 'window-size=1600,1000']  };
let headlessChromeOptions = {
    args: ['--headless', '--incognito', 'window-size=1600,1000']  };


function getDriver(){

    if(process.env.HEADLESS==='true') {
        chromeCapabilities.set('chromeOptions', headlessChromeOptions);
    }
    else {
        chromeCapabilities.set('chromeOptions', chromeOptions);
    }

    return driver = new webdriver.Builder()
        .forBrowser("chrome")
        .withCapabilities(chromeCapabilities)
        .build();
}

module.exports.getDriver = getDriver;

