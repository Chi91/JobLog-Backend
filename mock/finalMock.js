const database = require("../db")
const StudentModel = require("../endpoints/student/StudentModel")
const CompanyModel = require("../endpoints/company/CompanyModel")
const JobModel = require("../endpoints/job/JobModel")
const ApplicationModel = require("../endpoints/application/ApplicationModel")

database.initDB((err, db) => {

	if (db) {

		// drop existing collections
		db.db.listCollections().toArray((error, collections) => {
			collections.forEach(collection => {
				db.db.dropCollection(collection.name, () => {
					console.log("----> Collection " + collection.name + " dropped")
				})
			})
		})

		// wait two seconds for dropping to complete then create new data
		setTimeout(() => {
			createMockData()
		}, 2000)
	} else if (!db || err) {
		console.error("Could not establish a database connection. Terminating.")
		console.error(err)
		process.exit(1)
	}
})

function createMockData() {

	// create companies
	let companyIDs = {}
	const companies = require("./finalMockData/companies.json")

	for (let company of companies) {
		company.profilPic = require("./finalMockData/profilePics/" + company.companyName + ".json")

		new CompanyModel(company)
			.save()
			.then((company => {
				companyIDs[company.companyName] = company._id
				console.log("Saved company " + company.companyName)
			}))
			.catch(error => console.error("Error saving " + company.companyName + ": " + error))
	}

	// create students
	let studentIDs = {}
	let fileIDs = {}
	const students = require("./finalMockData/students.json")

	for (let student of students) {
		student.profilPic = require("./finalMockData/profilePics/" + student.firstname + ".json")
		student.fileStorage[0] = require("./finalMockData/lebenslauf.json")

		new StudentModel(student)
			.save()
			.then((student => {
				studentIDs[student.firstname] = student._id
				fileIDs[student.firstname] = student.fileStorage[0]._id
				console.log("Saved student " + student.firstname)
			}))
			.catch(error => console.error("Error saving " + student.firstname + ": " + error))
	}

	// create jobs
	let jobIDs = {}
	const jobs = require("./finalMockData/jobs.json")

	setTimeout(() => {
		for (let job of jobs) {
			job.companyID = companyIDs[job.companyName]

			new JobModel(job)
				.save()
				.then((job => {
					jobIDs[job.companyName + "-" + job.jobTitle] = job._id
					console.log("Saved job " + job.jobTitle)
				}))
				.catch(error => console.error("Error saving " + job.jobTitle + ": " + error))
		}
	}, 1500)

	// create applications
	setTimeout(() => {
		// gerrit --> Frontendentwicklung bei Pizza Co.
		const application1 = {
			jobID: jobIDs["Pizza Co.-Praktikant*in in der Frontendentwicklung"],
			studentID: studentIDs["Gerrit"],
			visibleDocuments: [fileIDs["Gerrit"]]
		}

		// gerrit --> Praktikant*in in der Backendentwicklung
		const application2 = {
			jobID: jobIDs["Pizza Co.-Praktikant*in in der Backendentwicklung"],
			studentID: studentIDs["Gerrit"],
			visibleDocuments: []
		}

		// leander --> Praktikant*in in der Backendentwicklung
		const application3 = {
			jobID: jobIDs["Pizza Co.-Praktikant*in in der Backendentwicklung"],
			studentID: studentIDs["Leander"],
			visibleDocuments: [fileIDs["Leander"]]
		}

		// jonas --> Pizzabäcker*in
		const application4 = {
			jobID: jobIDs["Pizza Co.-Pizzabäcker*in"],
			studentID: studentIDs["Jonas"],
			visibleDocuments: [fileIDs["Jonas"]]
		}

		// matthias --> Praktikant*in in der Backendentwicklung
		const application5 = {
			jobID: jobIDs["Jeans Co.-Praktikant*in in der Backendentwicklung"],
			studentID: studentIDs["Matthias"],
			visibleDocuments: [fileIDs["Matthias"]]
		}

		// Chi --> Labor Praktikant
		const application6 = {
			jobID: jobIDs["Mathefy-Labor Praktikant"],
			studentID: studentIDs["Chi Thien"],
			visibleDocuments: [fileIDs["Chi Thien"]]
		}

		// Nadine --> Praktikant*in in der Frontendentwicklung
		const application7 = {
			jobID: jobIDs["Pizza Co.-Praktikant*in in der Frontendentwicklung"],
			studentID: studentIDs["Nadine"],
			visibleDocuments: [fileIDs["Nadine"]]
		}

		const applications = [application1, application2, application3, application4, application5, application6, application7]

		applications.forEach((application, i) => {

			new ApplicationModel(application).save((err, result) => {
				if (err) {
					console.error("Error saving application " + i + ": " + err)
				} else if (!result) {
					console.error("Got no result from saving application " + i)
				} else {
					console.log("Saved application " + i)
				}
			})
		})
	}, 2500)

	setTimeout(() => {
		process.exit(0)
	}, 8000)
}