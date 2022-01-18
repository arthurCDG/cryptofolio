var express = require("express");
var router = express.Router();
const PortfolioModel = require("../models/Portfolio.model");
const UserModel = require("../models/User.model");

//Dashboard READ
router.get("/:userId", function (req, res) {
    const userId = req.params.userId
    console.log(userId, "USER ID HERE")
    UserModel.findById(userId).populate("portfolios") // PortfolioModel.find({_id: userId})
        .then((user) => {
            res.render("dashboard/dashboardUser", { user })
            console.log(user, "USER HERE")
        })
        .catch((err) => console.log(err))
})

//Dashboard CREATE Portfolio
router.post("/:userId", function (req, res, next) {
    PortfolioModel.create(req.body)
        .then((newPortfolio) => res.json(newPortfolio))
        .catch(next)
});

module.exports = router;
