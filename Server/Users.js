const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Age: Number,
})

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel