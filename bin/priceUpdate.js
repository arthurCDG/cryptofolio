require("./../config/mongodb");
const CryptoModel = require("./../models/Crypto.model");
const axios = require("axios");

function priceUpdate(cryptos) {
  return new Promise(async (resolve, reject) => {
    try {
      for (let crypto of cryptos) {
        await CryptoModel.updateOne(
          { name: crypto.name },
          { current_price: crypto.current_price },
          { new: true }
        );
      };
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function getCurrentMarket() {
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
}


module.exports = {
  getCurrentMarket,
  priceUpdate
}
