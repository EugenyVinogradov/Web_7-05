
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, clickElementXPath, getText } = require("../../lib/commands.js");
const { reservationOneOrTwoTikets } = require("../../lib/commands2.js");


Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
Given("user is on {string} page", async function (string) {
    return await this.page.goto(`${string}`, {
      setTimeout: 20000,
    });
  });
  
  When("user selects the time of the movie screening {string} tomorrow" , async function (string) {
    await clickElement(this.page, "body > nav > a:nth-child(2)");
    await clickElementXPath(this.page, `'//*[text()='${string}']'`);
    console.log(`'//*[text()='${string}']'`);


  });
  
  Then("user sees the course suggested {string}", async function (string) {
    const actual = await getText(this.page, "a[data-name]");
    const expected = await string;
    expect(actual).contains(expected);
  });