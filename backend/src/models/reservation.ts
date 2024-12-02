import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema({
    username: {
        type: String
    },
    guest_name: {
        type: String
    },
    guest_surname: {
        type: String
    },
    restaurant_name: {
        type: String
    },
    guests_number: {
        type: Number
    },
    additional_info: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    dt_of_reservation: {
        type: String
    },
    reserved_table: {
        type: Number
    },
    status: {
        type: String
    },
    comment: {
        type: String
    },
    rating: {
        type: String
    },
    review: {
        type: String
    },
    responsible_waiter: {
        type: String
    },
    disapprovement_reason: {
        type: String
    }
});

export default mongoose.model('Reservation', Reservation, 'reservations');