const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
    quantity: Number,
    crypto: { type: Schema.Types.ObjectId, ref: "cryptos" }
});

module.exports = mongoose.model("cryptos", holdingSchema);