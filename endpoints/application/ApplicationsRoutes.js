const express = require('express')
const router = express.Router()
const applicationService = require("./ApplicationService")
const util = require("../../utils/AuthenticationUtils")

router.get('/jobs/:id', util.isAuthenticated, util.isCompanyOrAdmin, (req, res) => {
	let id = req.params.id
	applicationService.getApplicationsByJobID(id, (err, result) => {
		if (err || !result) {
			res.status(404).json({ "Error": "Could not find any applications with given ID: " + id })
		} else {
			let helperArray = []
			result.map((element) => {
				helperArray.push(applicationService.createSubset(element))
			})
			res.status(200).json(helperArray)
		}
	})
})

router.get('/students/:id', util.isAuthenticated, util.isStudentOrAdmin, (req, res) => {
	let id = req.params.id
	applicationService.getApplicationsByStudentID(id, (err, result) => {
		if (err || !result) {
			res.status(404).json({ "Error": "Could not find any applications with given ID: " + id })
		} else {
			let helperArray = []
			result.map((element) => {
				helperArray.push(applicationService.createSubset(element))
			})
			res.status(200).json(helperArray)
		}
	})
})

router.post('/', util.isAuthenticated, util.isStudentOrAdmin, (req, res) => {
	applicationService.saveApplication(req.body, (err, result) => {
		if (err) {
			res.status(400).json({ "Error": err.message })
		} else if (!result) {
			res.status(409).json({ "Error": "Application already exists" })
		} else {
			res.status(201).json(applicationService.createSubset(result))
		}
	})
})

// PUT requests
router.put('/:applicationID', util.isAuthenticated, util.isStudentOrAdmin, util.isOwnerOfApplication, (req, res) => {

	const application = res.locals.application
	const reqDocuments = req.body.visibleDocuments

	if (!application) return res.status(404).json({ Error: "No application found with ID " + req.params.applicationID })
	if (!reqDocuments || !Array.isArray(reqDocuments)) return res.status(401).json({ Error: "No updated documents given" })

	applicationService.updateApplication(application, reqDocuments, (error, result) => {
		if (error) {
			res.status(400).json({ Error: "Error in updateApplication(): " + error })
		} else {
			res.status(202).json(applicationService.createSubset(result))
		}
	})
})

// DELETE application
router.delete('/:applicationID', util.isAuthenticated, util.isStudentOrAdmin, util.isOwnerOfApplication, (req, res) => {

	const applicationID = req.params.applicationID
	
	if (!applicationID) return res.status(400).json({ Error: "applicationID missing" })
	
	applicationService.deleteApplication(applicationID, (error, result) => {
		if (error) {
			res.status(500).json({ Error: "Error in deleteApplication(): " + error })
		} else if (!result) {
			res.status(404).json({ Error: "No application found with ID " + applicationID })
		} else {
			res.status(204).json(applicationService.createSubset(result))
		}
	})
})

// DELETE permission
router.put('/:applicationID/deletePermission', util.isAuthenticated, util.isStudentOrAdmin, util.isOwnerOfApplication, (req, res) => {

	const applicationID = req.params.applicationID
	const studentID = res.locals.payload.id
	const documentsToDelete = req.body.visibleDocuments

	if (!applicationID) return res.status(400).json({ Error: "applicationID missing" })
	if (!studentID) return res.status(500).json({ Error: "missing studentID from middleware" })
	if (!documentsToDelete || documentsToDelete.length === 0) return res.status(400).json({ Error: "No documents chosen for deleting" })

	applicationService.getApplicationByID(applicationID, (error, application) => {

		if (error) {
			res.status(500).json({ Error: "Error in getApplicationByID(): " + error })
		} else if (!application) {
			res.status(404).json({ Error: "Could not find application with ID " + applicationID })
		} else {
			if (studentID && (application.studentID.equals(studentID))) {

				applicationService.deletePermission(applicationID, documentsToDelete, (error, result) => {
					if (error) {
						return res.status(500).json({ Error: "Error in deletePermission(): " + error })
					} else if (!result) {
						return res.status(404).json({ Error: "No application found with ID " + applicationID })
					} else {
						res.status(204).json(applicationService.createSubset(result))
					}
				})
			} else {
				res.status(401).json({ Error: "That's not your application" })
			}
		}
	})
})
module.exports = router
