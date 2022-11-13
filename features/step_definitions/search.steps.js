
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, clickElementXPath, getText } = require("../../lib/commands.js");
const { reservationOneOrTwoTikets, reservationOneOrTwoTiketsXPath } = require("../../lib/commands2.js");


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
Given("user is on {string} page", { timeout: 30000}, async function (string) {
    return await this.page.goto(`${string}`);
  });
  
  When("user books a ticket for the session tomorrow at {string}, seat {string} in the {string} st row", 
    { timeout: 15000}, async function (string1, string2, string3) {
      await clickElement(this.page, "body > nav > a:nth-child(2)");
      await reservationOneOrTwoTiketsXPath(this.page, `//*[text()='${string1}']`, 
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string3}) > span:nth-child(${string2})`, 
      "body > main > section > div.buying__info > div > h2",
      "//*[text()='Забронировать']");
    });
  
  Then("user sees the inscription {string} and sees the reserved seat {string} in the row {string}", async function (string1, string2, string3) {
    const actual1 = await getText(this.page, ".ticket__check-title");
    const expected1 = await string1;
    expect(actual1).contains(expected1);
    const seats = await getText(this.page, "body > main > section > div > p:nth-child(2) > span");
    const actual2 = await seats.split("/")[0];
    const expected2 = await string3;
    expect(actual2).equal(expected2);
    const actual3 = await seats.split("/")[1];;
    const expected3 = await string2;
    expect(actual3).contains(expected3);
  });

  When("user books two tickets for the session on {string} day at {string}, seats {string} and {string} in the {string} st row",
    { timeout: 15000}, async function (string1, string2, string3, string4, string5) {
      await clickElement(this.page, `body > nav > a:nth-child(${string1})`);
      await reservationOneOrTwoTiketsXPath(this.page, `//*[text()='${string2}']`, 
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string5}) > span:nth-child(${string3})`, 
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string5}) > span:nth-child(${string4})`,
      "//*[text()='Забронировать']");
    });

    Then("user sees the inscription {string} and sees the reserved seat {string} and {string} in the row {string}", async function (string1, string2, string3, string4) {
      const actual1 = await getText(this.page, ".ticket__check-title");
      const expected1 = await string1;
      expect(actual1).contains(expected1);
      const seats = await getText(this.page, "body > main > section > div > p:nth-child(2) > span");
      const actual2 = await seats.split(",")[0].split("/")[0];
      const expected2 = await string4;
      expect(actual2).equal(expected2);
      const actual3 = await seats.split(",")[0].split("/")[1];
      const expected3 = await string2;
      expect(actual3).contains(expected3);
      const actual4 = await seats.split(",")[1].split("/")[0].trim();
      const expected4 = await string4;
      expect(actual4).equal(expected4);
      const actual5 = await seats.split(",")[1].split("/")[1];
      const expected5 = await string3;
      expect(actual5).contains(expected5);
    });

    When("user books a ticket for the session tomorrow at {string}, seat {string} in the {string} st row, and this seat is already reserved", 
    { timeout: 15000}, async function (string1, string2, string3) {
      await clickElement(this.page, "body > nav > a:nth-child(2)");
      await reservationOneOrTwoTiketsXPath(this.page, `//*[text()='${string1}']`, 
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string3}) > span:nth-child(${string2})`, 
      "body > main > section > div.buying__info > div > h2",
      "//*[text()='Забронировать']");
      await clickElement(this.page, ".acceptin-button");
      await this.page.goto("http://qamid.tmweb.ru/client/index.php");
      await clickElement(this.page, "body > nav > a:nth-child(2)");
      await reservationOneOrTwoTiketsXPath(this.page, `//*[text()='${string1}']`, 
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string3}) > span:nth-child(${string2})`, 
      "body > main > section > div.buying__info > div > h2",
      "//*[text()='Забронировать']");
    });

    Then("user sees that the resrvation button is inactive", async function() {
      const actual = await this.page.$eval("button.acceptin-button", (link) => link.getAttribute("disabled"));
      await expect(actual).contain("true");
    });