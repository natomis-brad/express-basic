import Mongoose = require('mongoose');
import { IDataConfiguration } from "./configurations";
import { IPerson, PersonModel } from "./person/PersonModel";

Mongoose.Promise = global.Promise;

export interface IDatabase {
    PersonModel: Mongoose.Model<IPerson>;
}
export function init(config: IDataConfiguration): IDatabase {

    Mongoose.connect(config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        PersonModel: PersonModel
    };
}