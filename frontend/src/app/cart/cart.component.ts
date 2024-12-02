import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart: Meal[] = [];

  constructor(){}

  ngOnInit(): void {
    let c_str = localStorage.getItem("ordered_meals");

    if(c_str){
      this.cart = JSON.parse(c_str);
      console.log(this.cart);
    }
  }

}
