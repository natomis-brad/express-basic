import * as Mongoose from "mongoose";

export interface IPerson extends Mongoose.Document {
    first: string;
    middle: string;
    last: string;
    dob: Date;
};

export const PersonSchema = new Mongoose.Schema({
    first: { type: String, required: true },
    middle: { type: String, required: false },
    last: { type: String, required: true },
    dob: { type: Date, required: true }
}, {
    timestamps: true
});

export const PersonModel = Mongoose.model<IPerson>("Person", PersonSchema);
