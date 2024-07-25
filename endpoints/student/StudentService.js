const Student = require('./StudentModel')
const mongoose = require("mongoose")

// get all students from database
function getStudents(callback) {
	Student.find((err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

// get one specific student from database
function getStudentByID(searchID, callback) {
	Student.findOne({ _id: searchID }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

function getStudentByMail(mail, callback) {
	Student.findOne({ email: mail }, (err, result) => {
		if (err) {
			callback(err)
		} else if (!result) {
			callback(null, null)
		} else {
			callback(null, result)
		}
	})
}

// save new student to database, check if student already exists
// function saveStudent(newStudentID, reqBody, callback) {
function saveStudent(reqBody, callback) {
	let newStudent = new Student(reqBody)
	newStudent.weeklyHours = sumWeeklyHours(reqBody.availability)
	newStudent.save(function (err) {
		if (err) {
			return callback(err, null)
		}
		else {
			return callback(null, newStudent)
		}
	})
}

// update student in the database
function updateStudent(studentID, updateBody, callback) {
	// get student document from db
	if ((!Array.isArray(updateBody.savedSearches) && updateBody.savedSearches != null) || (!Array.isArray(updateBody.favoriteCompanies) && updateBody.favoriteCompanies != null) || (!Array.isArray(updateBody.availability) && updateBody.availability != null)) {
		let err = { "message": "savedSearches, favoriteCompanies, availability must be arrays" }
		callback(err, null)
	} else {
		getStudentByID(studentID, (err, result) => {
			if (!result) {
				callback(null, null)
			} else if (result) {
				// student found, time to update
				if (result.savedSearches && updateBody.savedSearches) {
					result.savedSearches.forEach(value => {
						updateBody.savedSearches.push(value)
					})
					updateBody.savedSearches = [...new Set(updateBody.savedSearches)];
				}
				if (result.favoriteCompanies && updateBody.favoriteCompanies) {
					result.favoriteCompanies.forEach(value => {
						updateBody.favoriteCompanies.push(value)

					})
				}
				if (result.availability && updateBody.availability) {
					updateBody.availability.forEach(value => {
						result.availability.push(value)
					})
					updateBody.availability = result.availability
					result.weeklyHours = sumWeeklyHours(updateBody.availability)
				}
				// check for arrays
				Object.assign(result, updateBody)
				result.save()
					.then((savedStudent) => {
						callback(null, savedStudent)
					})
					.catch((updateErr) => {
						callback(updateErr)
					})
			} else if (err) {
				callback("Error in getStudentByID(): " + err.message)
			}
		})
	}
}

// delete student from database
function deleteStudent(studentID, callback) {
	Student.deleteOne({ _id: studentID })
		.then((deletedStudent) => {
			callback(null, deletedStudent)
		}).catch((deleteErr) => {
			callback(deleteErr)
		})
}

// delete one specific savedSearch
function deleteSavedSearch(studentID, deleteSearch, callback) {
	// get student document from db
	getStudentByID(studentID, (err, result) => {
		if (!result) {
			callback(null, null)
		} else if (result) {
			// student found, time to delete
			if (result.savedSearches && deleteSearch) {
				let searchedIndex = result.savedSearches.indexOf(deleteSearch);
				if (searchedIndex !== -1) {
					result.savedSearches.splice(searchedIndex, 1);
				}
			}
			const newBody = {
				savedSearches: result.savedSearches
			}
			// check for arrays
			Object.assign(result, newBody)
			result.save()
				.then((savedStudent) => {
					callback(null, savedStudent)
				})
				.catch((updateErr) => {
					callback(updateErr)
				})
		} else if (err) {
			callback("Error in getStudentByID() for deleteSavedSearch: " + err.message)
		}
	})
}

// delete one specific favoritCompany
function deleteFavoriteCompany(studentID, deleteCompany, callback) {
	// get student document from db
	getStudentByID(studentID, (err, result) => {
		if (!result) {
			callback(null, null)
		} else if (result) {
			// student found, time to delete
			if (result.favoriteCompanies && deleteCompany) {
				let searchedIndex = result.favoriteCompanies.indexOf(deleteCompany);
				if (searchedIndex !== -1) {
					result.favoriteCompanies.splice(searchedIndex, 1);
				}
			}
			const newBody = {
				favoriteCompanies: result.favoriteCompanies
			}
			// check for arrays
			Object.assign(result, newBody)
			result.save()
				.then((savedStudent) => {
					callback(null, savedStudent)
				})
				.catch((updateErr) => {
					callback(updateErr)
				})
		} else if (err) {
			callback("Error in getStudentByID() for deleteFavoriteCompany: " + err.message)
		}
	})
}

// add availability timeslot to student
function addAvailability(studentID, newAvailability, callback) {

	getStudentByID(studentID, (error, student) => {

		if (error) {
			callback(error)
		} else if (!student) {
			callback()
		} else {

			let availabilityCopy = student.availability
			availabilityCopy.push(newAvailability)

			const updateBody = {
				availability: availabilityCopy
			}

			Object.assign(student, updateBody)
			student.save()
				.then(savedStudent => callback(null, savedStudent.availability))
				.catch(updateError => callback(updateError))
		}
	})
}

// delete one specific availability
function deleteAvailability(studentID, slotID, callback) {

	Student.findOneAndUpdate(
		{ _id: studentID },
		{ $pull: { 'availability': { '_id': slotID } } },
		(err, student) => {
			if (err) {
				return callback(err)
			} else if (!student) {
				return callback()
			} else {
				return callback(null, student)
			}
		}
	)
}

const createSubset = (data) => {
	if (!data) {
		return null;
	}

	let subset = {
		studentID: data._id,
		courseID: data.courseID,
		fieldID: data.fieldID,
		firstname: data.firstname,
		lastname: data.lastname,
		phone: data.phone,
		email: data.email,
		availability: data.availability,
		weeklyHours: data.weeklyHours,
		savedSearches: data.savedSearches,
		favoriteCompanies: data.favoriteCompanies,
		fileStorage: data.fileStorage,
		profilPic: data.profilPic
	}
	return subset;
}

function savePicForOneStudent(searchID, picture, callback) {

	Student.findById({ _id: searchID }, (err, student) => {
		if (err) {
			return callback(err, null)
		} else if (!student) {
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

			Object.assign(student, newBody)

			student.save((err, result) => {
				if (err) return callback(err, null)

				return callback(null, result)
			})
		}
	})
}

function fileUpload(searchID, file, callback) {

	Student.findById({ _id: searchID }, (err, student) => {
		if (err) {
			return callback(err, null)
		} else if (!student) {
			return callback(null, null)
		} else {

			// get current files from user
			let fileStorage = student.fileStorage ? student.fileStorage : []

			let fileData = file.data.toString("base64")

			// create new object
			const newFile = {
				_id: new mongoose.Types.ObjectId(),
				data: fileData,
				name: file.name,
				size: file.size,
				mimetype: file.mimetype
			}

			fileStorage.push(newFile)

			const newBody = {
				fileStorage: fileStorage
			}

			Object.assign(student, newBody)

			student.save((err, result) => {
				if (err) return callback(err)

				return callback(null, result)
			})
		}
	})
}

function deleteDocuments(studentID, documentsToDelete, callback) {

	Student.findOneAndUpdate(
		{ _id: studentID },
		{ $pull: { 'fileStorage': { '_id': { $in: documentsToDelete } } } },
		(err, student) => {
			if (err) {
				return callback(err)
			} else if (!student) {
				return callback()
			} else {
				return callback(null, student)
			}
		}
	)
}

function sumWeeklyHours(availability) {
	let sum = 0
	let time = 0
	if (availability) {
		availability.forEach(function (arrayItem) {
			let date1 = new Date("01/01/2023 " + arrayItem.beginn + ":00")
			let date2 = new Date("01/01/2023 " + arrayItem.end + ":00")
			let diff = date2.getTime() - date1.getTime()
			sum = sum + diff
		});
		let msec = sum
		let hh = Math.floor(msec / 1000 / 60 / 60)
		msec -= hh * 1000 * 60 * 60
		let mm = Math.floor(msec / 1000 / 60)
		time = Number(hh + "." + (mm / 60) * 100)
		return time
	} else {
		return time
	}
}

module.exports = {
	getStudents,
	getStudentByID,
	getStudentByMail,
	saveStudent,
	updateStudent,
	deleteStudent,
	createSubset,
	deleteSavedSearch,
	deleteFavoriteCompany,
	deleteAvailability,
	savePicForOneStudent,
	fileUpload,
	deleteDocuments,
	addAvailability
}
