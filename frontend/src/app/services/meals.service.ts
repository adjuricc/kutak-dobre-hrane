import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  get_meals(restaurant: Restaurant){
    const data = {
      restaurant: restaurant
    }

    return this.http.post<Meal[]>(`${this.back}/meals/get_meals`, data);
  }
}
