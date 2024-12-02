import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Reservation } from '../models/reservation';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  number_of_restaurants(){
    return this.http.get<number>(`${this.back}/restaurants/number_of_restaurants`);
  }

  get_all_restaurants(){
    return this.http.get<Restaurant[]>(`${this.back}/restaurants/get_all_restaurants`);
  }

  search(name: string, address: string, type: string){
    const data = {
      name: name,
      address: address,
      type: type
    }

    return this.http.post<Restaurant[]>(`${this.back}/restaurants/search`, data);
  }

  get_restaurant(name: string){
    return this.http.get<Restaurant>(`${this.back}/restaurants/get_restaurant/${name}`);
  }

  update_ratings(r: Reservation){
    const data = {
      reservation: r
    }
    return this.http.put<Restaurant>(`${this.back}/restaurants/update_ratings`, data);
  }

  add_a_waiter(w: User, selected_restaurant: string){
    const data = {
      waiter: w,
      selected_restaurant: selected_restaurant
    }

    return this.http.put<User>(`${this.back}/restaurants/add_a_waiter`, data);
  }

  add_restaurant(name: string, type: string, address: string, description: string, contact_person: string, org: any, menu: any, start: string, end: string){
    const data = {
      name: name,
      type: type,
      address: address,
      description: description,
      contact_person: contact_person,
      org: org,
      menu: menu,
      start: start,
      end: end
    }

    return this.http.post<Restaurant>(`${this.back}/restaurants/add_restaurant`, data);
  }

  get_restaurant_waiter(username: string){
    const data = {
      username: username
    }

    return this.http.post<Restaurant>(`${this.back}/restaurants/get_restaurant_waiter`, data);
  }

  get_all_waiters(name: string){
    const data = {
      name: name
    }

    return this.http.post<User[]>(`${this.back}/restaurants/get_all_waiters`, data);
  }

  update_restaurant(u: User, old_username: string){
    const data = {
      username: u.username,
      name: u.name,
      surname: u.surname,
      type: u.type,
      old_username: old_username
    }
    return this.http.put(`${this.back}/restaurants/update_restaurant`, data);
  }

  
}
