const { clickElement, getText } = require("./lib/commands.js");
const {  selectDay, reservationTickets } = require("./lib/commands2.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Tikets reservation tests", () => {
  test("Reservation one ticket tomorrow", async () => {
    await selectDay(page, 1);
    await reservationTickets(page, "//*[text()='19:00']", 5, [5]);
    const actual1 = await getText(page, "h2");
    await expect(actual1).toContain("Вы выбрали билеты:");
    const actual2 = await getText(page, "body > main > section > div > p:nth-child(2) > span");
    await expect(actual2).toContain("5/5");
  });
  test("Reservation two tickets on fourth day", async () => {
    await selectDay(page, 4);
    await reservationTickets(page, "//*[text()='19:00']", 1, [4, 5]);
    const actual1 = await getText(page, "h2");
    await expect(actual1).toContain("Вы выбрали билеты:");
    const actual2 = await getText(page, "body > main > section > div > p:nth-child(2) > span");
    await expect(actual2).toContain("1/4, 1/5");
  });
  test("Not reservation one ticket today  to already reserved seat", async () => {
    await selectDay(page, 0);
    await reservationTickets(page, "//*[text()='19:00']", 1, [5]);
    await clickElement(page, ".acceptin-button");
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await reservationTickets(page, "//*[text()='19:00']", 1, [5]);
    const actual = await page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    await expect(actual).toContain("true");
  });
});  