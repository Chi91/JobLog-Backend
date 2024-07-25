const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const applicationService = require("../endpoints/application/ApplicationService")

const jwtKey = config.session.tokenKey

// check authorization middleware
function isAuthenticated(req, res, next) {
	if (typeof req.headers.authorization !== "undefined") {
		let token = req.headers.authorization.split(" ")[1]

		//user = jwt.verify(token, jwtKey, {algorithm: "HS256"})
		jwt.verify(token, jwtKey, { algorithm: "HS256" }, (err, payload) => {
			if (err) {
				return res.status(401).json({ "Error": "invalid token: " + err })
			} else if (payload) {
				res.locals.payload = payload
				return next()
			}
		})
	} else {
		// authorization header is not set or token expired
		return res.status(401).json({ "Error": "Unauthorized" })
	}
}

// check if user from previous middleware is admin
function isAdmin(req, res, next) {
	const payload = res.locals.payload
	if (payload) {
		// check if admin
		if (payload.isAdministrator) {
			return next()
		} else {
			return res.status(401).json({ "Error": "user is no admin. Permission denied." })
		}
	}
	else {
		return res.status(401).json({ Error: "no payload in token" })
	}
}

// check if payload from previous middlewareis type student
function isStudentOrAdmin(req, res, next) {
	const student = res.locals.payload
	if (student) {
		if (student.type == "student" || student.type == "admin") {
			return next()
		}
		else {
			return res.status(401).json({ Error: "Permission denied. Not found type student or no admin!" })
		}
	}
	else {
		return res.status(401).json({ Error: "No payload in token!" })
	}
}

//check if payload from previous middleware is type company 
function isCompanyOrAdmin(req, res, next) {
	const company = res.locals.payload
	if (company) {
		if (company.type == "company" || company.type == "admin") {
			return next()
		}
		else {
			return res.status(401).json({ "Error": "Permission denied. Not found type company or no admin!" })
		}
	}
	else {
		return res.status(401).json({ "Error": "no payload in token!" })
	}
}

function isOwner(req, res, next) {
	const payload = res.locals.payload
	if (req.params.id == payload.id) {
		return next()
	}
	else {
		return res.status(401).json({ Error: "Not authorized" })
	}
}

function isOwnerOfApplication(req, res, next) {

	const applicationID = req.params.applicationID
	const studentID = res.locals.payload.id

	applicationService.getApplicationByID(applicationID, (error, application) => {

		if (error) {
			return res.status(500).json({ Error: "Error in getApplicationByID: " + error })
		} else if (!application) {
			return res.status(404).json({ Error: "No application found with ID " + applicationID })
		} else {
			if (application.studentID.equals(studentID)) {
				res.locals.application = application
				return next()
			} else {
				return res.status(401).json({ Error: "That's not your application" })
			}
		}
	})
}

module.exports = {
	isAuthenticated,
	isAdmin,
	isCompanyOrAdmin,
	isStudentOrAdmin,
	isOwner,
	isOwnerOfApplication
}