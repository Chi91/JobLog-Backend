const database = require('../db')

database.initDB((err, db) => {
	if (db) {
		console.log("\n\nDatabase connection established!\nCreating mock data...\n\n")

        db.db.listCollections().toArray((err, names) => {
            console.log("Cleaning the DB...")
            if (err) {
                console.log(err);
            } else {
                names.forEach((value) => {
                    
                    let temp = JSON.stringify(value.name).replace('"', '').replace('"', '')
                    if (temp == "companies" || temp == "jobs" || temp == "students" || temp == "applications") {                        
                        db.db.dropCollection(
                            temp,
                            (err, result) => {
                                console.log( temp + " collection dropped");
                            }
                        );
                    }    
                })
                console.log("DB is clean now!")
                end()
            }
        });  
	} else if (!db || err) {
		console.error("Could not establish a database connection. Terminating.")
        console.error(err)
		process.exit(1)
	}
})   

const end = () => {
    console.log("Succesfully finished creating mock data")
    database.close()
    process.exit()
}