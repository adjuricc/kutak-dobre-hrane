import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Restaurant = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    avg_rating: {
        type: Number
    },
    ratings: [{
        username: {
            type: String
        },
        rating: {
            type: Number
        },
        review: {
            type: String
        }
    }],
    waiters: [{
        name: {
            type: String
        },
        surname: {
            type: String
        },
        username: {
            type: String
        }
    }],
    tables: [{
        num_of_guests: {
            type: Number
        },
        reserved: {
            type: Number
        }
    }],
    working_hours: {
        start: {
            type: String
        },
        end: {
            type: String
        }
    },
    menu: [{
        meal_name: {
            type: String
        }
    }],
    description: {
        type: String
    },
    restaurant_organization: [{
        type: {
            type: String
        },
        params: {
            x: {
                type: Number
            },
            y: {
                type: Number
            },
            r: {
                type: Number
            }
        },
        num: {
            type: Number
        }
    }]
});

export default mongoose.model('Restaurant', Restaurant, 'restaurants');