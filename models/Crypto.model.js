const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Fetched by API
const cryptoSchema = new Schema({
    name: { type: String, required: true },
    image: String,
    current_price: Number
});

module.exports = mongoose.model("cryptos", cryptoSchema);