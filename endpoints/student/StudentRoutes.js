const express = require('express')
const router = express.Router()
const studentService = require("./StudentService")
const utils = require('../../utils/AuthenticationUtils')
const companyService = require('../company/CompanyService')
const adminService = require('../admin/AdminService')

// GET requests
router.get('/', (req, res, next) => {
	studentService.getStudents((err, result) => {
		if (err) {
			res.status(500)
			res.json({ "Error": "An error occured while trying to get students: " + err.message })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find students" })
		} else {
			let helperArray = []
			result.map((element) => {
				helperArray.push(studentService.createSubset(element))
			})
			res.status(200).json(helperArray)
		}
	})
})

router.get('/:id', (req, res) => {
	let studentID = req.params.id
	studentService.getStudentByID(studentID, (err, result) => {
		if (err || !result) {
			res.status(404)
			res.json({ "Error": "Could not find student " + studentID })
		} else {
			res.status(200).json(studentService.createSubset(result))
		}
	})
})

// POST requests
router.post('/', (req, res) => {
	let mail = req.body.email
	adminService.getAdminByMail(mail, (err, result) => {
		if (err) {
			res.status(400).json({ "Error": err.message })
		} else if (result) {
			res.status(409).json({ "Error": mail + " is already taken." })
		} else {
			companyService.getCompanyByMail(mail, (err, result) => {
				if (err) {
					res.status(400).json({ "Error": err.message })
				} else if (result) {
					res.status(409).json({ "Error": mail + " is already taken." })
				} else {
					studentService.saveStudent(req.body, (err, result) => {
						if (err) {
							if (JSON.stringify(err.message).includes("E11000")) {
								console.log("Bin im save student")
								res.status(409).json({ "Error": "Email: " + mail + " is already taken." })
							} else {
								res.status(400).json({ "Error": err.message })
							}
						}
						else if (!result) {
							res.status(409).json({ "Error": "Student already exists" })
						} else {
							res.status(201).json(studentService.createSubset(result))
						}
					})
				}
			})
		}
	})
})

// POST request for upload a profilpic of a specific student
router.post('/:id/upload_picFile', (req, res) => {

	const studentID = req.params.id
	if (!studentID) res.status(400).json({ Error: "studentID missing" })

	if (!req.files || Object.keys(req.files).length === 0) res.status(400).send({ Error: "No file were uploaded." })

	studentService.savePicForOneStudent(req.params.id, req.files.picFile, (err, student) => {
		if (err) {
			res.status(500).send({ Error: "Error in savePicforOneStudent(): " + err })
		} else if (!student) {
			res.status(404).send({ Error: "Could not find student with id: " + studentID })
		} else {
			res.status(200).json(studentService.createSubset(student))
		}
	})
})

//POST request upload a file for a specific student
router.post('/:id/upload_file', (req, res) => {

	const studentID = req.params.id
	const files = req.files

	if (!studentID) return res.status(400).json({ Error: "studentID missing" })
	if (!files || Object.keys(files).length === 0) return res.status(400).json({ Error: "no files were uploaded" })

	studentService.fileUpload(studentID, files.uploadFile, (err, student) => {
		if (err) {
			res.status(500).json({ Error: "Error occured either in studentService.fileupload():" + err })
		} else if (!student) {
			res.status(400).json({ Error: "Could not find a student with id: " + studentID })
		} else {
			res.status(200).json(studentService.createSubset(student))
		}
	})
})

// PUT requests
router.put('/:id', utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {
	let studentID = req.params.id
	let mail = req.body.email
	adminService.getAdminByMail(mail, (err, result) => {
		if (err) {
			res.status(400).json({ "Error": err.message })
		} else if (result) {
			res.status(409).json({ "Error": mail + " is already taken." })
		} else {
			companyService.getCompanyByMail(mail, (err, result) => {
				if (err) {
					res.status(400).json({ "Error": err.message })
				} else if (result) {
					res.status(409).json({ "Error": mail + " is already taken." })
				} else {
					studentService.updateStudent(studentID, req.body, (err, result) => {
						if (err) {
							if (JSON.stringify(err.message).includes("E11000")) {
								res.status(409).json({ "Error": err.message })
							} else {
								res.status(400).json({ "Error": err.message })
							}
						} else if (!result) {
							res.status(404)
							res.json({ "Error": "Could not find student " + studentID })
						} else {
							res.status(202).json(studentService.createSubset(result))
						}
					})
				}
			})
		}
	})
})

// add new avalability to student
router.put("/:id/availability", utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {

	const studentID = req.params.id
	const newAvailability = req.body.newAvailability

	if (!studentID) res.status(400).json({ Error: "Missing studentID" })
	if (!newAvailability || (Array.isArray(newAvailability) && newAvailability.length === 0)) return res.status(400).json({ Error: "No new timeslot found in request" })

	studentService.addAvailability(studentID, newAvailability, (error, result) => {
		if (error) {
			return res.status(500).json({ Error: "Error in addAvailability(): " + error })
		} else if (!result) {
			return res.status(404).json({ Error: "No student found with ID " + studentID })
		} else {
			res.status(200).json(result)
		}
	})
})

// DELETE requests
router.delete('/:id', utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {
	let studentID = req.params.id
	studentService.deleteStudent(studentID, (err, result) => {
		if (err) {
			res.status(404)
			res.json({ "Error": err.message })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find student " + studentID })
		} else {
			res.status(204).json(studentService.createSubset(result))
		}
	})
})

router.delete('/:id/savedSearches', utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {
	let studentID = req.params.id
	let deleteSearch = req.body.savedSearches
	studentService.deleteSavedSearch(studentID, deleteSearch, (err, result) => {
		if (err) {
			res.status(404)
			res.json({ "Error": err.message })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find student " + studentID })
		} else {
			res.status(204).json(studentService.createSubset(result))
		}
	})
})

router.delete('/:id/favoriteCompanies', utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {
	let studentID = req.params.id
	let deleteCompany = req.body.favoriteCompanies
	studentService.deleteFavoriteCompany(studentID, deleteCompany, (err, result) => {
		if (err) {
			res.status(404)
			res.json({ "Error": err.message })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find student " + studentID })
		} else {
			res.status(204).json(studentService.createSubset(result))
		}
	})
})

router.delete('/:id/availability', utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {

	const studentID = req.params.id
	const slotID = req.body.deleteAvailabilityID

	if (!studentID) return res.status(400).json({ Error: "Missing studentID" })
	if (!slotID) return res.status(400).json({ Error: "Missing slotID" })

	studentService.deleteAvailability(studentID, slotID, (error, result) => {
		if (error) {
			return res.status(500).json({ Error: "Error in deleteAvailability(): " + error })
		} else if (!result) {
			return res.status(404).json({ Error: "Could not find student with ID " + studentID })
		} else {
			res.status(204).json(slotID)
		}
	})
})

// delete multiple documents
router.delete("/:id/deleteDocuments", utils.isAuthenticated, utils.isStudentOrAdmin, utils.isOwner, (req, res) => {

	const studentID = req.params.id
	if (!studentID) return res.status(400).json({ Error: "missing student ID" })

	const documentsToDelete = req.body.documentsToDelete
	if (!documentsToDelete) return res.status(400).json({ Error: "no documents were deleted" })

	studentService.deleteDocuments(studentID, documentsToDelete, (err, student) => {
		if (err) {
			return res.status(500).json({ Error: "Error occured in studentService.deleteDocuments(): " + err })
		} else if (!student) {
			return res.status(404).json({ Error: "no student found with id " + studentID })
		} else {
			return res.status(204).json({ Message: "documents deleted" })
		}
	})
})
module.exports = router