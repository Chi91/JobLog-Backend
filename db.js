const mongoose = require('mongoose')
const config = require('./config/config.json')

let db
let connectionString 
// Changes the connectionString depending on Dev Env
if (process.env.DEVENV === "CI"){
	connectionString = config.db.connectionString
} else if (process.env.DEVENV === "DEPLOY"){
	connectionString = process.env.ME_CONFIG_MONGODB_URL
} else {
	connectionString = config.db.connectionStringLocal
}

const connectionOptions = config.db.dbConfigOptions

function initDB(callback) {
	if(db){
		if(callback){
			return callback(null, db)
		} else {
			return callback("You need to define a callback function")
		}
	} else {
		mongoose.set("strictQuery", false)
		mongoose.connect(
			connectionString,
			connectionOptions
		).then(() => {
			// success
			console.log("Connected to database " + connectionString)
			db = mongoose.connection
			callback(null, db)
		}).catch(err => {
			// failure
			console.error("Failed to connect to database " + connectionString)
			console.error(err)
			callback(err)
		})
	}
}

function close() {
	console.log("Closing database connection")
	mongoose.connection.close()
}

module.exports = {
	initDB,
	close
}