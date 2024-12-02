import { Ingredient } from "./helpers/ingredient";

export class Meal{
    name: string = "";
    photo: string = "";
    price: number = 0;
    ingredients: Ingredient[] = [];
    num: number = 0;
}