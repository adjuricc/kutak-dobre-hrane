import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    answer: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    photo: {
        type: Buffer
    },
    type: {
        type: String
    },
    credit_number: {
        type: String
    },
    active: {
        type: Number
    },
    accepted: {
        type: Number
    }
});

export default mongoose.model('User', User, 'users');