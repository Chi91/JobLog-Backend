const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema({
	mail: {
		type: String,
		required: true,
		unique: true,
		match: [/^[^.@\s]+@[^.@\s]+(.[^.@\s]+){1,2}$/],
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	isAdministrator: {type: Boolean, default: true}
}, { timestamps: true })

AdminSchema.pre('save', function (next) {
	var user = this
	if (!user.isModified('password')) { return next() }
	bcrypt.hash(user.password, 10).then((hasedPassword) => {
		user.password = hasedPassword
		next()
	})
}, function (err) {
	next(err)
})

AdminSchema.methods.comparePassword = function (candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return next(err)
		} else {
			next(null, isMatch)
		}
	})
}

module.exports = mongoose.model("Admin", AdminSchema)