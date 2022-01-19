var express = require("express");
var router = express.Router();
const PortfolioModel = require("./../models/Portfolio.model");
const HoldingModel = require("./../models/Holding.model");
const CryptoModel = require("./../models/Crypto.model");
const { priceUpdate, getCurrentMarket } = require("./../bin/priceUpdate");

// Display the portfolio page of each user
router.get("/:id", async (req, res, next) => {
  try {
    const { data } = await getCurrentMarket();
    await priceUpdate(data);

    const portfolio = await PortfolioModel.findById(req.params.id).populate({
      path: "holdings",
      populate: {
        path: "crypto",
      },
    });

    const holdingValue =
      portfolio.holdings[0].quantity *
      portfolio.holdings[0].crypto.current_price;

    res.render("portfolio/portfolio-details", { portfolio, holdingValue });
  } catch (err) {
    console.error(err);
  }
});

// Display all the cryptos to add them
router.get("/:id/all-crypto", (req, res, next) => {
  CryptoModel.find()
    .then((allCryptos) => {
      res.render("portfolio/all-crypto", { crypto: allCryptos });
    })
    .catch((err) => console.error(err));
});

// router.get("/:id/crypto/:id",

module.exports = router;
