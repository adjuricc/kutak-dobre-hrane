export class User{
    username: string = "";
    password: string = "";
    answer: string = "";
    name: string = "";
    surname: string = "";
    gender: string = "";
    address: string = "";
    phone: string = "";
    email: string = "";
    photo: { type: string, data: number[] } | null = null;
    type: string = "";
    credit_number: string = "";
    active: number = 0;
    accepted: number = -1;
}