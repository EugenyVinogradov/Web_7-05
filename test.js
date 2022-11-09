const { clickElement, getText } = require("./lib/commands.js");
const { reservationOneOrTwoTikets } = require("./lib/commands2.js");
const puppeteer = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Tikets reservation tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });
  test("Reservation one tiket today", async () => {
    await reservationOneOrTwoTikets(page, "[data-seance-id='129']", 
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(5)", 
      "body > main > section > div.buying__info > div > h2",
      ".acceptin-button");
    const actual1 = await getText(page, "h2");
    await expect(actual1).toContain("Вы выбрали билеты:");
    const actual2 = await getText(page, "body > main > section > div > p:nth-child(2) > span");
    await expect(actual2).toContain("1/5");
  });
  test("Reservation two tikets on fourth day", async () => {
    await clickElement(page, "body > nav > a:nth-child(4)");
    await reservationOneOrTwoTikets(page, "[data-seance-id='94']", 
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(4)", 
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(5)",
    ".acceptin-button");
    const actual1 = await getText(page, "h2");
    await expect(actual1).toContain("Вы выбрали билеты:");
    const actual2 = await getText(page, "body > main > section > div > p:nth-child(2) > span");
    await expect(actual2).toContain("1/4, 1/5");
  });
  test("Not reservation one tiket today  to already reserved seat", async () => {
    await reservationOneOrTwoTikets(page, "[data-seance-id='129']", 
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(10) > span:nth-child(5)", 
    "body > main > section > div.buying__info > div > h2",
    ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await reservationOneOrTwoTikets(page, "[data-seance-id='129']", 
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(10) > span:nth-child(5)", 
    "body > main > section > div.buying__info > div > h2",
    ".acceptin-button");
    const actual = await page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    await expect(actual).toContain("true");
    // const actual1 = getText(page, "body > main > section:nth-child(1) > div:nth-child(2) > h3");
    // await expect(page).toMatch('body > main > section:nth-child(1) > div:nth-child(2) > h3');
  });
});  