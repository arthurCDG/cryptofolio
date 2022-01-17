const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Satoshi_Nakamoto.jpg/1200px-Satoshi_Nakamoto.jpg"
    },
    porfolio: {
        type: [Schema.Types.ObjectId], ref: "portfolios"
    }
})

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;

