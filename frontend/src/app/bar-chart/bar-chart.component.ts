import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  data_bar_1 = {};

  num_of_guests_per_day: number[] = [];

  waiter: User = new User();
  restaurant: Restaurant = new Restaurant();


  constructor(private reservations_service: ReservationsService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.waiter = JSON.parse(g_str);

      

      this.reservations_service.number_of_guests_per_day(this.waiter.username).subscribe(
        data => {
          if(data != null){
            this.num_of_guests_per_day = data;

            this.data_bar_1 = {
              labels: this.labels,
              datasets: [{
                label: 'My First Dataset',
                data: this.num_of_guests_per_day,
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

}
