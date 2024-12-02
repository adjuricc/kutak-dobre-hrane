import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller';

const restaurant_router = express.Router();

restaurant_router.route('/number_of_restaurants').get(
    (req, res) => new RestaurantController().number_of_restaurants(req, res)
);

restaurant_router.route('/get_all_restaurants').get(
    (req, res) => new RestaurantController().get_all_restaurants(req, res)
);

restaurant_router.route('/search').post(
    (req, res) => new RestaurantController().search(req, res)
);

restaurant_router.route('/get_restaurant/:name').get(
    (req, res) => new RestaurantController().get_restaurant(req, res)
);

restaurant_router.route('/update_ratings').put(
    (req, res) => new RestaurantController().update_ratings(req, res)
);

restaurant_router.route('/add_a_waiter').put(
    (req, res) => new RestaurantController().add_a_waiter(req, res)
);

restaurant_router.route('/add_restaurant').post(
    (req, res) => new RestaurantController().add_restaurant(req, res)
);

restaurant_router.route('/get_restaurant_waiter').post(
    (req, res) => new RestaurantController().get_restaurant_waiter(req, res)
);

restaurant_router.route('/get_all_waiters').post(
    (req, res) => new RestaurantController().get_all_waiters(req, res)
);

restaurant_router.route('/update_restaurant').put(
    (req, res) => new RestaurantController().update_restaurant(req, res)
);



export default restaurant_router;