const Application = require('./ApplicationModel')

function getApplicationsByJobID(searchID, callback) {
	Application.find({ jobID: searchID }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

function getApplicationsByStudentID(searchID, callback) {
	Application.find({ studentID: searchID }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

function getApplicationByID(searchID, callback) {
	Application.findOne({ _id: searchID }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

function saveApplication(reqBody, callback) {
	let newApplication = new Application(reqBody)
	newApplication.save(err => {
		if (err) {
			return callback(err, null)
		} else {
			return callback(null, newApplication)
		}
	})
}

function updateApplication(application, visibleDocuments, callback) {

	const updateBody = {
		visibleDocuments: visibleDocuments
	}

	Object.assign(application, updateBody)

	application.save()
		.then(savedApplication => callback(null, savedApplication))
		.catch(error => callback(error))
}

function addPermission(id, updateBody, callback) {
	if (!Array.isArray(updateBody.visibleDocuments) && updateBody.visibleDocuments != null) {
		callback({ "message": "visibleDocuments must be an array" }, null)
	} else {
		getApplicationByID(id, (err, result) => {
			if (!result) {
				callback(null, null)
			} else if (result) {
				if (result.visibleDocuments && updateBody.visibleDocuments) {
					updateBody.visibleDocuments.forEach(value => {
						result.visibleDocuments.push(value)
					})
				}
				updateBody.visibleDocuments = [...new Set(updateBody.visibleDocuments)];

				result.save()
					.then((saveApplication) => {
						callback(null, saveApplication)
					})
					.catch((err) => {
						callback(err)
					})
			} else if (err) {
				callback(err)
			}
		})
	}
}

function deleteApplication(id, callback) {
	Application.deleteOne({ _id: id })
		.then((result) => {
			callback(null, result)
		})
		.catch((err) => {
			callback(err)
		})
}

function deletePermission(id, visibleDocuments, callback) {
	if (!Array.isArray(visibleDocuments) && visibleDocuments != null){
		callback({"message": "visibleDocuments must be an array"}, null)
	} else { 
		getApplicationByID(id, (err, result) => {
			if (!result) {
				callback(null, null)
			} else if (result) {			
				if (result.visibleDocuments && visibleDocuments) {
					visibleDocuments.forEach((value) => {
						const searchedIndex = result.visibleDocuments.findIndex((result) => {
							return result._id == value._id;
						})
						if (searchedIndex !== -1) {
							result.visibleDocuments.splice(searchedIndex, 1);
						}
					})					
				}
				result.save()
					.then((newJob) => {
						callback(null, newJob)
					})
					.catch((err) => {
						callback(err)
					})
			} else if (err) {
				callback(err)
			}
		})
	}
}

const deleteManyByJobID = (id, callback) => {
	Application.deleteMany({ jobID: id }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

const deleteManyByStudentID = (id, callback) => {
	Application.deleteMany({ studentID: id }, (err, result) => {
		if (err) {
			callback(err)
		} else {
			callback(null, result)
		}
	})
}

const createSubset = (data) => {
	if (!data) {
		return null;
	}

	return {
		applicationID: data._id,
		studentID: data.studentID,
		jobID: data.jobID,
		visibleDocuments: data.visibleDocuments
	}
}

module.exports = {
	getApplicationByID,
	getApplicationsByJobID,
	getApplicationsByStudentID,
	saveApplication,
	createSubset,
	deleteManyByStudentID,
	deleteManyByJobID,
	addPermission,
	deletePermission,
	deleteApplication,
	updateApplication
}
