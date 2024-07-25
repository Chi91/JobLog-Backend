const Company = require('./CompanyModel')
var mongoose = require("mongoose")

// get all users from database
function getCompanies(callback) {
	Company.find((err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			result.companyID = result._id;
			callback(null, result)
		}
	})
}

// get one specific company from database
function getCompanyByID(companyid, callback) {
	Company.findOne({ _id: companyid }, (err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			callback(null, result)
		}
	})
}

function getCompanyByMail(mail, callback) {
	Company.findOne({ email: mail }, (err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			callback(null, result)
		}
	})
}

// save new company to database, check if company already exists
function saveCompany(reqBody, callback) {
	let newCompany = new Company(reqBody)
	newCompany.save(function (err) {
		if (err) {
			return callback(err, null)
		}
		else {
			return callback(null, newCompany)
		}
	})
}

// update company in the database
function updateCompany(companyid, updateBody, callback) {
	// get student document from db
	getCompanyByID(companyid, (err, result) => {
		if (!result) {
			callback(null, null)
		} else if (result) {
			// student found, time to update
			result = Object.assign(result, updateBody)
			result.save()
				.then((savedCompany) => {
					callback(null, savedCompany)
				})
				.catch((updateErr) => {
					callback(updateErr)
				})
		} else if (err) {
			callback("Error in getStudentByID(): " + err.message)
		}
	})
}

// delete company from database
function deleteCompany(companyid, callback) {
	Company.deleteOne({ _id: companyid })
		.then((deletedCompany) => {
			callback(null, deletedCompany)
		}).catch((deleteErr) => {
			callback(deleteErr)
		})
}

function savePicforOneCompany(searchID, picture, callback) {
	Company.findById({ _id: searchID }, function (err, company) {
		if (err) {
			return callback(err, null)
		} else if (!company) {
			return callback(null, null)
		} else {
			let imgData = picture.data.toString("base64")
			const newBody = {
				profilPic: {
					data: imgData,
					size: picture.size,
					mimetype: picture.mimetype
				}
			}

			Object.assign(company, newBody)
			company.save(function (err, result) {
				if (err) {
					return callback(err, null)
				} else {
					return callback(null, result)
				}
			})
		}
	})
}

const createSubset = (data) => {
	if (!data) {
		return null;
	}

	let subset = {
		companyID: data._id,
		companyName: data.companyName,
		contactPerson: data.contactPerson,
		phone: data.phone,
		email: data.email,
		address: data.address,
		homePage: data.homePage,
		applicationEmail: data.applicationEmail,
		companyDescription: data.companyDescription,
		profilPic: data.profilPic
	}
	return subset;
}

module.exports = {
	getCompanies,
	getCompanyByID,
	saveCompany,
	getCompanyByMail,
	updateCompany,
	deleteCompany,
	createSubset,
	savePicforOneCompany
}