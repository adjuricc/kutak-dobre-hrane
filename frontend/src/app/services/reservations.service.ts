import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Table } from '../models/helpers/table';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  add_reservation(tables: Table[], username: string, guest_name: string, guest_surname: string, restaurant_name: string, date: Date, guests_number: string, additional_info: string){
    const data = {
      tables: tables,
      username: username,
      guest_name: guest_name,
      guest_surname: guest_surname,
      restaurant_name: restaurant_name,
      guests_number: guests_number,
      additional_info: additional_info,
      date: date,
      dt_of_reservation: new Date(),
      reserved_table: -1
    }

    return this.http.post<Reservation>(`${this.back}/reservations/add_reservation`, data);
  }

  get_done_reservations(username: string, status: string){
    const data = {
      username: username,
      status: status
    }
    return this.http.post<Reservation[]>(`${this.back}/reservations/get_done_reservations`, data);
  }

  add_a_review(rating: number, review: string, r: Reservation){
    const data = {
      rating: rating,
      review: review,
      reservation: r
    }
    return this.http.post<Reservation>(`${this.back}/reservations/add_a_review`, data);
  }

  get_current_reservations(username: string){
    const data = {
      username: username,
      status: "approved"
    }
    return this.http.post<Reservation[]>(`${this.back}/reservations/get_current_reservations`, data);
  }

  get_active_reservations(username: string){
    const data = {
      username: username,
      status: "approved"
    }
    return this.http.post<Reservation[]>(`${this.back}/reservations/get_active_reservations`, data);
  }

  get_current_reservations_by_restaurant(r: Reservation){
    const data = {
      reservation: r,
      status: "approved"
    }
    return this.http.post<Reservation[]>(`${this.back}/reservations/get_current_reservations_by_restaurant`, data);
  }

  cancel_reservation(r: Reservation){
    const data = {
      reservation: r
    }
    return this.http.put<Reservation>(`${this.back}/reservations/cancel_reservation`, data);
  }

  get_unprocessed_reservations_by_restaurant(restaurant_name: string){
    const data = {
      restaurant_name: restaurant_name
    }
    return this.http.post<Reservation[]>(`${this.back}/reservations/get_unprocessed_reservations_by_restaurant`, data);
  }

  approve_reservation(r: Reservation, selected_table: number, index: number, waiter_username: string){
    const data = {
      reservation: r,
      selected_table: selected_table,
      index: index,
      waiter_username: waiter_username
    }
    return this.http.put<Reservation>(`${this.back}/reservations/approve_reservation`, data);
  }

  disapprove_reservation(r: Reservation, disapprovement_reason: string){
    const data = {
      reservation: r,
      disapprovement_reason: disapprovement_reason
    }
    return this.http.put<Reservation>(`${this.back}/reservations/disapprove_reservation`, data);
  }

  didnt_come(r: Reservation){
    const data = {
      reservation: r
    }
    return this.http.put<Reservation>(`${this.back}/reservations/didnt_come`, data);
  }

  came(r: Reservation){
    const data = {
      reservation: r
    }
    return this.http.put<Reservation>(`${this.back}/reservations/came`, data);
  }

  number_of_guests_per_day(username: string){
    const data = {
      username: username
    }
    return this.http.post<number[]>(`${this.back}/reservations/number_of_guests_per_day`, data);
  }

  avg_num_of_guests_per_day_last24m(restaurant_name: string){
    const data = {
      restaurant_name: restaurant_name
    }
    return this.http.post<number[]>(`${this.back}/reservations/avg_num_of_guests_per_day_last24m`, data);
  }


  update_reservation(u: User, old_username: string){
    const data = {
      username: u.username,
      name: u.name,
      surname: u.surname,
      type: u.type,
      old_username: old_username
    }
    return this.http.put(`${this.back}/reservations/update_reservation`, data);
  }

  num_of_reservations_last24h(){
    return this.http.get<number>(`${this.back}/reservations/num_of_reservations_last24h`);
  }

  num_of_reservations_last7d(){
    return this.http.get<number>(`${this.back}/reservations/num_of_reservations_last7d`);
  }

  num_of_reservations_last1m(){
    return this.http.get<number>(`${this.back}/reservations/num_of_reservations_last1m`);
  }

  
  guests_distribution(waiters: User[]){
    const data = {
      waiters: waiters
    }
    return this.http.post<number[]>(`${this.back}/reservations/guests_distribution`, data);
  }
}
