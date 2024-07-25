const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')
const adminService = require('../admin/AdminService')
const companyService = require('../company/CompanyService')
const studentService = require('../student/StudentService')

const jwtKey = config.session.tokenKey
const jwtTimeOut = config.session.timeOut

// check if password of a user matches with given password
async function checkUserPassword(userObj, callback) {
	
	// check if user is an admin, student or a company

	// check for admin
	let admin
	try {
		admin = await checkAdmin(userObj.email)
	} catch (err) {
		// no admin found for given mail address
	}

	// check for student
	let student
	try {
		student = await checkStudent(userObj.email)
	} catch (err) {
		// no student found for given mail address
	}
	
	// check for company
	let company
	try {
		company = await checkCompany(userObj.email)
	} catch (err) {
		// no company found for given mail address
	}

	if (!admin && !student && !company) {
		callback(null, null, null)
	} else if (admin) {
		admin.comparePassword(userObj.password, (err, isMatch) => {

			if (err) {
				return callback(err)
			} else if (isMatch) {
				
				// password correct - create new object to return to auth service (makes it easyer to handle tokens)
				let returnObj = {
					type: "admin",
					mail: admin.mail,
					isAdministrator: admin.isAdministrator				
				}
				return callback(null, isMatch, returnObj)
			} else if (!isMatch) {
				return callback(null, null, null)
			}
		})
	} else if (student) {
		student.comparePassword(userObj.password, (err, isMatch) => {
			if (err) {
				return callback(err)
			} else if (isMatch) {

				// password correct - create new object to return to auth service (makes it easyer to handle tokens)
				let returnObj = {
					id: student._id,
					type: "student",
					name: student.firstname + " " + student.lastname,
					mail: student.email,
					isAdmininstrator: student.isAdmininstrator					
				}
				return callback(null, isMatch, returnObj)
			} else if (!isMatch) {
				return callback(null, null, null)
			}
		})
	} else if (company) {
		company.comparePassword(userObj.password, (err, isMatch) => {

			if (err) {
				return callback(err)
			} else if (isMatch) {

				// password correct - create new object to return to auth service (makes it easyer to handle tokens)
				let returnObj = {
					id: company._id,
					name: company.companyName,
					type: "company",
					mail: company.email,
					isAdmininstrator: company.isAdmininstrator					
				}
			
				return callback(null, isMatch, returnObj)
			} else if (!isMatch) {
				return callback(null, null, null)
			}
		})
	}
}

function createToken(userObj, callback) {

	if (!userObj) {
		callback("userObj missing")
	} else {
		let name;
		if (userObj.type == "student"){
			name = userObj.firstname + " " + userObj.lastname
		} else if (userObj.type == "company"){
			name = userObj.companyName
		} else {
			name = "Admin"
		}
		// create token
		let token = jwt.sign({
			"id": userObj.id,
			"name": userObj.name,
			"mail": userObj.mail,
			"type": userObj.type,
			"admin": userObj.isAdministrator
		},
			jwtKey, {
			expiresIn: jwtTimeOut,
			algorithm: 'HS256'
		})
		callback(null, token)
	}
}

module.exports = {
	createToken,
	checkUserPassword
}

// internal functions
function checkAdmin(mail) {

	return new Promise((resolve, reject) => {

		adminService.getAdminByMail(mail, (err, admin) => {

			if (err) {
				reject("Error in getAdminByMail(): " + err)
			} else if (!admin) {
				reject()
			} else {
				// found admin
				resolve(admin)
			}
		})
	})
}

function checkStudent(mail) {
	return new Promise((resolve, reject) => {

		studentService.getStudentByMail(mail, (err, student) => {

			if (err) {
				reject("Error in getStudentByMail(): " + err)
			} else if (!student) {
				reject()
			} else {
				// found student
				resolve(student)
			}
		})
	})
}

function checkCompany(mail) {

	return new Promise((resolve, reject) => {

		companyService.getCompanyByMail(mail, (err, company) => {

			if (err) {
				reject("Error in getCompanyByMail(): " + err)
			} else if (!company) {
				reject()
			} else {
				// found company
				resolve(company)
			}
		})
	})
}