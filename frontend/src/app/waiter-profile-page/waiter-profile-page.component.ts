import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter-profile-page',
  templateUrl: './waiter-profile-page.component.html',
  styleUrls: ['./waiter-profile-page.component.css']
})
export class WaiterProfilePageComponent implements OnInit {
  constructor(private users_service: UsersService, private http: HttpClient, private router: Router){}

  waiter: User = new User();
  waiter_photo: string = "";
  // base64String: string = "";

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.waiter = JSON.parse(g_str);
      if (this.waiter.photo && Array.isArray(this.waiter.photo.data)) {
        const binaryData = new Uint8Array(this.waiter.photo.data);
        const base64String = btoa(String.fromCharCode(...binaryData));
        this.waiter_photo = `data:image/jpeg;base64,${base64String}`;
      } else {
        console.error('Invalid guest.photo format:', this.waiter.photo);
        // Handle error or fallback
      }
    }
  }

  go_to_edit(){
    this.router.navigate(["waiter_edit_page", this.waiter.username]);
  }


}
