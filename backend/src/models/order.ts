import mongoose from "mongoose";
import User from "./user";

const Schema = mongoose.Schema;

let Order = new Schema({
    order_id: {
        type: Number
    },
    username: {
        type: String
    },
    restaurant_name: {
        type: String
    },
    user_address: {
        type: String
    },
    meals: [{
        name: {
            type: String
        },
        num: {
            type: Number
        }
    }],
    order_price: {
        type: Number
    },
    order_date: {
        type: String
    },
    status: {
        type: String
    },
    delivery_time: {
        type: String
    }
});

export default mongoose.model('Order', Order, 'orders');