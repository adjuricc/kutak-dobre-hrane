import express from 'express';
import { MealController } from '../controllers/meal.controller';

const meal_router = express.Router();

meal_router.route('/get_meals').post(
    (req, res) => new MealController().get_meals(req, res)
);


export default meal_router;