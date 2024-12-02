
import express from 'express';
import Meal from '../models/meal';

export class MealController{

    get_meals = async (req: express.Request, res: express.Response) => {
        try {
            let restaurant = req.body.restaurant;

            const meals = [];

            for(let i = 0; i < restaurant.menu.length; i++){
                const meal = await Meal.findOne({name: restaurant.menu[i].meal_name});

                if(meal){
                    meals.push(meal);
                }
                else{
                    res.status(404).json("Meal not found");
                }
            }
            if(meals.length > 0)
                res.json(meals);
            else {
                // Handle case where meals array is empty
                res.status(404).json("No meals found");
            }
        } 
        catch (error) {
            console.error('Error', error);
            throw error;
        }
    }
}