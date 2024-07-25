// works arround HTTPS Cert, maybe insecure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { stash, spec } = require('pactum');
const { app } = require("../server.js")
const request = require('supertest');
request(app)
// Imported necessary dependencies-----------------

describe('Students-Route-Tests', async () => {
	it('GET all students, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/students')
			.expectStatus(200)
            .expectJsonLength(0);
	})
 /*
	it('GET all students with wrong type in query limit=abc, optional', async () => {
		await spec()
			.get('https://localhost:443/students?limit=abc')
			.expectStatus(400);
	})	

	it('GET all students, with query limit=-1, optional', async () => {
		await spec()
			.get('https://localhost:443/students?limit=-1')
			.expectStatus(400);
	})*/

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
				savedSearches: ["hey"],
                availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  }
				]
			}
    )
			.expectStatus(201);
	})

	it('Create Student with email taken by admin', async () => {
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
                email: "defaultadmin@joblog.de",				
				savedSearches: ["hey"],
                password: "studi123",
                availability: [
                  {
                    "day": 3,
                    "beginn": "10:00",
                    "end": "19:00"
                  },
                  {
                    "day": 4,
                    "beginn": "10:00",
                    "end": "19:00"
				  }
				]
			})
			.expectStatus(409);
	})

	/*it('Create Student with email taken by company', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
                "firstname": "John",
                "lastname": "Doe",
                "fieldID": "Fachbereich VI",
                "courseID": "Angewandte Mathematik (B.Sc.)",
                "phone": "+49 177 17834841",
                "email": "defaultadmin@joblog.de",
                "password": "studi123",
                "availability": [
                  {
                    "day": 3,
                    "beginn": "10:00",
                    "end": "19:00"
                  },
                  {
                    "day": 4,
                    "beginn": "10:00",
                    "end": "19:00"
				  }
				]
			}
    `)
			.expectStatus(409);
	})*/

    it('Create studi 2', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
                firstname: "Jane",
                lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 177 698234234",
                email: "s12346@bht-berlin.de",
                password: "studi1234",
                availability: [
                  {
                	day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  } 
				]
			})
			.expectStatus(201);
	})

    it('Login with incorrect email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "wrongMail@joblog.de",
        		password: "studi123"
			})
			.expectStatus(401);
	})
    
    it('Login with incorrect password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "co123asdadwas"
			})
			.expectStatus(401);
	})
    
    it('Login with correct email and password studi1', async () => {
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

    it('Login with correct email and password studi2', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12346@bht-berlin.de",
        		password: "studi1234"
			})
			.expectBodyContains("jwt")
			.expectStatus(200)
            .stores("studi2jwt", "jwt");
	})
 
    it('Login with studi1 email and studi2 password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "studi1234"
			})
			.expectStatus(401);
	})

	it('Create new student with no email, optional', async () => {        
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		firstname: "Jane",
                lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 177 698234234",
                password: "studi1234",
            	availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  }
				]
			})
			.expectStatus(400);
	})

   it('Create new student with no password, optional', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
            {
			    firstname: "Jane",
            	lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 177 698234234",
                email: "s12346@bht-berlin.de",
                availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                	end: "19:00"
				  }
				]
			})
			.expectStatus(400);
	})

    it('Create new student with duplicate email, optional', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
            {
			    firstname: "Jane",
                lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 177 698234234",
                email: "s12346@bht-berlin.de",
                password: "studi1234",
                availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  }
				]
			})
			.expectStatus(409);
	})

    it('Create new student with wrong phone format, optional', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
            {
			    firstname: "Jane",
                lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 abc 698234234",
                email: "s123467@bht-berlin.de",
                password: "studi1234",
                availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  }
				]
			})
			.expectStatus(400);
	})

    it('Create new student with wrong email format, optional', async () => {
		await spec()
			.post('https://localhost:443/students')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		firstname: "Jane",
                lastname: "Dorian",
                fieldID: "Fachbereich II",
                courseID: "Medieninformatik (B.Sc.)",
                phone: "+49 177 698234234",
                email: "s12346bht-berlin.de",
                password: "studi1234",
                availability: [
                  {
                    day: 3,
                    beginn: "10:00",
                    end: "19:00"
                  },
                  {
                    day: 4,
                    beginn: "10:00",
                    end: "19:00"
				  }
				]
			})
			.expectStatus(400);
	})

    it('GET all students, expects list of 2', async () => {
		await spec()
			.get('https://localhost:443/students')
			.expectStatus(200)
			.expectBodyContains("studentID")
            .stores("studi1id", "[0].studentID")
            .stores("studi2id", "[1].studentID")
            .expectJsonLength(2);
	})   
	/*
    it('GET all students, with query limit=1, optional', async () => {
		await spec()
			.get('https://localhost:443/students?limit=1')
			.expectStatus(200)
            .expectJsonLength(1);
	})

    it('GET all students, with query field=Fakultät 6, optional', async () => {
		await spec()
			.get('https://localhost:443/students?field=Fakultät%202')
			.expectStatus(200)
            .expectBodyContains("John")
            .expectJsonLength(1);
	})

    it('GET all students, with query course=Medieninformatik (B.Sc.), optional', async () => {
		await spec()
			.get('https://localhost:443/students?course=Medieninformatik (B.Sc.)')
			.expectStatus(200)
            .expectBodyContains("Jane")
            .expectJsonLength(1);
	})
*/
    it('GET student by ID', async () => {
		await spec()
			.get('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.expectStatus(200)
            .expectBodyContains("John");
	})

    it('GET student by wrong ID', async () => {
		await spec()
			.get('https://localhost:443/students/12931asdask')
			.expectStatus(404);
	})

    it('PUT with wrongID', async () => {
		await spec()
			.put('https://localhost:443/students/12931asdask')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)			
			.withHeaders('Content-Type', 'application/json')
			.withBody({
                firstname: "Christopher",
				lastname: "Turk"
            })
			.expectStatus(401);
	})

    it('PUT with wrong phone format, optional', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody({
                phone: "asdaisdnacc"
            })
			.expectStatus(400);
	})

    it('PUT with wrong email format, optional', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody({
                email: "company2joblog.de"
            })
			.expectStatus(400);
	})

    it('PUT with duplicate email, optional', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody({
                email: "s12346@bht-berlin.de"
            })
			.expectStatus(409);
	})

    it('PUT new password', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody(
			{
				password: "123"
			})
			.expectStatus(202);
	})

	it('PUT email taken by admin', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody(
			{
				email: "defaultadmin@joblog.de"
			})
			.expectStatus(409);
	})
	/*
	it('PUT email taken by company', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
            .withBody(
			{
				email: "company@joblog.de"
			}
		)
			.expectStatus(409);
	})*/

    it('Login with old studi1 password', async () => {		
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "studi123"
			})
			.expectStatus(401);
	})

    it('Login with new studi1 password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "123"
			})
			.expectBodyContains("jwt")
			.expectStatus(200);
	})

    it('PUT new email for studi1', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody({
                email: "studi22@joblog.de"
            })
			.expectStatus(202);
	})

    it('Login with old studi1 email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "s12345@bht-berlin.de",
        		password: "123"
			})
			.expectStatus(401);
	})

    it('Login with new studi1 email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "studi22@joblog.de",
        		password: "123"
			})
			.expectBodyContains("jwt")
			.expectStatus(200);
	})
	
    it('PUT new savedSearch', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi2jwt)
            .withBody({
                savedSearches: ["https://company22.de"]
            })
			.expectStatus(202);
	})

	it('PUT new savedSearch, wrong format', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi2jwt)					
            .withBody({
                savedSearches: "https://company223.de"
            })
			.expectStatus(400);
	})

	it('PUT new savedSearch again', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi2id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi2jwt)
            .withBody({
                savedSearches: ["Suchbegriff"]
            })
			.expectStatus(202);
	})

    it('GET studi2 to confirm update, test passing is optional', async () => {
		await spec()
			.get('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi2id}')
			.expectStatus(200)
            .expectBodyContains("https://company22.de")
			.expectBodyContains("Suchbegriff");
	})

    it('Update studi1 firstname & lastname', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')			
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
            .withBody({
                firstname: "Christopher",
				lastname: "Turk"
            })
			.expectStatus(202);
	})

    it('GET studi1 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.expectStatus(200)
            .expectBodyContains("Christopher")
			.expectBodyContains("Turk");
	})

	// sollte das einfach durchgehen und nichts verändern ODER Status 400 antworten? 
	// bzw sollte man listen von etwas updaten können oder nur Create und Delete?
	/*
	it('Update studi1 saved searches, test pass is optional', async () => {
		await spec()
			.put('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi2id}')
            .withBody(`{
                "savedSearches": "sollte nicht drin sein"
            }`)
			.expectStatus(400);
	})

	it('GET studi1 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.expectStatus(200)
            .expectBodyContains("Suchbegriff")
			.expectBodyContains("https://company22.de");
	})*/

	it('DELETE studi1', async () => {
		await spec()
            .delete('https://localhost:443/students/{id}')
            .withPathParams("id", '$S{studi1id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi1jwt)
			.expectStatus(204);
	})

    it('GET all students, expects list of 1', async () => {
		await spec()
			.get('https://localhost:443/students')
			.expectStatus(200)
            .expectJsonLength(1);
	})

    it('DELETE with wrong studentID', async () => {
		await spec()
            .delete('https://localhost:443/students/eayoasdas')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi2jwt)
			.expectStatus(401);
	})

    it('DELETE studi2', async () => {
		await spec()
			.delete('https://localhost:443/students/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().studi2jwt)
            .withPathParams("id", '$S{studi2id}')
			.expectStatus(204);
	})    

    it('GET all students, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/students')
			.expectStatus(200)
            .expectJsonLength(0);
	})
}) 
