import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../services/orders.service';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-waiter-deliveries',
  templateUrl: './waiter-deliveries.component.html',
  styleUrls: ['./waiter-deliveries.component.css']
})
export class WaiterDeliveriesComponent implements OnInit {

  waiter: User = new User();
  restaurant: Restaurant = new Restaurant();
  orders: Order[] = [];
  options: String[] = ["20-30 minuta", "30-40 minuta", "50-60 minuta"];
  selected_option: string = "";

  err_msg: string = "";

  constructor(private orders_service: OrdersService, private restaurants_service: RestaurantsService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.waiter = JSON.parse(g_str);

      this.restaurants_service.get_restaurant_waiter(this.waiter.username).subscribe(
        data => {
          if(data != null){
            this.restaurant = data;

            this.orders_service.get_pending_orders(this.restaurant.name).subscribe(
              data2 => {
                if(data2 != null){
                  this.orders = data2;
                }
              }
            )
          }
        }
      )
    }

    
  }

  approve_delivery(m: Order){
    if(this.selected_option != ""){
      this.orders_service.approve_order(m, this.selected_option).subscribe(
        () => {
          window.location.reload();
        }
      )
    }
    else{
      this.err_msg = "You must select a delivery time option. ";
    }
  }

  disapprove_delivery(m: Order){
   
    this.orders_service.disapprove_order(m).subscribe(
      () => {
        window.location.reload();
      }
    )
    
  }
}
