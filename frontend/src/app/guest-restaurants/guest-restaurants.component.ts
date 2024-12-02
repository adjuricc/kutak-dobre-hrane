import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Router } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { UsersService } from '../services/users.service';
import { MealsService } from '../services/meals.service';

@Component({
  selector: 'app-guest-restaurants',
  templateUrl: './guest-restaurants.component.html',
  styleUrls: ['./guest-restaurants.component.css']
})
export class GuestRestaurantsComponent implements OnInit {
  num_of_restaurants: number = 0;
  num_of_registered_users: number = 0;
  num_of_reservations_last24h: number = 0;
  num_of_reservations_last7d: number = 0;
  num_of_reservations_last1m: number = 0;

  restaurants: Restaurant[] = [];
  searched_restaurants: Restaurant[] = [];
  

  filter_option: string = "none";
  order_option: string = "asc";

  search_input_name: string = "";
  search_input_address: string = "";
  search_input_type: string = "";

  err_msg: string = "";

  starsArray = [1, 2, 3, 4, 5];

  constructor(private router: Router, private restaurants_service: RestaurantsService, private users_service: UsersService, private meals_service: MealsService){}

  ngOnInit(): void {
    this.restaurants_service.number_of_restaurants().subscribe(
      data => {
        if(data != null){
          this.num_of_restaurants = data;
        }
      }
    )

    this.users_service.number_of_registered_guests().subscribe(
      data => {
        if(data != null){
          this.num_of_registered_users = data;
        }
      }
    )

    this.restaurants_service.get_all_restaurants().subscribe(
      data => {
        if(data != null){
          this.restaurants = data;
        }
      }
    )

  }

  apply_filter(){

  }

  apply_order(){
    
  }

  filter(){
    if(this.filter_option == "name" && this.order_option == "asc"){
      this.restaurants.sort((a, b) => {
        // Convert restaurant names to lowercase for case-insensitive sorting
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
  
        // Compare restaurant names
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0; // Names are equal
      });
    }
    else if(this.filter_option == "name" && this.order_option == "desc"){
      this.restaurants.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
  
        if (nameA > nameB) return -1; // Sort descending
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    if(this.filter_option == "address" && this.order_option == "asc"){
      this.restaurants.sort((a, b) => {
        // Convert restaurant names to lowercase for case-insensitive sorting
        const addressA = a.address.toLowerCase();
        const addressB = b.address.toLowerCase();
  
        // Compare restaurant names
        if (addressA < addressB) return -1;
        if (addressA > addressB) return 1;
        return 0; // Names are equal
      });
    }
    else if(this.filter_option == "address" && this.order_option == "desc"){
      this.restaurants.sort((a, b) => {
        const addressA = a.address.toLowerCase();
        const addressB = b.address.toLowerCase();
  
        if (addressA > addressB) return -1; // Sort descending
        if (addressA < addressB) return 1;
        return 0;
      });
    }
    if(this.filter_option == "type" && this.order_option == "asc"){
      this.restaurants.sort((a, b) => {
        // Convert restaurant names to lowercase for case-insensitive sorting
        const typeA = a.type.toLowerCase();
        const typeB = b.type.toLowerCase();
  
        // Compare restaurant names
        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        return 0; // Names are equal
      });
    }
    else if(this.filter_option == "type" && this.order_option == "desc"){
      this.restaurants.sort((a, b) => {
        const typeA = a.type.toLowerCase();
        const typeB = b.type.toLowerCase();
  
        if (typeA > typeB) return -1; // Sort descending
        if (typeA < typeB) return 1;
        return 0;
      });
    }
  }

  on_search(){
    this.restaurants_service.search(this.search_input_name, this.search_input_address, this.search_input_type).subscribe(
      data => {
        if(data != null){
          this.err_msg = "";
          this.searched_restaurants = data;
        }
        else{
          this.searched_restaurants = [];
        }
      },
      error => {
        if(error.status == 404){
          this.searched_restaurants = [];
          this.err_msg = "Restaurant not found. ";
        }
      }
    )
  }
}
