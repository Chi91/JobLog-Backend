const database = require('../db')
const StudentModel = require('../endpoints/student/StudentModel')
const CompanyModel = require('../endpoints/company/CompanyModel')
const JobModel = require('../endpoints/job/JobModel')
const ApplicationModel = require('../endpoints/application/ApplicationModel')

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

    let company3 = {
        "companyName": "Mathefy",
        "contactPerson": "Mathe Mann",
        "phone": "0147 164234505",
        "email": "mathefy@joblog.com",
        "password": "123",
        "applicationEmail": "applications@mathefy.de",
        "companyDescription": "Wir lieben die Mathematik."
    }

    // Saving company mockdata in DB

    new CompanyModel(company3).save((err, result) => {
        if (err) {
            console.error(err.message)
        }
    })

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
                    next(company1ID, company2ID)
                }
            })
        }
    })
}    
let j1, j2, j3, j4, j5, j6, j7, s1, s2, s3, s4, s5

const next = (company1ID, company2ID) => {
    // Creating mockdata for students & jobs
    let count = 0
    let student1 = {
        "courseID": "Medieninformatik (M.Sc.)",
        "fieldID": "Fachbereich VI",
        "firstname": "John",
        "lastname": "Dorian",
        "phone": "+49 111 123455678",
        "email": "john@joblog.com",
        "password": "123",
        "savedSearches": ["test", "Praktikum", "Frontend", "Backend"],
        "favoriteCompanies": [company1ID, company2ID],
        "availability": [
            {
                "day": 1,
                "beginn": "08:00",
                "end": "18:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "18:00"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "10:00"
            },
            {
                "day": 5,
                "beginn": "16:00",
                "end": "22:00"
            },
            {
                "day": 6,
                "beginn": "08:00",
                "end": "22:00"
            },
            {
                "day": 7,
                "beginn": "08:00",
                "end": "22:00"
            }
        ]
    }

    let student2 = {
        "courseID": "Medieninformatik (M.Sc.)",
        "fieldID": "Fachbereich VI",
        "firstname": "Elliot",
        "lastname": "Reid",
        "email": "elliot@joblog.com",
        "password": "123",
        "savedSearches": ["Praktikum", "Frontend", "Backend", "Vollzeit"],
        "favoriteCompanies": [company1ID],
        "availability": [
            {
                "day": 1,
                "beginn": "17:30",
                "end": "22:45"
            },
            {
                "day": 2,
                "beginn": "16:00",
                "end": "22:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "22:00"
            }
        ]
    }

    let student3 = {
        "courseID": "Pharma- und Chemietechnik (M.Eng.)",
        "fieldID": "Fachbereich II",
        "firstname": "Christopher",
        "lastname": "Turk",
        "phone": "+1 166 12123898",
        "email": "christopher@joblog.com",
        "password": "123",
        "savedSearches": ["vollzeit", "pharma", "Praktikum"],
        "favoriteCompanies": [company2ID],
        "availability": [
            {
                "day": 1,
                "beginn": "11:00",
                "end": "14:45"
            },
            {
                "day": 2,
                "beginn": "16:00",
                "end": "22:00"
            },
            {
                "day": 3,
                "beginn": "14:00",
                "end": "20:30"
            },
            {
                "day": 3,
                "beginn": "07:45",
                "end": "10:00"
            },
            {
                "day": 4,
                "beginn": "08:00",
                "end": "22:00"
            }
        ]
    }

    let student4 = {
        "courseID": "Screen Based Media (B.A.)",
        "fieldID": "Fachbereich VI",
        "firstname": "Patrick",
        "lastname": "Star",
        "email": "patrick@joblog.com",
        "password": "123",
        "savedSearches": ["steine", "", " ", "123"],
        "availability": [
            {
                "day": 1,
                "beginn": "08:00",
                "end": "10:00"
            },
            {
                "day": 2,
                "beginn": "16:45",
                "end": "22:00"
            }
        ]
    }

    let student5 = {
        "courseID": "Architektur (B.Sc.)",
        "fieldID": "Fachbereich I",
        "firstname": "Archie",
        "lastname": "Teckt",
        "phone": "+40 823 1234578",
        "email": "archie@joblog.com",
        "password": "123",
        "savedSearches": ["Gebäude", "Archeitektur", "123"],
        "favoriteCompanies": [],
        "availability": [
            {
                "day": 1,
                "beginn": "07:30",
                "end": "10:00"
            },
            {
                "day": 1,
                "beginn": "16:00",
                "end": "22:00"
            },
            {
                "day": 2,
                "beginn": "08:00",
                "end": "16:00"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "15:30"
            },
            {
                "day": 3,
                "beginn": "08:00",
                "end": "16:15"
            },
            {
                "day": 5,
                "beginn": "08:00",
                "end": "10:15"
            }
        ]
    }

    let job1 = {
        "companyID": company1ID,
        "companyName": "Pizza Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Frontend", "Teilzeit", "Praktikum"],
        "jobTitle": "Praktikant*in in der Frontendentwicklung",
        "jobSummary": "Wir suchen verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 20,
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
                "end": "18:00"
            },
            {
                "day": 7,
                "beginn": "10:00",
                "end": "18:00"
            }
        ]
    }

    let job2 = {
        "companyID": company1ID,
        "companyName": "Pizza Co.",
        "fieldIDs": ["Fachbereich VI"],
        "courseIDs": ["Medieninformatik (M.Sc.)", "Medieninformatik (B.Sc.)"],
        "tagList": ["Backend", "Vollzeit", "Praktikum"],
        "jobTitle": "Praktikant*in in der Backendentwicklung",
        "jobSummary": "Wir suchen Verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 40,
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
            }
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
        "tagList": ["Backend", "Vollzeit", "Praktikum"],
        "jobTitle": "Praktikant*in in der Backendentwicklung",
        "jobSummary": "Wir suchen Verstärkung für unser Entwicklerteam",
        "jobType": "Teilzeit",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 40,
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
            }
        ]
    }

    let job5 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "tagList": ["Verkauf", "Vollzeit", "Praktikum"],
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
                "beginn": "10:00",
                "end": "20:00"
            },
            {
                "day": 2,
                "beginn": "10:00",
                "end": "20:00"
            },
            {
                "day": 3,
                "beginn": "10:00",
                "end": "20:00"
            },
            {
                "day": 4,
                "beginn": "10:00",
                "end": "20:00"
            },
            {
                "day": 5,
                "beginn": "10:00",
                "end": "20:00"
            }
        ]
    }

    let job6 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "tagList": ["Verkauf", "Minijob", "Praktikum"],
        "jobTitle": "Verkäufer*in im Jeansladen",
        "jobSummary": "Wir suchen Verstärkung für unser Verkaufsteam",
        "jobType": "Minijob",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 10,
        "benefits": "10% Rabatt auf Jeans",
        "weeklyTimeSlots": [
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

    let job7 = {
        "companyID": company2ID,
        "companyName": "Jeans Co.",
        "tagList": ["Chemie", "Vollzeit", "Praktikum"],
        "jobTitle": "Labor Praktikant",
        "jobSummary": "Wir suchen Verstärkung für unser Laborteam",
        "jobType": "Minijob",
        "salaryPerHour": 15.50,
        "vacation": 30,
        "weeklyHours": 30,
        "benefits": "10% Rabatt auf Jeans",
        "weeklyTimeSlots": [
            {
                "day": 1,
                "beginn": "10:00",
                "end": "17:30"
            },
            {
                "day": 2,
                "beginn": "10:00",
                "end": "17:30"
            },
            {
                "day": 3,
                "beginn": "10:00",
                "end": "17:30"
            },
            {
                "day": 4,
                "beginn": "10:00",
                "end": "17:30"
            },
            {
                "day": 5,
                "beginn": "10:00",
                "end": "15:15"
            }
        ]
    }

    // Saving mockdata in DB
    const target = 12

    new StudentModel(student1).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            s1 = result._id.toString()
            if (count >= target) {
                end()
            }
        }
    })

    new StudentModel(student2).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            s2 = result._id.toString()
            if (count >= target) {
                end()
            }
        }   
    })

    new StudentModel(student3).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            s3 = result._id.toString()
            if (count >= target) {
                end()
            }
        }  
    })

    new StudentModel(student4).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            s4 = result._id.toString()
            if (count >= target) {
                end()
            }
        }   
    })

    new StudentModel(student5).save((err, result) => {
        if (err) {
            console.error(err.message)
        } else {
            count++ 
            s5 = result._id.toString()
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
            j1 = result._id.toString()
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
            j2 = result._id.toString()
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
            j3 = result._id.toString()
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
            j4 = result._id.toString()
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
            j5 = result._id.toString()
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
            j6 = result._id.toString()
            if (count >= target) {
                end()
            }
        }
    })

    new JobModel(job7).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            j7 = result._id.toString()
            if (count >= target) {
                end()
            }
        }
    })    

}

const end = () => {
    const target = 9
    let count = 0
    
    let application1 = {
        jobID: j1,
        studentID: s1
    }

    let application2 = {
        jobID: j1,
       studentID: s3
    }

    let application3 = {
       jobID: j1,
        studentID: s3
    }

    let application4 = {
        jobID: j2,
        studentID: s1
    }

    let application5 = {
        jobID: j2,
        studentID: s4
    }

    let application6 = {
        jobID: j2,
       studentID: s5
    }

    let application7 = {
        jobID: j3,
        studentID: s2
    }

    let application8 = {
        jobID: j3,
        studentID: s3
    }

    let application9 = {
        jobID: j2,
        studentID: s5
    }

    new ApplicationModel(application1).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })
    
    new ApplicationModel(application2).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application3).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application4).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application5).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application6).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application7).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application8).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })

    new ApplicationModel(application9).save((err, result) => {
        if(err) {
            console.error(err.message)
        } else {
            count++ 
            if (count >= target) {
                end2()
            }
        }
    })
}

const end2 = () => {
    console.log("Succesfully finished creating mock data")
    database.close()
    process.exit()
}


const sleep = (milliseconds) => {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}