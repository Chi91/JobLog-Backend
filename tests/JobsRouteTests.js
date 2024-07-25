// works arround HTTPS Cert, maybe insecure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { stash, spec } = require('pactum');
const { app } = require("../server.js")
const request = require('supertest');
request(app)
// Imported necessary dependencies-----------------

describe('Jobs-Route-Tests', async () => {
	it('GET all jobs, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/jobs')
			.expectStatus(200)
            .expectJsonLength(0);
	})

	it('Create new company co1', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "co123",
                companyName: "Pizza Co.",
            	contactPerson: "John Doe",
                applicationEmail: "company1@applications.de"
			}
    )
			.expectStatus(201)
			.stores("co1id", "companyID");
	})

    it('Create new company co2', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company2@joblog.de",
        		password: "jeans123",
                companyName: "Jeans Co.",
                contactPerson: "Jane Doe",
                applicationEmail: "company2@applications.de"
			})
			.expectStatus(201)
			.stores("co2id", "companyID");
	})

	it('Create studi1', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
                firstname: "John",
                lastname: "Doe",
                fieldID: "Fachbereich VI",
                courseID: "Angewandte Mathematik (B.Sc.)",
                phone: "+49 177 17834841",
                email: "s12345@bht-berlin.de",
                password: "studi123",
				savedSearches: ["hey"]
			})
			.expectStatus(201)
			.stores("studi1id", "studentID");
	})

	it('Login studi1', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "studi123"
			})
			.expectBodyContains("jwt")
			.expectStatus(200)
            .stores("studi1jwt", "jwt");
	})

    it('Login co1', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "co123"
			}
    )
			.expectBodyContains("jwt")
			.expectStatus(200)
            .stores("co1jwt", "jwt");
	})

    it('Login co2', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company2@joblog.de",
        		password: "jeans123"
			})
			.expectBodyContains("jwt")
			.expectStatus(200)
            .stores("co2jwt", "jwt");
	}) 

	it('Create new job job1 with co1 auth', async () => {
		await spec()
			.post('https://localhost:443/jobs')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
				fieldIDs: ["Fachbereich I", "Fachbereich II"],
				courseIDs: ["Architektur (B.Sc.)", "Architektur (B.Sc.)"],
				tagList: ["Praktikum", "Vollzeit"],
				jobType: "Praktikant*in",
        		jobTitle: "Job 1",
				jobSummary: "Hier arbeitet man",
				salaryPerHour: 12.50,
				vacation: 30,
				weeklyHours: 40,
				benefits: "keine",
				weeklyTimeSlots: [{
					day: 1,
					beginn: "08:00",
					end: "16:15"
				}]
			})
			.expectStatus(201)
			.stores("job1id", "jobID");
	})

	it('Create new job job2 with co1 auth', async () => {
		await spec()
			.post('https://localhost:443/jobs')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
				fieldIDs: ["Fachbereich III", "Fachbereich IV"],
				courseIDs: ["Architektur (B.Sc.)", "Architektur (B.Sc.)"],
				tagList: ["Praktikum", "Vollzeit"],
				jobType: "Praktikant*in",
        		jobTitle: "Job 2",
				jobSummary: "Hier arbeitet man auch",
				salaryPerHour: 12.50,
				vacation: 30,
				weeklyHours: 40,
				benefits: "keine",
				weeklyTimeSlots: [{
					day: 1,
					beginn: "08:00",
					end: "16:15"
				}]
			}
    )
			.expectStatus(201)
			.stores("job2id", "jobID");
	})

	it('Create new job job3 with co2 auth', async () => {
		await spec()
			.post('https://localhost:443/jobs')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
				fieldIDs: ["Fachbereich VI"],
				courseIDs: ["Medieninformatik (B.Sc.)", "Medieninformatik (M.Sc.)"],
				tagList: ["Praktikum", "Vollzeit"],
				jobType: "Praktikant*in",
        		jobTitle: "Frontend Enwickler*in",
				jobSummary: "Hier arbeitet man auch",
				salaryPerHour: 12.50,
				vacation: 30,
				weeklyHours: 40,
				benefits: "keine",
				weeklyTimeSlots: [{
					day: 1,
					beginn: "08:00",
					end: "16:15"
				}]
			})
			.expectStatus(201)
			.stores("job3id", "jobID");
	})

	it('Create new job without Authorization header', async () => {
		await spec()
			.post('https://localhost:443/jobs')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
				fieldIDs: ["Fachbereich I", "Fachbereich II"],
				courseIDs: ["Architektur (B.Sc.)", "Architektur (B.Sc.)"],
				tagList: ["Praktikum", "Vollzeit"],
				jobType: "Praktikant*in",
        		jobTitle: "Job 1",
				jobSummary: "Hier arbeitet man",
				salaryPerHour: 12.50,
				vacation: 30,
				weeklyHours: 40,
				benefits: "keine",
				weeklyTimeSlots: [{
					day: 1,
					beginn: "08:00",
					end: "16:15"
				}]
			})
			.expectStatus(401);
	})

	it('Create new job with student Authorization header', async () => {
		await spec()
			.post('https://localhost:443/jobs')
			.withHeaders('Authorization', '{jwt}')
			.withPathParams('jwt', '$S{studi1jwt}')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
				fieldIDs: ["Fachbereich I", "Fachbereich II"],
				courseIDs: ["Architektur (B.Sc.)", "Architektur (B.Sc.)"],
				tagList: ["Praktikum", "Vollzeit"],
				jobType: "Praktikant*in",
        		jobTitle: "Job 1",
				jobSummary: "Hier arbeitet man",
				salaryPerHour: 12.50,
				vacation: 30,
				weeklyHours: 40,
				benefits: "keine",
				weeklyTimeSlots: [{
					day: 1,
					beginn: "08:00",
					end: "16:15"
				}]
			}
    )
			.expectStatus(401);
	})	

    it('GET all jobs, expects list of 3', async () => {
		await spec()
			.get('https://localhost:443/jobs')
			.expectStatus(200)
			.expectBodyContains("jobID")
            .expectJsonLength(3);
	})  

    it('GET job1 by ID', async () => {
		await spec()
			.get('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job1id}')
			.expectStatus(200)
            .expectBodyContains("Pizza Co.")
			.expectBodyContains("companyID")
			.expectBodyContains("Architektur (B.Sc.)")
			.expectBodyContains("Praktikum")
			.expectBodyContains("Praktikant*in")
			.expectBodyContains("Job 1")
			.expectBodyContains("Hier arbeitet man")
			.expectBodyContains("12.5")
			.expectBodyContains("30")
			.expectBodyContains("40")
			.expectBodyContains("keine")
			.expectBodyContains("1")
			.expectBodyContains("08:00")
			.expectBodyContains("16:15");
	})

    it('GET job by wrong ID', async () => {
		await spec()
			.get('https://localhost:443/jobs/12931asdask')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.expectStatus(404);
	})

    it('PUT with wrongID', async () => {
		await spec()
			.put('https://localhost:443/jobs/12931asdask')			
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.expectStatus(404);
	})

    it('PUT new jobTitle for job3', async () => {
		await spec()
			.put('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job3id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.withHeaders('Content-Type', 'application/json')
            .withBody({
                jobTitle: "Neuer Titel"
            })
			.expectStatus(202);
	})

    it('GET job3 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job3id}')
			.expectStatus(200)
            .expectBodyContains("Neuer Titel");
	})

	it('PUT new fieldID for job2, wrong data format', async () => {
		await spec()
			.put('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                fieldIDs: "Fachbereich 5"
            })
			.expectStatus(400);
	})

	it('PUT new fieldID for job2, wrong enum', async () => {
		await spec()
			.put('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                fieldIDs: ["Fachbere"]
            })
			.expectStatus(400);
	})

	it('PUT new fieldID for job2', async () => {
		await spec()
			.put('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                fieldIDs: ["Fachbereich V"]
            })
			.expectStatus(202);
	})

    it('GET job2 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job2id}')
			.expectStatus(200)
            .expectBodyContains("Fachbereich V");
	})	

    it('DELETE with wrong jobID', async () => {
		await spec()
            .delete('https://localhost:443/jobs/eayoasdas')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.expectStatus(404);
	})

    it('DELETE job1', async () => {
		await spec()
            .delete('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job1id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.expectStatus(204);
	})

    it('GET all jobs, expects list of 2', async () => {
		await spec()
			.get('https://localhost:443/jobs')
			.expectStatus(200)
            .expectJsonLength(2);
	})

	it('DELETE job2', async () => {
		await spec()
            .delete('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job2id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.expectStatus(204);
	})

    it('GET all jobs, expects list of 1', async () => {
		await spec()
			.get('https://localhost:443/jobs')
			.expectStatus(200)
            .expectJsonLength(1);
	})

	it('DELETE job3', async () => {
		await spec()
            .delete('https://localhost:443/jobs/{id}')
            .withPathParams("id", '$S{job3id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
			.expectStatus(204);
	})
	
    it('GET all jobs, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/jobs')
			.expectStatus(200)
            .expectJsonLength(0);
	})

	it('DELETE co1', async () => {
		await spec()
            .delete('https://localhost:443/companies/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withPathParams("id", '$S{co1id}')
			.expectStatus(204);
	})

    it('DELETE co2', async () => {
		await spec()
			.delete('https://localhost:443/companies/{id}')			
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
            .withPathParams("id", '$S{co2id}')
			.expectStatus(204);
	})

	it('DELETE studi1', async () => {
		await spec()
			.delete('https://localhost:443/students/{id}')			
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
			.expectStatus(204);
	})    
})