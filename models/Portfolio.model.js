const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    name: { type: String, required: true },
    notes: String,
    holdings: { type: [Schema.Types.ObjectId], ref: "holdings" }
});

module.exports = mongoose.model("portfolios", portfolioSchema);