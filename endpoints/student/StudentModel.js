let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ObjectID } = require('bson');
const { fields, courses } = require("../../config/config")
const applicationService = require("../application/ApplicationService")

const StudentSchema = new mongoose.Schema({
	// Studiengang
	courseID: { type: String, index: true, enum: courses },
	// Fakultät
	fieldID: { type: String, index: true, enum: fields },
	firstname: { type: String, trim: true },
	lastname: { type: String, trim: true },
	password: { type: String, required: [true, "can't be blank"] },
	phone: { type: String, match: [/^(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)(\d+))$/], trim: true },
	email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[^@\s]+@[^.@\s]+(.[^.@\s]+){1,2}$/], trim: true, unique: true },
	availability: [{
		// 1: Mo; 2: Di; 3: Mi; 4: Do; 5: Fr; 6: Sa; 7: So;
		day: { type: Number, match: ['1', '2', '3', '4', '5', '6', '7'] },
		// hh:mm
		beginn: { type: String, match: [/^([0-1]\d|2[0-3]):[0-5]\d$/] },
		end: { type: String, match: [/^([0-1]\d|2[0-3]):[0-5]\d$/] }
	}],
	weeklyHours: { type: Number },
	savedSearches: [String],
	favoriteCompanies: [ObjectID],
	fileStorage: [{
		data: { type: String },
		name: { type: String },
		size: { type: Number },
		mimetype: { type: String }
	}],
	profilPic: {
		data: { type: String },
		size: { type: Number },
		mimetype: { type: String }
	},
	isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);

StudentSchema.pre('save', function (next) {
	let student = this
	if (!student.isModified('password')) { return next() }
	bcrypt.hash(student.password, 10).then((hashedPassword) => {
		student.password = hashedPassword
		next()
	})
}, function (err) {
	next(err)
})

StudentSchema.methods.comparePassword = function (candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return next(err)
		} else {
			next(null, isMatch)
		}
	})
}

StudentSchema.pre('delete', (next) => {
	let id = this.studentID
	applicationService.deleteManyByStudentID(id, (err, result => {
		if (err) {
			next(err)
		} else {
			next()
		}
	}))
}, (err) => {
	next(err)
})

module.exports = mongoose.model("Student", StudentSchema)