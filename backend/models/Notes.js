const mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false,
        unique: false
    },
    tags : {
        type: String,
        required: false
    },
    friends : {
        type: String,
        required: false
    },
    date : {
        type: String,
        default: Date.now
    },
    category : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('transactions', NotesSchema)