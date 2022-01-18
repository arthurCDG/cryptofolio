require("./../config/mongodb");
const CryptoModel = require("./../models/Crypto.model");
const axios = require("axios");

function priceUpdate() {
    axios
        .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((allCrypto) => {
            CryptoModel.deleteMany()
                // console.log("All Crypto Data: ", allCrypto.data);
                .then(
                    allCrypto.data.forEach((crypto) => {
                        CryptoModel.create({
                            name: crypto.name,
                            image: crypto.image,
                            current_price: crypto.current_price,
                        });
                    })
                )
                .catch(err => console.log(err));
            console.log("SUCCESS!");
            //process.exit();
        })
        .catch((err) => console.log(err));
}

module.exports = priceUpdate;