const database = require('../db')
const StudentModel = require('../endpoints/student/StudentModel')
const CompanyModel = require('../endpoints/company/CompanyModel')
const JobModel = require('../endpoints/job/JobModel')

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
                createMockData()
            }
        });  
	} else if (!db || err) {
		console.error("Could not establish a database connection. Terminating.")
        console.error(err)
		process.exit(1)
	}
})

const createMockData = () => {
    
    // Creating mockdata for companies
    let company1ID;
    let company2ID;
    
    let company1 = {
        "companyName": "Pizza Co.",
        "contactPerson": "Super Mario",
        "phone": "01111 4958134910",
        "email": "pizza@joblog.com",
        "address": "Pizzastraße 1, 12345 Pizzahausen",
        "homePage": "https://www.google.com/",
        "password": "123",
        "applicationEmail": "applications@pizzaco.de",
        "companyDescription": "Wir sind ein online Bestellservice für Pizza."
    }

    let company2 = {
        "companyName": "Jeans Co.",
        "contactPerson": "Gean Denim",
        "phone": "0146 192834405",
        "email": "jeans@joblog.com",
        "address": "Jeansallee 2, 52344 Hosendorf",
        "homePage": "https://duckduckgo.com/",
        "password": "123",
        "applicationEmail": "applications@jeansco.de",
        "companyDescription": "Wir produzieren handgemachte Hosen."
    }

    // Saving company mockdata in DB
    new CompanyModel(company1).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else if (result){
            company1ID = result._id
            new CompanyModel(company2).save((err, result) => {
                if (err) {
                    console.error(err.message)
                } else if (result){
                    company2ID = result._id
                    stageOne(company1ID, company2ID)
                }
            })
        }
    })
}    


const stageOne = (company1ID, company2ID) => {
    // Creating mockdata for students & jobs
    let count = 0
    let student1 = {
        "courseID": "Medieninformatik (M.Sc.)",
        "fieldID": "Fachbereich VI",
        "firstname": "Elliot",
        "lastname": "Reid",
        "phone": "+49 111 123455678",
        "email": "elliot@joblog.com",
        "password": "123",
        "weeklyHours": 16,
        "savedSearches": ["test", "Praktikum", "Frontend", "Backend"],
        "favoriteCompanies": [company1ID, company2ID],
        "availability": [
            {
                "day": 5,
                "beginn": "12:00",
                "end": "20:00"
            },
            {
                "day": 6,
                "beginn": "12:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "12:00",
                "end": "20:00"
            }
        ]
    }

    let job1 = {
        "companyID": company1ID,
        "companyName": "Pizza Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Frontend", "Vollzeit"],
        "jobTitle": "Frontententwickler*in",
        "jobSummary": "Wir suchen verstärkung für unser Entwicklerteam",
        "jobType": "Vollzeit",
        "salaryPerHour": 17.50,
        "vacation": 30,
        "weeklyHours": 40,
        "benefits": "Kostenlose Pizza",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 6,
                "beginn": "10:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "10:00",
                "end": "20:00"
            }
        ]
    }

    let job2 = {
        "companyID": company1ID,
        "companyName": "Pizza Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Backend", "Teilzeit"],
        "jobTitle": "Backendentwickler*in",
        "jobSummary": "Wir suchen Verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 15,
        "benefits": "Kostenlose Pizza",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "08:45",
                "end": "20:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 6,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "08:00",
                "end": "20:00"
            },
        ]
    }

    let job3 = {
        "companyID": company1ID,
        "companyName": "Pizza Co.",
        "tagList": ["Bäcker", "Vollzeit", "Praktikum"],
        "jobTitle": "Pizzabäcker*in",
        "jobSummary": "Wir suchen Verstärkung für unsere Küche",
        "jobType": "Vollzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 40,
        "benefits": "Kostenlose Pizza",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 2,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 3,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 4,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 5,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 6,
                "beginn": "12:00",
                "end": "22:00"
            },
            {
                "day": 7,
                "beginn": "12:00",
                "end": "22:00"
            }
        ]
    }

    let job4 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Backend", "Teilzeit", "Praktikum"],
        "jobTitle": "Praktikant*in in der Backendentwicklung",
        "jobSummary": "Wir suchen Verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 18.50,
        "vacation": 30,
        "weeklyHours": 10,
        "benefits": "Kostenloser Kaffee und Mate",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "08:45",
                "end": "20:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 6,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "08:00",
                "end": "20:00"
            }
        ]
    }

    let job5 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Frontend", "Teilzeit", "Praktikum"],
        "jobTitle": "Praktikant*in in der Frontendentwicklung",
        "jobSummary": "Wir suchen Verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 18.50,
        "vacation": 30,
        "weeklyHours": 10,
        "benefits": "Kostenloser Kaffee und Mate",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "08:45",
                "end": "20:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 6,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "08:00",
                "end": "20:00"
            }
        ]
    }

    let job6 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "tagList": ["Verkauf", "Vollzeit"],
        "jobTitle": "Verkäufer*in im Jeansladen",
        "jobSummary": "Wir suchen Verstärkung für unser Verkaufsteam",
        "jobType": "Vollzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 40,
        "benefits": "10% Rabatt auf Jeans",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "08:45",
                "end": "20:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 6,
                "beginn": "08:00",
                "end": "20:00"
            },
            {
                "day": 7,
                "beginn": "08:00",
                "end": "20:00"
            }
        ]
    }

    // Saving mockdata in DB
    const target = 7

    new StudentModel(student1).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job1).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job2).save((err, result) => {
        if(err) {
            console.error(err.message)
        }  else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job3).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job4).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job5).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job6).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end()
            }
        }
    })
}

const end = () => {
    console.log("Succesfully finished creating mock data")
    database.close()
    process.exit()
}