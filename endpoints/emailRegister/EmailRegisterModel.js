let mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[^.@\s]+@[^.@\s]+(.[^.@\s]+){1,2}$/], trim: true, unique: true, index: true},
    type: {type: String, required: [true, "can't be blank"], enum: ["admin", "company", "student"]},
    userID: {type: ObjectID, required: [true, "can't be blank"], unique: true}
});

module.exports = mongoose.model("Register", RegisterSchema)