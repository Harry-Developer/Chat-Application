const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id: ObjectId,
    email: {
        type: String,
        maxlength: 100,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 30,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("User", UserSchema)