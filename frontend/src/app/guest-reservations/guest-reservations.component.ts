import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { User } from '../models/user';
import { ReservationsService } from '../services/reservations.service';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit {

  // reservation status values: pending, approved, disapproved, cancelled, came, notcame

  archived_reservations: Reservation[] = []; // status is came, notcame, cancelled
  active_reservations: Reservation[] = []; // status is approved

  guest: User = new User();

  new_review: string = "";
  new_rating: number = 0;

  err_msg: string = "";

  constructor(private reservations_service: ReservationsService, private restaurants_service: RestaurantsService){}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.guest = JSON.parse(g_str);
    }

    this.reservations_service.get_done_reservations(this.guest.username, "came").subscribe(
      data => {
        if(data != null){
          this.archived_reservations = data;
          this.sortByDateDescending();
        }
      }
    )

    this.reservations_service.get_current_reservations(this.guest.username).subscribe(
      data => {
        if(data != null){
          this.active_reservations = data;
        }
      }
    )
  }

  sortByDateDescending() {
    this.archived_reservations.sort((a, b) => {
      const dateA = new Date(a.dt_of_reservation.replace(/-/g, '/'));
      const dateB = new Date(b.dt_of_reservation.replace(/-/g, '/'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  button_active(rating: number, review: string){
    if(rating == 0 && review == ""){
      return false;
    }
    return true;
  }

  leave_a_review(rating: number, review: string, r: Reservation){
    this.reservations_service.add_a_review(rating, review, r).subscribe(
      data => {
        if(data != null){
          this.restaurants_service.update_ratings(data).subscribe(
            data2 => {
              if(data2 != null){
                console.log("ok");
                window.location.reload();
              }
            }
          )
        }
      }
    )
  }

  cancel_reservation(r: Reservation){
    this.reservations_service.cancel_reservation(r).subscribe(
      data => {
        if(data != null){
          console.log("ok")
        }
      },
      error => {
        this.err_msg = error.error.message;
      }
    )
  }

}
