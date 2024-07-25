let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const CompanySchema = new mongoose.Schema({
	companyName: { type: String, unique: true, required: [true, "can't be blank"], index: true },
	contactPerson: { type: String, default: "N/A"},
	phone: {type: String, match: [/^(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)(\d+))$/], trim: true},
	email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[^@\s]+@[^.@\s]+(.[^.@\s]+){1,2}$/], trim: true, unique: true, index: true},
	// street, number, postal code, city, country
	address: {type: String, default: "N/A"},
	homePage: { type: String, default: "N/A" },
	password: { type: String, required: [true, "can't be blank"] },
	applicationEmail: { type: String, lowercase: true, match: [/^[^@\s]+@[^.@\s]+(.[^.@\s]+){1,2}$/], trim: true},
	companyDescription: { type: String, default: "N/A" },
	profilPic: {
		data: {type: String},
		size: {type: String},
		mimetype: {type: String}
	},
	isAdmininstrator: {type: Boolean, default: false}
}, { timestamps: true }
);

CompanySchema.pre('save', function (next) {
	let company = this
	if (!company.isModified('password')) { return next() }
	bcrypt.hash(company.password, 10).then((hashedPassword) => {
		company.password = hashedPassword
		next()
	})
}, function (err) {
	next(err)
})

CompanySchema.methods.comparePassword = function (candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return next(err)
		} else {
			next(null, isMatch)
		}
	})
}

module.exports = mongoose.model("Company", CompanySchema)