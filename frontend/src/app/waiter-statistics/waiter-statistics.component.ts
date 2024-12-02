import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { User } from '../models/user';
import { ReservationsService } from '../services/reservations.service';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-waiter-statistics',
  templateUrl: './waiter-statistics.component.html',
  styleUrls: ['./waiter-statistics.component.css']
})
export class WaiterStatisticsComponent implements OnInit {

  constructor(private reservations_service: ReservationsService, private restaurants_service: RestaurantsService, private router: Router){}

  ngOnInit(): void {

  }

  go_to_bar_chart(){
    this.router.navigate(["waiter_bar_chart"]);
  }

  go_to_pie_chart(){
    this.router.navigate(["waiter_pie_chart"]);
  }
  
  go_to_histogram(){
    this.router.navigate(["waiter_histogram"]);
  }
  
}
