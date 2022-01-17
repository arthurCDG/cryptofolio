require("../../config/mongodb");
const UserModel = require("../../models/User.model");

const users = [
    {
        firstName: "Toto",
        lastName: "Tata",
        password: "1234",
        email: "toto@tata.com"
    },
    {
        firstName: "Paulo",
        lastName: "Lechaud",
        password: "1234",
        email: "paulo@lechaud.com"
    },
    {
        firstName: "Pierro",
        lastName: "Lasticot",
        password: "1234",
        email: "pierro@lasticot.com"
    }
]

UserModel.insertMany(users)
    .then(console.log("Succes, inserted users"))
    .catch(err => console.log(err))