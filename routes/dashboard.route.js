var express = require("express");
var router = express.Router();
const PortfolioModel = require("../models/Portfolio.model");
const UserModel = require("../models/User.model");

//Dashboard READ
router.get("/:userId", function (req, res) {
    const userId = req.params.userId
    // console.log(userId, "USER ID HERE")
    UserModel.findById(userId).populate("portfolios") // PortfolioModel.find({_id: userId})
        .then((user) => {
            res.render("dashboard/dashboardUser", { user })
            // console.log(user, "USER HERE")
        })
        .catch((err) => console.log(err))
});

//Dashboard CREATE Portfolio
router.post("/:userId/create", function (req, res, next) {
    PortfolioModel.create(req.body)
        .then((newPortfolio) => res.json(newPortfolio))
        .catch((err) => next(err))
});

//Dashboard UPDATE Portfolio
router.patch("/:userId/update/:id", function (req, res, next) {
    PortfolioModel.findByIdAndUpdate(req.params.id, req.body)
        .then((editPortfolio) => res.json(editPortfolio))
        .catch((err) => next(err))
});

//Dashboard DELETE Portfolio
router.delete("/:userId/delete/:id", function (req, res, next) {
    PortfolioModel.findByIdAndDelete(req.params.id)
        .then((deletePortfolio) => res.json(deletePortfolio))
        .catch((err) => next(err))
});

module.exports = router;
