const { clickElement, clickElementXPath } = require("./commands.js");

module.exports = {
    reservationOneOrTwoTikets: async function(page, selector1, selector2, selector3, selector4 ) {
      try {
        await clickElement(page, selector1);
        await clickElement(page, selector2);
        await clickElement(page, selector3);
        await clickElement(page, selector4);
      } catch (error) {
        throw new Error(`Text is not available for selector: ${ selector1, selector2, selector3, selector4}`);
      }
    },
    reservationOneOrTwoTiketsXPath: async function(page, selector1, selector2, selector3, selector4 ) {
      try {
        await clickElementXPath(page, selector1);
        await clickElement(page, selector2);
        await clickElement(page, selector3);
        await clickElementXPath(page, selector4);
      } catch (error) {
        throw new Error(`Text is not available for selector: ${ selector1, selector2, selector3, selector4}`);
      }
    }

  };