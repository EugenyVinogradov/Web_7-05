
module.exports = {
    clickElement: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        await page.click(selector);
      } catch (error) {
        throw new Error(`Selector is not clickable: ${selector}`);
      }
    },
    clickElementXPath: async function (page, selector) {
      try {
        await page.waitForXPath(selector);
        const element = await page.$x(selector);
        await element[0].click();
      } catch (error) {
        console.log(error);
        throw new Error(`Selector is not clickable: ${selector}`);
        
      }
    },
    getText: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        return await page.$eval(selector, (link) => link.textContent);
      } catch (error) {
        throw new Error(`Text is not available for selector: ${selector}`);
      }
    },
  };