import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  guests: User[] = [];
  waiters: User[] = [];
  restaurants: Restaurant[] = [];

  err_msg: string = "";

  constructor(private admin_service: AdminService, private users_service: UsersService, private router: Router, private restaurants_service: RestaurantsService) {}

  ngOnInit(): void {
    this.users_service.get_all_guests().subscribe(
      data => {
        if(data != null){
          this.guests = data;
        }
      },
      error => {
        this.err_msg = error.error.message;
      }
    )

    this.users_service.get_all_waiters().subscribe(
      data => {
        if(data != null){
          this.waiters = data;
        }
      },
      error => {
        this.err_msg = error.error.message;
      }
    )

    this.restaurants_service.get_all_restaurants().subscribe(
      data => {
        if(data != null){
          this.restaurants = data;
        }
      },
      error => {
        this.err_msg = error.error.message;
      }
    )
  }

}
