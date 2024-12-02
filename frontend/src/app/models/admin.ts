import { User } from "./user";

export class Admin{
    username: string = "";
    password: string = "";
    name: string = "";
    surname: string = "";
    gender: string = "";
    address: string = "";
    email: string = "";
    phone: string = "";
    requests: User[] = [];
}