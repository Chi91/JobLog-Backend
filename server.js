// express setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require("express-fileupload")

const app = express()
const port = 443

app.use(fileUpload({
	limit:{ fileSize: 50 *1024*1024}
}))
app.use(cors());
app.use(bodyParser.json())

// SSL certificates
const fs = require('fs')
const key = fs.readFileSync('./certificates/localhost.key')
const cert = fs.readFileSync('./certificates/localhost.crt')

const https = require('https')
const server = https.createServer({
	key: key,
	cert: cert
}, app)

// define source files for routes
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoutes')
const adminRoutes = require('./endpoints/admin/AdminRoutes')
const companiesRoutes = require('./endpoints/company/CompanyRoutes')
const studentRoutes = require('./endpoints/student/StudentRoutes')
const jobRoutes = require('./endpoints/job/JobRoutes')
const healthzRoutes = require('./endpoints/healthz/HealthzRoute')
const fileUploadRoutes = require("./endpoints/fileUpload/fileUploadRoute")
const fileDownloadRoutes = require("./endpoints/fileDownload/fileDownloadRoute")
const dataRoutes = require("./endpoints/data/DataRoutes")
const applicationRoutes = require("./endpoints/application/ApplicationsRoutes")

// define routes
app.use('/authenticate', authenticationRoutes)
app.use('/admins', adminRoutes)
app.use('/companies', companiesRoutes)
app.use('/students', studentRoutes)
app.use('/jobs', jobRoutes)
app.use('/healthz', healthzRoutes)
app.use('/data', dataRoutes)
app.use('/applications', applicationRoutes)
// error message for non-existing endpoints
// app.all('/*', (req, res, next) => {
// 	res.status(404)
// 	res.json({ "Error": "The requested endpoint does not exist" })
// })
app.use("/fileUpload", fileUploadRoutes)
app.use("/fileDownload", fileDownloadRoutes)

// initialise db connection
const database = require('./db')

console.log("starting API server...")
database.initDB((err, db) => {

	if (db) {
		console.log("database connection established")

		// start webserver
		server.listen(port, () => {
			console.log('API Server listening on port ' + port)
		})

		// check if default admin already exists
		const AdminService = require('./endpoints/admin/AdminService')
		AdminService.checkDefaultAdmin()

	} else if (!db || err) {
		// terminate process with failure code
		console.error("Could not establish a database connection. Terminating.")
		process.exit(1)
	}
})