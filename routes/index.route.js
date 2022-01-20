var express = require("express");
var router = express.Router();
const axios = require("axios");
const CryptoModel = require("./../models/Crypto.model");


console.log("test");

// Here we have home page and news feed

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

router.get("/", async function (req, res, next) {
  try {
    const allNews = await axios
      .get(
        "https://cryptopanic.com/api/v1/posts/?auth_token=00b0567da59a656d0a16a62993ee998100f0e430&public=true"
      )
    const allNewsNew = allNews.data.results;
    console.log("ALL NEWS NEW ", allNewsNew);
    const allNewsShortened = allNewsNew.slice(0, 4);
    res.render("index", { allNewsShortened });
    //process.exit();
  } catch (err) {
    next(err);
  }
});



/* GET newsfeed page avec le axios call api + call db */
router.get("/newsfeed/", async function (req, res, next) {

  try {
    const allNews = await axios
      .get(
        "https://cryptopanic.com/api/v1/posts/?auth_token=00b0567da59a656d0a16a62993ee998100f0e430&public=true"
      )

    const crypto = await CryptoModel.find();
    console.log(crypto);

    res.render("newsfeed", { allNews: allNews.data.results, crypto });
    //process.exit();
  } catch (err) {
    next(err);
  }
});




/* GET newsfeed page. */
// router.get("/newsfeed/", function (req, res, next) {
//   axios
//     .get(
//       "https://cryptopanic.com/api/v1/posts/?auth_token=00b0567da59a656d0a16a62993ee998100f0e430&public=true"
//     )
//     .then((allNews) => {
//       //console.log("All news from API: ", allNews.data);
//       //allNews.data => à convertir en array JS
//       /* allNews.data.forEach((oneNews) => {
//           console.log(oneNews)
//       });*/
//       console.log("TOTOTOTOOTO");
//       // console.log("All news from API: ", allNews.data);
//       // for (let i = 0; i < allNews.data.length; i++) {
//       //   console.log("SUCCESS!");
//       // }
//       console.log("All news from API results: ", allNews.data.results);
//       for (let i = 0; i < allNews.data.results.length; i++) {
//         console.log(allNews.data.results[i])
//       }
//       res.render("newsfeed", { allNews: allNews.data.results });
//       //process.exit();
//     })
//     .catch((err) => console.log(err));
// });



/* GET a crypto scecific newsfeed page. */
router.get("/newsfeed/:symbol", async function (req, res, next) {

  try {
    const allNews = await axios
      .get(
        `https://cryptopanic.com/api/v1/posts/?auth_token=00b0567da59a656d0a16a62993ee998100f0e430&currencies=${req.params.symbol}&public=true`
      )

    // Find in Database the crypto OBJECT corresponding to the symbol

    const selectedCrypto = await CryptoModel.find({ symbol: req.params.symbol });

    const crypto = await CryptoModel.find();
    console.log(crypto);

    res.render("newsfeed", { allNews: allNews.data.results, crypto, selectedCrypto: selectedCrypto[0] });
    //process.exit();
  } catch (err) {
    next(err);
  }
});






module.exports = router;
