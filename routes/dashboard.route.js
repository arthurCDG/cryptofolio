var express = require("express");
var router = express.Router();
const PortfolioModel = require("../models/Portfolio.model");
const UserModel = require("../models/User.model");

// Dashboard READ
router.get("/", function (req, res) {
    const userId = req.session.currentUser?._id
    if (!userId) {
        res.redirect("/auth/signin")
    } else {
        // console.log(userId, "USER ID HERE")
        UserModel.findById(userId).populate("portfolios") // PortfolioModel.find({_id: userId})
            .then((user) => {
                res.render("dashboard/dashboardUser", { user })
                // console.log(user, "USER HERE")
            })
            .catch((err) => console.log(err))
    }
});

//Dashboard CREATE Portfolio
router.post("/create", async function (req, res, next) {
    try {
        const newPortfolio = await PortfolioModel.create(req.body);
        await UserModel.findByIdAndUpdate(req.session.currentUser._id, {
            $push: { portfolios: newPortfolio._id }
        })
        res.json(newPortfolio);
    } catch (err) {
        next(err)
    }
});

//Dashboard UPDATE Portfolio
router.patch("/update/:id", function (req, res, next) {
    PortfolioModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // console.log(req.body, "EDITED PORTFOLIO HERE");
        .then((portfolioEdited) => res.json(portfolioEdited))
        .catch((err) => next(err))
});

//Dashboard DELETE Portfolio
router.delete("/delete/:id", function (req, res, next) {
    PortfolioModel.findByIdAndDelete(req.params.id)
        .then((portfolioToDelete) => res.json(portfolioToDelete))
        .catch((err) => next(err))
});

module.exports = router;
