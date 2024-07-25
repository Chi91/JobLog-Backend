const Admin = require('./AdminModel')

// get all admins from database
function getAdmins(callback) {
	Admin.find((err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			callback(null, result)
		}
	})
}

// get one specific admin from database
function getAdminByMail(adminMail, callback) {
	Admin.findOne({ mail: adminMail }, (err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			callback(null, result)
		}
	})
}

// save new admin to database, check if admin already exists
function saveAdmin(newAdminMail, reqBody, callback) {
	let newAdmin = new Admin(reqBody)

	// check if a user with this userID already exists
	getAdminByMail(newAdminMail, (err, result) => {
		if (!result) {
			newAdmin.save()
				.then((savedAdmin) => {
					callback(null, savedAdmin)
				})
				.catch((saveErr) => {
					callback(saveErr)
				})
		} else if (result) {
			callback(null, null)
		} else if (err) {
			callback("Error in getAdminByMail(): " + err)
		}
	})
}

// update admin in the database
function updateAdmin(adminMail, updateBody, callback) {

	// get user document from db
	getAdminByMail(adminMail, (err, result) => {
		if (!result) {
			callback(null, null)
		} else if (result) {
			// admin found, time to update

			Object.assign(result, updateBody)

			result.save()
				.then((savedAdmin) => {
					callback(null, savedAdmin)
				})
				.catch((updateErr) => {
					callback(updateErr)
				})
		} else if (err) {
			callback("Error in getAdminByMail(): " + err)
		}
	})
}

// delete user from database
function deleteAdmin(adminMail, callback) {
	// get user document from db
	getAdminByMail(adminMail, (err, result) => {
		if (!result) {
			callback(null, null)
		} else if (result) {
			Admin.deleteOne({ mail: adminMail })
				.then((deletedAdmin) => {
					callback(null, deletedAdmin)
				}).catch((deleteErr) => {
					callback(deleteErr)
				})
		} else if (err) {
			callback("Error in getAdminByMail(): " + err)
		}
	})
}

// check for default admin
function checkDefaultAdmin() {
	// save default admin
	const data = {
		mail: "defaultadmin@joblog.de",
		password: "123",
		isAdministrator: true
	}

	saveAdmin(data.mail, data, (err, result) => {
		if (!result) {
			console.log("checkDefaultAdmin(): admin already exists")
		} else if (result) {
			console.log("checkDefaultAdmin(): created default admin: " + result)
		} else if (err) {
			console.log("checkDefaultAdmin(): Error: " + err)
		}
	})
}

module.exports = {
	getAdmins,
	getAdminByMail,
	saveAdmin,
	updateAdmin,
	deleteAdmin,
	checkDefaultAdmin
}