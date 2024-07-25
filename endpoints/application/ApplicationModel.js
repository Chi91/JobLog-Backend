let mongoose = require('mongoose')
const { ObjectID } = require('bson')

const ApplicationSchema = new mongoose.Schema({
    jobID: {type: ObjectID, required: [true, "can't be blank"], index: true},
    studentID: {type: ObjectID, required: [true, "can't be blank"], index: true},
    visibleDocuments: [String]
}, { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema) 