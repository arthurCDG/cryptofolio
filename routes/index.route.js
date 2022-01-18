var express = require("express");
var router = express.Router();

// Here we have home page and news feed

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
