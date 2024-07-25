const express = require('express')
const router = express.Router()
const companyService = require("./CompanyService")
const utils = require('../../utils/AuthenticationUtils')
const studentService = require("../student/StudentService")
const adminService = require("../admin/AdminService")
const jobService = require("../job/JobService")

// GET requests
router.get('/', (req, res, next) => {
	companyService.getCompanies((err, result) => {
		if (err || !result) {
			res.status(500).json({ "Error": "Could not find companies" })
		} else {
			let helperArray = []
			result.map((element) => {
				helperArray.push(companyService.createSubset(element))
			})
			res.status(200).json(helperArray)
		}
	})
})

router.get('/:id', (req, res) => {
	companyService.getCompanyByID(req.params.id, (err, result) => {
		if (err || !result) {
			res.status(404).json({ "Error": err })
		} else {
			res.status(200).json(companyService.createSubset(result))
		}
	})
})

// POST requests
router.post('/', (req, res) => {
	let mail = req.body.email
	adminService.getAdminByMail(mail, (err, result) => {
		if (err) {
			res.status(400).json({ "Error": err })
		} else if (result) {
			res.status(409).json({ "Error": mail + " is already taken." })
		} else {
			studentService.getStudentByMail(mail, (err, result) => {
				if (err) {
					res.status(400).json({ "Error": err })
				} else if (result) {
					res.status(409).json({ "Error": mail + " is already taken." })
				} else {
					companyService.saveCompany(req.body, (err, result) => {
						if (err) {
							if (JSON.stringify(err).includes("E11000")) {
								res.status(409).json({ "Error": "Email: " + mail + " is already taken." })
							} else {
								res.status(400).json({ "Error": err })
							}
						}
						else if (!result) {
							res.status(409).json({ "Error": "Company already exists" })
						} else {
							res.status(201).json(companyService.createSubset(result))
						}
					})
				}
			})
		}
	})
})

// POST request for upload a profilpic of a specific company
router.post('/:id/upload_picFile', (req, res) => {

	const companyID = req.params.id
	const files = req.files

	if(!companyID) return res.status(400).json({Error: "companyID is missing"})
	if (!files || Object.keys(files).length === 0) { return res.status(400).send({Error: "no file were uploaded"})
	}
	companyService.savePicforOneCompany(req.params.id, req.files.picFile, (err, company) => {
		if (err) {
			return res.status(500).send({ Error: "Error in savePicForOneStudent(): " + err})
		} else if (!company) {
				res.status(404).send({Error:"Could not find company with id: " + companyID})
		} else {
			res.status(200).json(companyService.createSubset(company))
			}
		})
})

// PUT requests
router.put('/:id',utils.isAuthenticated,utils.isCompanyOrAdmin,utils.isOwner, (req, res) => {
	let companyID = req.params.id
	let mail = req.body.email
	adminService.getAdminByMail(mail, (err, result) => {
		if (err) {
			res.status(400).json({ "Error": err })
		} else if (result) {
			res.status(409).json({ "Error": mail + " is already taken." })
		} else {
			studentService.getStudentByMail(mail, (err, result) => {
				if (err) {
					res.status(400).json({ "Error": err })
				} else if (result) {
					res.status(409).json({ "Error": mail + " is already taken." })
				} else {
					companyService.updateCompany(companyID, req.body, (err, result) => {
						if (err) {
							if (JSON.stringify(err).includes("E11000")) {
								res.status(409).json({ "Error": "Email: " + mail + " is already taken." })
							} else {
								res.status(400).json({ "Error": err })
							}
						} else if (!result) {
							res.status(404)
							res.json({ "Error": "Could not find student " + companyID })
						} else {
							res.status(202).json(companyService.createSubset(result))
						}
					})
				}
			})
		}
	})
})

// DELETE requests company and with it the jobs
router.delete('/:id',utils.isAuthenticated,utils.isCompanyOrAdmin,utils.isOwner, (req, res) => {
	jobService.deleteManyJob(req.params.id, (err, result) => {
		if (err) {
			res.status(404).json({ "Error": err })
		} else {
			companyService.deleteCompany(req.params.id, (err, result) => {
				if (err || !result) {
					res.status(404)
					res.json({ "Error": err })
				} else {
					res.status(204).json(companyService.createSubset(result))
				}
			})

		}
	})
})

module.exports = router