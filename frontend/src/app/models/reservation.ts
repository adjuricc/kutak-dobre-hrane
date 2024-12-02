import { Meal } from "./meal";

export class Reservation{
    username: string = "";
    guest_name: string = "";
    guest_surname: string = "";
    restaurant_name: string = "";
    guests_number: number = 0;
    additional_info: string = "";
    date: string = "";
    time: string = "";
    dt_of_reservation: string = "";
    reserved_table: number = -1;
    status: string = "pending";
    comment: string = "";
    rating: number = 0;
    review: string = "";
    new_rating: number = 0;
    new_review: string = "";
    responsible_waiter: string = "";
    disapprovement_reason: string = "";
}