import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../services/restaurants.service';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {


  
  waiter: User = new User();
  restaurant: Restaurant = new Restaurant();

  
  data_pie= {};

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
            this.restaurants_service.get_all_waiters(this.restaurant.name).subscribe(
              data => {
                if(data != null){
                  console.log(data);

                  let usernames: string [] = [];

                  for(let i = 0; i < data.length; i++){
                    usernames.push(data[i].username);
                  }

                  this.reservations_service.guests_distribution(data).subscribe(
                    data2 => {
                      if(data2 != null){
                        this.data_pie = {
                          labels: usernames,
                          datasets: [{
                            label: 'My First Dataset',
                            data: data2,
                            backgroundColor: [
                              'rgb(255, 99, 132)',
                              'rgb(54, 162, 235)',
                              'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
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
      )
  }

  }

}
