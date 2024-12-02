import express from 'express';
import { MealController } from '../controllers/meal.controller';
import { OrderController } from '../controllers/order.controller';

const order_router = express.Router();

order_router.route('/add_an_order').post(
    (req, res) => new OrderController().add_an_order(req, res) 
);

order_router.route('/get_active_orders').post(
    (req, res) => new OrderController().get_active_orders(req, res) 
);

order_router.route('/get_pending_orders').post(
    (req, res) => new OrderController().get_pending_orders(req, res) 
);

order_router.route('/approve_order').put(
    (req, res) => new OrderController().approve_order(req, res) 
);

order_router.route('/disapprove_order').put(
    (req, res) => new OrderController().disapprove_order(req, res) 
);

order_router.route('/update_order').put(
    (req, res) => new OrderController().update_order(req, res) 
);

export default order_router;