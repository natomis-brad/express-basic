import * as Database from "../database";

export function createPerson(first: string, middle: string, last: string, dob: string) {
    return {
        fisrt: first,
        middle: middle,
        last: last,
        dob: dob};
}
export function createPersonDummy() {
    return createPerson("A", "Demo", "User", "1980-1-1");
}
export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
    database.PersonModel.remove({})
        .then(() => {
            done();
        }, error => {
            console.log(error);
        });
}
export function createSeedPersonData(database: Database.IDatabase, done: MochaDone) {
    database.PersonModel.create(createPersonDummy(), () => {
        done();
    });
}