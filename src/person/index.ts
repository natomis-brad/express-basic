import {Router} from 'express';
const person = Router();
import PersonController from "./PersonController";
import * as Configs from "../configurations";
import * as Database from "../database"

let db = Database.init(Configs.getDatabaseConfig());

let pc: PersonController = new PersonController(db);

person.get('/:id', function (req, res, next) {
    let id = req.params.id || 0;

    if (!req.params) {
        res.statusCode = 420;
        res.send("ID Missing");
    }
    else if (id === 0) {
        res.statusCode = 420;
        res.send("ID Missing");
    } else {
        pc.Get(id)
            .then(result => {
                res.send(result);
            }).catch(error => {
            res.send(error);
        });
    }

});

person.get('/', function (req, res, next) {
    pc.GetAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
        res.send(error);
    })
});

person.delete('/:id', function (req, res, next) {
    let id = req.params.id || 0;

    if (!req.params) {
        res.statusCode = 420;
        res.send("ID Missing");
    }
    else if (id === 0) {
        res.statusCode = 420;
        res.send("ID Missing");
    } else {

        pc.Remove(id)
            .then(result => {
                res.send(result);
            }).catch(error => {
            res.send(error);
        });
    }
});

person.put('/:id', function (req, res, next) {
    let errors = [];
    let id = req.params.id || 0;
    if (!req.params) {
        errors.push("Person Id Missing");
    }
    if (id === 0) {
        errors.push("Person Id Missing");
    }
    let postModel = populateMessageBody(req, errors);
    if (errors.length > 0) {
        res.statusCode = 420;
        res.send(errors);
    } else {
        pc.Update(id, postModel)
            .then(result => {
                res.send(result);
            }).catch(error => {
            res.send(error);
        })
    }
});

person.post('/', function (req, res, next) {
    let errors = [];
    let postModel = populateMessageBody(req, errors);

    if (errors.length > 0) {
        res.statusCode = 420;
        res.send(errors);
    } else {
        pc.Create(postModel)
            .then(result => {
                res.send(result);
            }).catch(error => {
            next(error);//res.send(error);
        });
    }
});

function populateMessageBody(req, errors) {

    let body = req.body || 0;

    if (body === 0) {
        errors.push("Message Body Missing");
    }

    if (errors.length > 0) {
        let err = new Error(errors);
        err["statusCode"] = 420;
    }

    let postModel = {};


    if (!body.first) {
        errors.push("First Name Missing");
    } else {
        setProperty(body.first, 'first', postModel);
    }

    if (body.middle) {
        setProperty(body.middle, 'middle', postModel);
    }

    if (!body.last) {
        errors.push("Last Name Missing");
    } else {
        setProperty(body.last, 'last', postModel);
    }

    if (!body.dob) {
        errors.push("DOB Missing");
    } else if (!validateDate(body.dob)) {
        errors.push("DOB Missing");
    } else {
        setProperty(body.dob, 'dob', postModel);
    }
    return postModel;
}

function setProperty(source, destination, targetObject) {
    var isDate = false;
    if (targetObject[destination] instanceof Date) {
        isDate = true;
    }
    if (isDate === false && source !== targetObject[destination]) {
        targetObject.hasChanges = true;
    }
    targetObject[destination] = source;
}

function validateDate(d: any) {
    var testDate = new Date(d);
    return !isNaN(testDate.getTime());
}

export default person;
