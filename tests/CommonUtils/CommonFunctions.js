function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function closeNewTab(driver){

    await driver.getAllWindowHandles().then(async function (windowHandles) {
        await driver.switchTo().window(windowHandles[1]);
        await sleep(2000);
        await driver.close();
        await driver.switchTo().window(windowHandles[0]);
        await sleep(2000);
    });
}

async function waitForPageLoad(driver){
    await driver.wait(async function() {
        return driver.executeScript('return document.readyState').then(async function(readyState) {
            return readyState === 'complete';
        });
    });
}

module.exports.closeNewTab = closeNewTab;
module.exports.sleep = sleep;
module.exports.waitForPageLoad = waitForPageLoad;