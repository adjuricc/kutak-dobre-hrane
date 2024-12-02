import { Meal } from "./meal";

export class Order{
    order_id: number = 0;
    username: string = "";
    restaurant_name: string = "";
    user_address: string = "";
    meals: Meal[] = [];
    order_price: number = 0;
}