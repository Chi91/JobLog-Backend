const { ObjectID } = require('bson');
let mongoose = require('mongoose')
const {fields, courses} = require("../../config/config")
const applicationService = require("../application/ApplicationService")


const JobSchema = new mongoose.Schema({
    companyID: {type: ObjectID, required: [true, "can't be blank"]},
    companyName: {type: String, required: [true, "can't be blank"]},
    // Fakultäten
    fieldIDs: [{type: String, enum: fields}],
     // Studiengänge
    courseIDs: [{type: String, enum: courses}],
    tagList: [String],
    jobTitle: {type: String, required: [true, "can't be blank"]},
    jobSummary: {type: String, trim: true, default: "N/A"},
    jobType: {type: String, trim: true, default: "N/A"},
    salaryPerHour: {type: Number}, 
    vacation: {type: Number},
    weeklyHours: {type: Number}, 
    weeklyTimeSlots: [{
        // 1: Mo; 2: Di; 3: Mi; 4: Do; 5: Fr; 6: Sa; 7: So;
        day: {type: Number, match: ['1', '2', '3', '4', '5', '6', '7']},
        // hh:mm
        beginn: {type: String, match: [/^([0-1]\d|2[0-3]):[0-5]\d$/]},
        end: {type: String, match: [/^([0-1]\d|2[0-3]):[0-5]\d$/]}
   }],
   benefits: {type: String, trim: true, default: "N/A"}
}, { timestamps: true }
);

JobSchema.pre('delete', (next) => {
	let id = this.jobID
	applicationService.deleteManyByJobID(id, (err, result => {
		if (err){
			next(err)
		} else {
			next()
		}
	}))
}, (err) => {
	next(err)
})

module.exports = mongoose.model("Job", JobSchema)  	