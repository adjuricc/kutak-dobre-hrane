import express from 'express';
import { ReservationController } from '../controllers/reservation.controller';

const reservation_router = express.Router();

reservation_router.route('/add_reservation').post(
    (req, res) => new ReservationController().add_reservation(req, res)
);

reservation_router.route('/get_done_reservations').post(
    (req, res) => new ReservationController().get_done_reservations(req, res)
);

reservation_router.route('/add_a_review').post(
    (req, res) => new ReservationController().add_a_review(req, res)
);

reservation_router.route('/get_current_reservations').post(
    (req, res) => new ReservationController().get_current_reservations(req, res)
);

reservation_router.route('/get_active_reservations').post(
    (req, res) => new ReservationController().get_active_reservations(req, res)
);

reservation_router.route('/get_current_reservations_by_restaurant').post(
    (req, res) => new ReservationController().get_current_reservations_by_restaurant(req, res)
);

reservation_router.route('/cancel_reservation').put(
    (req, res) => new ReservationController().cancel_reservation(req, res)
);

reservation_router.route('/get_unprocessed_reservations_by_restaurant').post(
    (req, res) => new ReservationController().get_unprocessed_reservations_by_restaurant(req, res)
);

reservation_router.route('/approve_reservation').put(
    (req, res) => new ReservationController().approve_reservation(req, res)
);

reservation_router.route('/disapprove_reservation').put(
    (req, res) => new ReservationController().disapprove_reservation(req, res)
);

reservation_router.route('/didnt_come').put(
    (req, res) => new ReservationController().didnt_come(req, res)
);

reservation_router.route('/came').put(
    (req, res) => new ReservationController().came(req, res)
);

reservation_router.route('/number_of_guests_per_day').post(
    (req, res) => new ReservationController().number_of_guests_per_day(req, res)
);

reservation_router.route('/guests_distribution').post(
    (req, res) => new ReservationController().guests_distribution(req, res)
);

reservation_router.route('/update_reservation').put(
    (req, res) => new ReservationController().update_reservation(req, res)
);

reservation_router.route('/num_of_reservations_last24h').get(
    (req, res) => new ReservationController().num_of_reservations_last24h(req, res)
);

reservation_router.route('/num_of_reservations_last7d').get(
    (req, res) => new ReservationController().num_of_reservations_last7d(req, res)
);

reservation_router.route('/num_of_reservations_last1m').get(
    (req, res) => new ReservationController().num_of_reservations_last1m(req, res)
);

reservation_router.route('/avg_num_of_guests_per_day_last24m').post(
    (req, res) => new ReservationController().avg_num_of_guests_per_day_last24m(req, res)
);

export default reservation_router;