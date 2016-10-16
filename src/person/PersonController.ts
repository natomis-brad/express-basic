import { IPerson } from "./PersonModel";
import { IDatabase } from "../database";
import * as q from "q";

export default class PersonController {

    private database: IDatabase;

    constructor(db: IDatabase) {
        this.database =  db;
    }

    public Get(id: string) {
        let result = q.defer();
        this.database.PersonModel.findOne({ _id: id }).lean(true).then((Person: IPerson) => {
            if (Person) {
                return result.resolve(Person);
            } else {
                return result.resolve({"message":"Person Not Found", "statusCode":"404"});
            }
        }).catch((error) => {
            return result.reject({"message":error, "statusCode":"500"});
        });
        return result.promise;
    }

    public GetAll(top?: number, skip?:number) {
        let result = q.defer();
        this.database.PersonModel.find().lean(true).skip(skip).limit(top).then((Persons: Array<IPerson>) => {
            if (Persons) {
                return result.resolve(Persons);
            } else {
                return result.resolve({"message":"Person Not Found", "statusCode":"404"});
            }
        }).catch((error) => {
            return result.reject({"message":error, "statusCode":"500"});
        });
        return result.promise;
    }

    public Create(model:any) {
        let result = q.defer();
        this.database.PersonModel.create(model).then((Person) => {
            if (Person) {
                return result.resolve(Person);
            } else {
                return result.resolve({"message":"Person Not Found", "statusCode":"404"});
            }
        }).catch((error) => {
            return result.reject({"message":error, "statusCode":"500"});
        });
        return result.promise;
    }

    public Update(id: string, model:any) {
        let result = q.defer();
        this.database.PersonModel.findByIdAndUpdate({ _id: id}, { $set: model }, { new: true })
            .then((Person: IPerson) => {
                if (Person) {
                    return result.resolve(Person);
                } else {
                    return result.resolve({"message":"Person Not Found", "statusCode":"404"});
                }
            }).catch((error) => {
            return result.reject({"message":error, "statusCode":"500"});
        });
        return result.promise;
    }

    public Remove(id: string) {
        let result = q.defer();
        this.database.PersonModel.findOneAndRemove({ _id: id})
            .then((Person: IPerson) => {
                if (Person) {
                    return result.resolve(Person);
                } else {
                    return result.resolve({"message":"Person Not Found", "statusCode":"404"});
                }
            }).catch((error) => {
            return result.reject({"message":error, "statusCode":"500"});
        });
        return result.promise;
    }
}