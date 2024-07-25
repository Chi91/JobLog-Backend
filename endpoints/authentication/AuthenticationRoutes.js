const express = require('express')
const router = express.Router()
const authenticationService = require('./AuthenticationService.js')

// GET requests
router.post('/', (req, res) => {

	const email = req.body.email
	const password = req.body.password

	if (email && password) {
		// compare passwords
		authenticationService.checkUserPassword({ email, password }, (err, isMatch, userObj) => {
			if (err) {
				res.status(500)
				res.json({ "Error": "Internal error in authenticationService.checkUserPassword(): " + err })
			} else if (isMatch) {
				authenticationService.createToken(userObj, (err, token) => {
					if (err) {
						res.status(500)
						res.json({ "Error": "Internal error in createToken(): " + err })
					} else if (!token) {
						res.status(500)
						res.json({ "Error": "Could not create token" })
					} else if (token) {
						res.set({"Authorization": "Bearer " + token})
						res.status(200)
						res.json({ "jwt": token })
					}
				})
			} else if (!isMatch) {
				res.status(401)
				res.json({ "Error": "Invalid authentication credentials" })
			}
		})
	} else {
		res.status(400)
		res.json({ "Error": "Request body must contain email and password" })
	}
})

module.exports = router