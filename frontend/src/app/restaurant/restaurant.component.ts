import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../services/restaurants.service';
import { Restaurant } from '../models/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinate } from '../models/helpers/axios';
import { AxiosService } from '../services/axios.service';
import { Rating } from '../models/helpers/rating';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ReservationsService } from '../services/reservations.service';
import { User } from '../models/user';
import { Table } from '../models/helpers/table';
import { Meal } from '../models/meal';
import { MealsService } from '../services/meals.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  guest: User = new User();
  ratings: Rating[] = [];
  tables: Table[] = [];
  coordinate: Coordinate = new Coordinate();
  name: string = "";

  mapUrl: SafeResourceUrl = '';

  date: Date = new Date();
  num_of_guests: string = "";
  additional_info: string = "";

  meals: Meal[] = [];
  ordered_meals: Meal[] = [];


  constructor(private restaurants_service: RestaurantsService, private route: ActivatedRoute, 
    private axios_service: AxiosService, private sanitizer: DomSanitizer, private reservations_service: ReservationsService,
     private meals_service: MealsService, private orders_service: OrdersService, private router: Router){}

  ngOnInit(): void {

    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.guest = JSON.parse(g_str);
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('name')?.toString();
      console.log('Route parameter id:', id);

      if(id){
        this.restaurants_service.get_restaurant(id).subscribe(
          data => {
            if(data != null){
              this.restaurant = data;
              this.ratings = this.restaurant.ratings;
              this.tables = this.restaurant.tables;
              const url = `https://maps.google.com/maps?q=${encodeURIComponent(this.restaurant.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
              this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

              console.log(this.restaurant);
              this.meals_service.get_meals(this.restaurant).subscribe(
                data => {
                  if(data != null){
                    this.meals = data;

                    for(let i = 0; i < this.meals.length; i++){
                      this.meals[i].num = 0;
                    }
                  }
                }
              )
              
            }
          }
        )

        
      }
    });

    

  }

  err_msg: string = "";

  timeStringToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds
    return date;
}

  make_a_reservation(){
    // proveri da li radi restoran
    // proveri dostupnost stolova, ako ima dodeli sto
    // napravi rezervaciju

    if(this.date != null && this.num_of_guests != ""){
      let start = this.timeStringToDate(this.restaurant.working_hours.start);
      let start_hours = start.getHours();
      let start_minutes = start.getMinutes()

      let end = this.timeStringToDate(this.restaurant.working_hours.end);
      let end_hours = end.getHours();
      let end_minutes = end.getMinutes()
      
      let date_hours = this.date.getHours();
      let date_minutes = this.date.getMinutes();

      console.log(date_hours);
      console.log(date_minutes);

      if(date_hours < start_hours || date_hours >= end_hours){
        this.err_msg = "Restaurant not working. ";
      }
      else{
        if(date_minutes < start_minutes){
          this.err_msg = "Restaurant not working. ";
        }
        else{
            this.reservations_service.add_reservation(this.tables, this.guest.username, this.guest.name, this.guest.surname, this.restaurant.name,this.date, this.num_of_guests, this.additional_info).subscribe(
              data => {
                if(data != null){
                  console.log("ok");
                  // rezervisi sto u restoranu
                }
              },
              error => {
                this.err_msg = "Reservation unsuccessful. No tables available. ";
              }
            )
        }
      }
    }
    else{
      this.err_msg = "Date/ number of guests fields are mandatory. ";
    }

    
  }

  make_an_order(){
    for(let i = 0; i < this.meals.length; i++){
      if(this.meals[i].num != 0){
        this.ordered_meals.push(this.meals[i]);
      }
    }

    console.log(this.ordered_meals);

    let meals_to_send = [];

    for(let i = 0; i < this.ordered_meals.length; i++){
      meals_to_send.push({
        name: this.ordered_meals[i].name,
        num: this.ordered_meals[i].num,
        price: this.ordered_meals[i].price
      });
    }


    this.orders_service.add_an_order(this.guest.username, this.restaurant.name, this.guest.address, meals_to_send).subscribe(
      data => {
        if(data != null){
          console.log("dodato");
        }
      },
      error => {
        this.err_msg = error.error.message;
      }
    )
  }

  order_list(){
    for(let i = 0; i < this.meals.length; i++){
      if(this.meals[i].num != 0){
        this.ordered_meals.push(this.meals[i]);
      }
    }

    localStorage.setItem("ordered_meals", JSON.stringify(this.ordered_meals));
    this.router.navigate(["cart"]);
  }
}
