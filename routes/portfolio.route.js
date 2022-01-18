var express = require("express");
var router = express.Router();
const portfolioModel = require("./../models/Portfolio.model");
const holdingModel = require("./../models/Holding.model");
const cryptoModel = require("./../models/Crypto.model");

// Display the portfolio page of each user
router.get("/:id", (req, res, next) => {
  portfolioModel
    .findById(req.params.id)
    .populate({
      path: "holdings",
      populate: {
        path: "crypto",
      },
    })
    .then((portfolio) => {
      console.log(portfolio);
      res.render("portfolio/portfolio-details", { portfolio });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
