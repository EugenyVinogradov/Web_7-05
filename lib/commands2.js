const { clickElement, clickElementXPath } = require("./commands.js");

module.exports = {
    selectDay: async function(page, dayNumber ) {
      try {
        const day = 1 + dayNumber;
        await clickElement(page, `body > nav > a:nth-child(${day})`);
      } catch (error) {
        throw new Error(`the day ${ day} is not available for booking`);
      }
    },
    reservationTickets: async function(page, time, row, seats) {
      await clickElementXPath(page, time);
      for (let seat of seats) {
        await clickElement(page, `div:nth-child(${row}) > span:nth-child(${seat})`);
      };
      await clickElementXPath(page, `//*[text()="Забронировать"]`);
    }

  };