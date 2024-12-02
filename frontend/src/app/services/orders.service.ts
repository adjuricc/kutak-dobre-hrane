import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Restaurant } from '../models/restaurant';
import { User } from '../models/user';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  add_an_order(username: string, restaurant_name: string, user_address: string, ordered_meals: any[]){
    const data = {
      username:username,
      restaurant_name: restaurant_name,
      user_address: user_address,
      ordered_meals: ordered_meals
    }
    return this.http.post<boolean>(`${this.back}/orders/add_an_order`, data);
  }

  get_active_orders(username: string){
    const data = {
      username: username
    }
    return this.http.post<Order[]>(`${this.back}/orders/get_active_orders`, data);
  }

  get_pending_orders(restaurant_name: string){
    const data = {
      restaurant_name: restaurant_name
    }
    return this.http.post<Order[]>(`${this.back}/orders/get_pending_orders`, data);
  }

  approve_order(o: Order, selected_option: string){
    const data = {
      order: o,
      selected_option: selected_option
    }
    return this.http.put<Order>(`${this.back}/orders/approve_order`, data);
  }

  disapprove_order(o: Order){
    const data = {
      order: o
    }
    return this.http.put<Order>(`${this.back}/orders/disapprove_order`, data);
  }

  update_order(u: User, old_username: string){
    const data = {
      username: u.username,
      name: u.name,
      surname: u.surname,
      type: u.type,
      old_username: old_username
    }
    return this.http.put(`${this.back}/orders/update_order`, data);
  }
}
