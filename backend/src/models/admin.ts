import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

let Admin = new Schema({
    username: {
        type: String
    },
    password: {
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
    email: {
        type: String
    },
    phone: {
        type: String
    },
    requests: [{
        name: {
            type: String
        },
        surname: {
            type: String
        },
        username: {
            type: String
        }
    }]
});

export default mongoose.model('Admin', Admin, 'admin');