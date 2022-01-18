var express = require("express");
var router = express.Router();
const axios = require("axios");

// Here we have home page and news feed

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET newsfeed page. */
router.get("/newsfeed", function (req, res, next) {
  axios
    .get(
      "https://cryptopanic.com/api/v1/posts/?auth_token=00b0567da59a656d0a16a62993ee998100f0e430&currencies=BTC,ETH&public=true"
    )
    .then((allNews) => {
      //console.log("All news from API: ", allNews.data);
      //allNews.data => à convertir en array JS
      /* allNews.data.forEach((oneNews) => {
          console.log(oneNews)
      });*/
      console.log(allNews.data.length);
      for (let i = 0; i < allNews.data.length; i++) {
        console.log("SUCCESS!");
      }
      //process.exit();
    })
    .catch((err) => console.log(err));
  res.render("newsfeed");
});



module.exports = router;
