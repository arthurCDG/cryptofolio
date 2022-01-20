var express = require("express");
var router = express.Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const protectAuthRoute = require("./../middlewares/protectAuthRoute");
const protectRoute = require("./../middlewares/protectRoute");

// Here we'll have signin and signup get/post routes

router.get("/signin", protectAuthRoute, (req, res, next) => {
  res.render("auth/signin.hbs");
});

router.get("/signup", protectAuthRoute, (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.get("/signout", protectRoute, (req, res, next) => {
  req.session.destroy((err) => res.redirect("/auth/signin"));
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject;
        req.flash("success", "Successfully logged in...");
        res.redirect("/dashboard");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };

    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/auth/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/auth/signin");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", errorMessage);
    res.redirect("/auth/signup");
  }
});

module.exports = router;
