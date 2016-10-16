process.env.NODE_ENV = 'test';
import * as Configs from "../../configurations";
const serverConfigs = Configs.getServerConfigs();
import * as Database from "../../database";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as Utils from "../utils";


const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);

let server = require('../../server').app;


let should = chai.should();
chai.use(chaiHttp);


describe('Person Controller Tests', function () {

    beforeEach((done) => {
        Utils.createSeedPersonData(database, done);
    });

    afterEach((done) => {
        Utils.clearDatabase(database, done);
    });

    it('List of Person', function (done) {
        chai.request(server)
            .get('/person')
            .end(function (err, res) {
                res.should.have.status(200); // NOTE: Hapi returns 201, created, weird right?
                done();
            });
    });

    it('Create Person', function (done) {
        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };
        chai.request(server)
            .post('/person')
            .send(person)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Create Person invalid data', function (done) {

        var person = {
            fisrt: "John",
            last: "Doe",
            dob: "smoke"
        };
        chai.request(server)
            .post('/person')
            .send(person)
            .end(function (err, res) {
                res.should.have.status(420);
                done();
            });
    });

    it("Remove Person", (done) => {
        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };

        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };
        var responseBody;
        chai.request(server)
            .post('/person')
            .send(person)
            .end(function (err, res) {
                res.should.have.status(200);
                responseBody = res.body;
                chai.request(server)
                    .del('/person/' + responseBody._id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it("Get Person", (done) => {
        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };

        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };
        var responseBody;
        chai.request(server)
            .post('/person')
            .send(person)
            .end(function (err, res) {
                res.should.have.status(200);
                responseBody = res.body;
                chai.request(server)
                    .get('/person/' + responseBody._id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it("Update Person", (done) => {
        var person = {
            first: "John",
            last: "Doe",
            dob: "1965-03-25"
        };

        var responseBody;
        chai.request(server)
            .post('/person')
            .send(person)
            .end(function (err, res) {
                res.should.have.status(200);
                responseBody = res.body;
                responseBody.first = "updated";
                chai.request(server)
                    .put('/person/' + responseBody._id)
                    .send(responseBody)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

});