import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { ReservationsService } from '../services/reservations.service';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  waiter: User = new User();
  restaurant: Restaurant = new Restaurant();

  
  data_bar_1 = {};

  labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  avg_num_of_guests_per_day_last24m: number[] = [];

  constructor(private reservations_service: ReservationsService, private restaurants_service: RestaurantsService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.waiter = JSON.parse(g_str);

      this.restaurants_service.get_restaurant_waiter(this.waiter.username).subscribe(
        data => {
          if(data != null){
            this.restaurant = data;
            
            console.log(this.restaurant.name);
            this.reservations_service.avg_num_of_guests_per_day_last24m(this.restaurant.name).subscribe(
              data => {
                if(data != null){
                  console.log(data);

                  this.data_bar_1 = {
                    labels: this.labels,
                    datasets: [{
                      label: 'My First Dataset',
                      data: data,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      borderWidth: 1
                    }]
                  };
                }
              }
            )

          }
        }
      )
      
    }
  }
}
