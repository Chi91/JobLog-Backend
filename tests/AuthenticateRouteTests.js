// works arround HTTPS Cert, maybe insecure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { spec } = require('pactum');
const { app } = require("../server.js")
const request = require('supertest');
request(app)
// Imported necessary dependencies-----------------

describe('Authenticate-Route-Tests', async () => {
	it('Login mit falschem req.body', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
			  "e-mail": "morpheus",
			  "passworts": "leader"
			}
		  `)
			.expectStatus(400);
	})

	it('Login mit falschem password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
				"email": "defaultadmin@joblog.de",
        		"password": "1asiudha"
			}        
    `)
			.expectStatus(401);
	})

	it('Login mit falscher email', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
        		"email": "falscheMail@joblog.de",
        		"password": "123"
			}
    `)
			.expectStatus(401);
	})

	it('Login mit falscher email und password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
        		"email": "falscheMail@joblog.de",
        		"password": "a9usdbaiskdmasdw"
			}
    `)
			.expectStatus(401);
	})

	it('Login mit richtiger email und password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
        		"email": "defaultadmin@joblog.de",
        		"password": "123"
			}
    `)
			.expectBodyContains(`"jwt":`)
			.expectStatus(200);
	})

	it('Login mit richtiger email und password', async () => {
		await spec()
			.post('https://localhost:443/authenticate')
			.withHeaders('Content-Type', 'application/json')
			.withBody(`
			{
        		"email": "defaultadmin@joblog.de",
        		"password": "123"
			}
    `)
			.expectBodyContains(`"jwt":`)
			.expectStatus(200);
	})
})