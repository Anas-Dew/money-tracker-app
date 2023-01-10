const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "name" : {
        type: String,
        required: true
    },
    "email" : {
        type: String,
        required: true,
        unique: true
    },
    "password" : {
        type: String,
        required: true
    },
    "budget" : {
        type: String,
        required: true
    }
})
const User = mongoose.model('money_savers', UserSchema)
User.createIndexes();
module.exports = User