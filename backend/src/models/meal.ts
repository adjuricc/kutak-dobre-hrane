import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

let Meal = new Schema({
    name: {
        type: String
    },
    photo: {
        type: String
    },
    price: {
        type: Number
    },
    ingredients: [{
        name: {
            type: String
        }
    }]
});

export default mongoose.model('Meal', Meal, 'meals');