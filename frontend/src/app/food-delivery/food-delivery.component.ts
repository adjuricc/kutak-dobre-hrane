import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { User } from '../models/user';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-food-delivery',
  templateUrl: './food-delivery.component.html',
  styleUrls: ['./food-delivery.component.css']
})
export class FoodDeliveryComponent implements OnInit {

  guest: User = new User();
  active_orders: Order[] = [];

  constructor(private orders_service: OrdersService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.guest = JSON.parse(g_str);
    }

    this.orders_service.get_active_orders(this.guest.username).subscribe(
      data => {
        if(data != null){
          this.active_orders = data;
        }
      }
    )
  }

}
