require("./../config/mongodb");
const CryptoModel = require("./../models/Crypto.model");
const axios = require("axios");

module.exports = function priceUpdate() {
  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    .then((allCrypto) => {
      // console.log("All Crypto Data: ", allCrypto.data);
      allCrypto.data.forEach((crypto) => {
        CryptoModel.updateOne(
          { name: crypto.name },
          { test: "TOTO" },
          { new: true }
          //   { current_price: crypto.current_price }
        );
      });
      console.log("SUCCESS!");
      //process.exit();
    })
    .catch((err) => console.log(err));
};
