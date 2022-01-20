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

    let totalPortfolioValue = 0;

    for (let i = 0; i < portfolio.holdings.length; i++) {
      const holdingValue =
        portfolio.holdings[i].quantity *
        portfolio.holdings[i].crypto.current_price;
      totalPortfolioValue += holdingValue;
      portfolio.holdings[i].value = holdingValue;
    }

    res.render("portfolio/portfolio-details", {
      portfolio,
      totalPortfolioValue,
    });
  } catch (err) {
    console.error(err);
  }
});

// Display all the cryptos to add them
router.get("/:id/all-crypto", (req, res, next) => {
  CryptoModel.find()
    .then((allCryptos) => {
      res.render("portfolio/all-crypto", {
        crypto: allCryptos,
        portfolioId: req.params.id,
      });
    })
    .catch((err) => console.error(err));
});

// Diplay the details of one crypto
router.get("/:portfolioId/crypto/:cryptoId", async (req, res, next) => {
  try {
    const cryptoId = req.params.cryptoId;
    const portfolioId = req.params.portfolioId;
    let holding;

    const existingHolding = await HoldingModel.find({ crypto: cryptoId });

    if (existingHolding.length > 0) {
      holding = existingHolding[0];
    } else {
      const newHolding = await HoldingModel.create({
        quantity: 0,
        crypto: cryptoId,
      });

      holding = newHolding;

      await PortfolioModel.findByIdAndUpdate(portfolioId, {
        $push: { holdings: holding._id },
      });
    }

    const crypto = await CryptoModel.findById(cryptoId);

    await res.render("portfolio/crypto-details", {
      crypto,
      portfolioId,
      holding,
    });
  } catch (err) {
    next(err);
  }
});

// Update crypto holding route
router.patch("/:portfolioId/holding/:holdingId/update", (req, res, next) => {
  const { holdingId } = req.params;
  HoldingModel.findByIdAndUpdate(
    holdingId,
    {
      quantity: req.body.quantity,
    },
    { new: true }
  )
    .then((updatedHolding) => {
      res.json(updatedHolding);
    })
    .catch((err) => console.error(err));
});

// Delete crypto holding route
router.get("/:portfolioId/holding/:holdingId/delete", (req, res, next) => {
  portfolioId = req.params.portfolioId;
  HoldingModel.findByIdAndDelete(req.params.holdingId)
    .then((deletedHolding) => {
      console.log(deletedHolding);
      res.redirect(`/dashboard/portfolio/${portfolioId}`);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
