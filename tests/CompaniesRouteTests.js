// works arround HTTPS Cert, maybe insecure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { stash, spec } = require('pactum');
const { app } = require("../server.js")
const request = require('supertest');
request(app)
// Imported necessary dependencies-----------------

describe('Companies-Route-Tests', async () => {
	it('GET all companies, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/companies')
			.expectStatus(200)
            .expectJsonLength(0);
	})
	/*
	it('GET all companies with wrong type in query, optional', async () => {
		await spec()
			.get('https://localhost:443/companies?limit=abc')
			.expectStatus(400);
	})	

	it('GET all companies, with query limit=-1, optional', async () => {
		await spec()
			.get('https://localhost:443/companies?limit=-1')
			.expectStatus(400);
	})*/

	it('Create new company co1', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody({
        		email: "company1@joblog.de",
        		password: "co123",
            	companyName: "Pizza Co.",
                contactPerson: "John Doe",
                applicationEmail: "company1@applications.de"
			})
			.expectStatus(201);
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
			.expectStatus(201);
	})

    it('Login with incorrect email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "wrongMail@joblog.de",
        		password: "co123"
			})
			.expectStatus(401);
	})

    it('Login with incorrect password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "co123asdadwas"
			}
    )
			.expectStatus(401);
	})

    it('Login with correct email and password co1', async () => {
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

    it('Login with correct email and password co2', async () => {
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

    it('Login with co1 email and co2 password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "jeans123"
			})
			.expectStatus(401);
	})
	
	it('Create new company with no email, optional', async () => {        
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		password: "co123",
                companyName: "Pizza Co.",
                contactPerson: "John Doe",
                applicationEmail: "company1@applications.de"
			})
			.expectStatus(400);
	})

    it('Create new company with no password, optional', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
                companyName: "Pizza Co.",
                contactPerson: "John Doe",
                applicationEmail: "company1@applications.de"
			})
			.expectStatus(400);
	})

    it('Create new company with duplicate email, optional', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "co123asdc",
                companyName: "Pasta Co.",
                contactPerson: "John Doe",
                applicationEmail: "company1@applications.de"
			})
			.expectStatus(409);
	})

    it('Create new company with wrong phone format, optional', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company15@joblog.de",
        		password: "co123asdc",
                companyName: "Lasagna Co.",
                contactPerson: "John Doe",
                applicationEmail: "company15@applications.de",
                phone: "+49 abc 1823713!"
			})
			.expectStatus(400);
	})

    it('Create new company with wrong email format, optional', async () => {
		await spec()
			.post('https://localhost:443/companies')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company15.joblog.de",
        		password: "co123asdc",
                companyName: "Lasagna Co.",
                contactPerson: "John Doe",
                applicationEmail: "company15@applications.de"
			})
			.expectStatus(400);
	})

    it('GET all companies, expects list of 2', async () => {
		await spec()
			.get('https://localhost:443/companies')
			.expectStatus(200)
            .stores("co1id", "[0].companyID")
            .stores("co2id", "[1].companyID")
            .stores("co1mail", "[0].email")
            .stores("co2mail", "[1].email")
			.expectBodyContains("companyID")
            .expectJsonLength(2);
	})   
	/*
    it('GET all companies, with query limit=1, optinal', async () => {
		await spec()
			.get('https://localhost:443/companies?limit=1')
			.expectStatus(200)
            .expectJsonLength(1);
	})
	*/
    it('GET company by ID', async () => {
		await spec()
			.get('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.expectStatus(200)
            .expectBodyContains("Pizza Co.");
	})

    it('GET company by wrong ID', async () => {
		await spec()
			.get('https://localhost:443/companies/12931asdask')
			.expectStatus(404);
	})

    it('PUT with wrongID', async () => {
		await spec()
			.put('https://localhost:443/companies/12931asdask')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.expectStatus(401);
	})

    it('PUT with wrong phone format, optional', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.withHeaders('Content-Type', 'application/json')
            .withBody({
            	phone: "asdaisdnacc"
            })
			.expectStatus(400);
	})

    it('PUT with wrong email format, optional', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withPathParams("id", '$S{co1id}')
            .withBody({
                email: "company2joblog.de"
            })
			.expectStatus(400);
	})

    it('PUT with duplicate email, optional', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withPathParams("id", '$S{co1id}')
            .withBody({
                email: "company2@joblog.de"
            })
			.expectStatus(409);
	})
	
    it('PUT new password', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Content-Type', 'application/json')
            .withBody({
                password: "12345"
            })
			.expectStatus(202);
	})

    it('Login with old co1 password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "co123"
			})
			.expectStatus(401);
	})

    it('Login with new co1 password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "12345"
			})
			.expectBodyContains("jwt")
			.expectStatus(200);
	})

    it('PUT new email', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                email: "company22@joblog.de"
            })
			.expectStatus(202);
	})

    it('Login with old co1 email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company1@joblog.de",
        		password: "12345"
			})
			.expectStatus(401);
	})

    it('Login with new co1 email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(
			{
        		email: "company22@joblog.de",
        		password: "12345"
			})
			.expectBodyContains("jwt")
			.expectStatus(200);
	})

    it('PUT new homePage', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                homePage: "https://company22.de"
            })
			.expectStatus(202);
	})

    it('GET co1 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.expectStatus(200)
            .expectBodyContains("https://company22.de");
	})

    it('Update homePage', async () => {
		await spec()
			.put('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Content-Type', 'application/json')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withBody({
                homePage: "https://company.de"
            })
			.expectStatus(202);
	})

    it('GET co1 to confirm update', async () => {
		await spec()
			.get('https://localhost:443/companies/{id}')
            .withPathParams("id", '$S{co1id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
			.expectStatus(200)
            .expectBodyContains("https://company.de");
	})

    it('DELETE co1', async () => {
		await spec()
            .delete('https://localhost:443/companies/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co1jwt)
            .withPathParams("id", '$S{co1id}')
			.expectStatus(204);
	})

    it('GET all companies, expects list of 1', async () => {
		await spec()
			.get('https://localhost:443/companies')
			.expectStatus(200)
            .expectJsonLength(1);
	})

    it('DELETE with wrong companyID', async () => {
		await spec()
            .delete('https://localhost:443/companies/1293812931829381203')
			.expectStatus(401);
	})

    it('DELETE co2', async () => {
		await spec()
			.delete('https://localhost:443/companies/{id}')
			.withHeaders('Authorization', "Bearer " + stash.getDataStore().co2jwt)
            .withPathParams("id", '$S{co2id}')
			.expectStatus(204);
	})    

    it('GET all companies, expects empty list', async () => {
		await spec()
			.get('https://localhost:443/companies')
			.expectStatus(200)
            .expectJsonLength(0);
	})
})