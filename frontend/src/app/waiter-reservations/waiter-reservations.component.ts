import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { RestaurantsService } from '../services/restaurants.service';
import { Restaurant } from '../models/restaurant';
import { Reservation } from '../models/reservation';
import { ReservationsService } from '../services/reservations.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-waiter-reservations',
  templateUrl: './waiter-reservations.component.html',
  styleUrls: ['./waiter-reservations.component.css']
})
export class WaiterReservationsComponent implements OnInit {

  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  waiter: User = new User();
  restaurant: Restaurant = new Restaurant();
  reservations: Reservation[] = [];
  tables: any[] = [];

  selected_table: string = "";
  index: number = -1;

  current_reservations: Reservation[] = [];
  active_reservations: Reservation[] = [];

  denied: string = "";

  constructor(private restaurants_service: RestaurantsService, private reservations_service: ReservationsService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (context) {
      this.ctx = context;
      // this.draw();
    } else {
      console.error('Unable to get 2D context');
    }

    if(g_str){
      this.waiter = JSON.parse(g_str);

      console.log(this.waiter.username);
      this.restaurants_service.get_restaurant_waiter(this.waiter.username).subscribe(
        data => {
          if(data != null){
            this.restaurant = data;

            // MORA DA SE PROVERI DA LI JE STO SLOBODAN
            // sto je slobodan ako se gosti nisu pojavili ili ako je proslo 3 sata
            for(let i = 0; i < this.restaurant.restaurant_organization.length; i++){
              if(this.restaurant.restaurant_organization[i].type == "table"){
                this.tables.push(this.restaurant.restaurant_organization[i]);
              }
            }

            console.log(this.restaurant.restaurant_organization);
            this.draw();
            this.reservations_service.get_unprocessed_reservations_by_restaurant(this.restaurant.name).subscribe(
              data2 => {
                if(data2 != null){
                  this.reservations = data2;
                  this.reservations.sort((a, b) => {
                    const datetimeA = new Date(`${a.date}T${a.time}`);
                    const datetimeB = new Date(`${b.date}T${b.time}`);
                    
                    return datetimeA.getTime() - datetimeB.getTime();
                });
                }
              }
            )

            this.reservations_service.get_active_reservations(this.waiter.username).subscribe(
              data => {
                if(data != null){
                  this.active_reservations = data;
                }
              }
            )
          }
        }
      )
    }



    
  }

  draw(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
   
    // console.log(this.restaurant.restaurant_organization);
    if (this.ctx) {
      
      if(this.restaurant.restaurant_organization){
        for(let i = 0; i < this.restaurant.restaurant_organization.length; i++){
          console.log(this.restaurant.restaurant_organization[i].params);
          this.ctx.strokeStyle = 'black';
          if(this.restaurant.restaurant_organization[i].type == "table"){
            this.ctx.beginPath();

            this.ctx.arc(this.restaurant.restaurant_organization[i].params.x, this.restaurant.restaurant_organization[i].params.y, this.restaurant.restaurant_organization[i].params.r, 0, 2 * Math.PI);

            this.ctx.stroke();
          }
          else if(this.restaurant.restaurant_organization[i].type == "toilet"){
            this.ctx.strokeRect(this.restaurant.restaurant_organization[i].params.x, this.restaurant.restaurant_organization[i].params.y, 100, 100);
          }
          else if(this.restaurant.restaurant_organization[i].type == "kitchen"){
            this.ctx.strokeRect(this.restaurant.restaurant_organization[i].params.x, this.restaurant.restaurant_organization[i].params.y, 200, 100);
          }
        }
      }
    }
    
  }

  approve_reservation(m: Reservation){
    console.log(this.current_reservations);
    for(let i = 0; i < this.current_reservations.length; i++){
      console.log(this.current_reservations[i].reserved_table);
      // console.log(this.selected_table);
      if(this.current_reservations[i].reserved_table == this.index){
        console.log("ZASTO NE ULAZIS");
        this.err_msg = "Table is already reserved.";
        return;
      }
    }
    this.reservations_service.approve_reservation(m, parseInt(this.selected_table), this.index, this.waiter.username).subscribe(
      data => {
        if(data != null){
          this.fill_table(this.index);

        }
      }
    )
  }

  err_msg: string = "";

  disapprove_reservation(m: Reservation){
    if(this.denied != ""){
      this.err_msg = "";
      this.reservations_service.disapprove_reservation(m, this.denied).subscribe(
        data => {
          if(data != null){
            window.location.reload();
          }
        }
      )
    }
    else{
      this.err_msg = "You must give reason of reservation disapprovement. ";
    }
    
  }

  fill_table(ind: number){
    if (this.ctx){
      this.ctx.fillStyle = 'red';

      this.ctx.beginPath();

      this.ctx.arc(this.restaurant.restaurant_organization[ind].params.x, this.restaurant.restaurant_organization[ind].params.y, this.restaurant.restaurant_organization[ind].params.r, 0, 2 * Math.PI);

      this.ctx.fill();
    }
  }

  onTableChange(event: any) {
    const selectedValue = event.value;
    this.index = this.tables.findIndex(table => table === selectedValue);
    console.log(this.index);
    // console.log('Selected table index:', selectedIndex);
  }

  reservation_selected(r: Reservation){
    console.log("??");
    this.reservations_service.get_current_reservations_by_restaurant(r).subscribe(
      data => {
        if(data != null){
          this.current_reservations = data;
          
          for(let i = 0; i < this.current_reservations.length; i++){
            console.log(this.current_reservations[i].reserved_table);
            this.fill_table(this.current_reservations[i].reserved_table);
            // this.tables.splice(this.current_reservations[i].reserved_table, 1);
          }
        }
      }
    )
  }

  dint_come(m: Reservation){
    console.log("uslo");
    this.reservations_service.didnt_come(m).subscribe(
      () => {
        window.location.reload();
      },
      error => {
        this.err_msg = error.error.message;
      }
    )
  }

  came(m: Reservation){
    this.reservations_service.came(m).subscribe(
      () => {
        window.location.reload();
      },
      error => {
        this.err_msg = error.error.message;
      }
    )
    
  }
}
