import { Menu } from "./helpers/menu";
import { Rating } from "./helpers/rating";
import { Table } from "./helpers/table";
import { WorkingHour } from "./helpers/working-hour";
import { User } from "./user";

export class Restaurant{
    name: string = "";
    address: string = "";
    phone: string = "";
    type: string = "";
    avg_rating: number = 0;
    ratings: Rating[] = [];
    waiters: User[] = [];
    tables: Table[] = [];
    working_hours: WorkingHour = new WorkingHour();
    menu: Menu[] = [];
    description: string = "";
    restaurant_organization: any[] = [];
}