const express = require('express')
const router = express.Router()
const adminService = require("./AdminService")
const authenticationService = require('../../utils/AuthenticationUtils')

// register middleware
//router.use(authenticationService.isAuthenticated)
//router.use(authenticationService.isAdmin)

// GET requests
router.get('/', (req, res, next) => {
	adminService.getAdmins((err, admins) => {
		if (err) {
			res.status(500)
			res.json({ "Error": "An error occured while trying to get admins: " + err })
		} else if (!admins) {
			res.status(404)
			res.json({ "Error": "Could not find admins" })
		} else {
			var helperArray = []
			admins.map((element) => {
				const { mail, isAdmin, ...partialObject } = element
				const subset = { mail, isAdmin }
				helperArray.push(subset)
			})

			res.status(200)
			res.json(helperArray)
		}
	})
})

router.get('/:mail', (req, res) => {
	let mail = req.params.mail
	adminService.getAdminByMail(mail, (err, admin) => {
		if (err) {
			res.status(500)
			res.json({ "Error": "An error occured while trying to get admin " + mail + ": " + err })
		} else if (!admin) {
			res.status(404)
			res.json({ "Error": "Could not find admin " + mail })
		} else {
			const { mail, isAdmin, ...partialObject } = admin
			const subset = { mail, isAdmin }
			res.status(200)
			res.json(subset)
		}
	})
})

// POST requests
router.post('/', (req, res) => {
	let newAdminMail = req.body.mail
	if (newAdminMail == undefined || newAdminMail == null) {
		res.status(400)
		res.json({ "Error": "cannot set a new admin without mail address" })
	} else {
		adminService.saveAdmin(newAdminMail, req.body, (err, result) => {
			if (err) {
				res.status(500)
				res.json({ "Error": "An error occured while trying to save admin " + newAdminMail + ": " + err })
			} else if (!result) {
				res.status(400)
				res.json({ "Error": "Admin " + newAdminMail + " already exists" })
			} else {
				const { mail, isAdmin, ...partialObject } = result
				const subset = { mail, isAdmin }
				res.status(201)
				res.json(subset)
			}
		})
	}
})

// PUT requests
router.put('/:mail', (req, res) => {
	let adminmail = req.params.mail
	adminService.updateAdmin(adminmail, req.body, (err, result) => {
		if (err) {
			res.status(500)
			res.json({ "Error": "An error occured while trying to update " + adminmail + ": " + err })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find admin " + adminmail })
		} else {
			const { mail, isAdmin, ...partialObject } = result
			const subset = { mail, isAdmin }
			res.status(200)
			res.json(subset)
		}
	})
})

// DELETE requests
router.delete('/:mail', (req, res) => {
	let adminmail = req.params.mail
	adminService.deleteAdmin(adminmail, (err, result) => {
		if (err) {
			res.status(500)
			res.json({ "Error": "An error occured while trying to delete " + adminmail + ": " + err })
		} else if (!result) {
			res.status(404)
			res.json({ "Error": "Could not find admin " + adminmail })
		} else {
			const { mail, isAdmin, ...partialObject } = result
			const subset = { mail, isAdmin }
			res.status(204)
			res.json(subset)
		}
	})
})

module.exports = router