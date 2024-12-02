import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-profile-page',
  templateUrl: './guest-profile-page.component.html',
  styleUrls: ['./guest-profile-page.component.css']
})
export class GuestProfilePageComponent implements OnInit {
  constructor(private users_service: UsersService, private http: HttpClient, private router: Router){}

  guest: User = new User();
  guest_photo: string = "";
  // base64String: string = "";

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.guest = JSON.parse(g_str);
      if (this.guest.photo && Array.isArray(this.guest.photo.data)) {
        const binaryData = new Uint8Array(this.guest.photo.data);
        const base64String = btoa(String.fromCharCode(...binaryData));
        this.guest_photo = `data:image/jpeg;base64,${base64String}`;
      } else {
        console.error('Invalid guest.photo format:', this.guest.photo);
        // Handle error or fallback
      }
    }
  }

  go_to_edit(){
    this.router.navigate(["guest_edit", this.guest.username]);
  }

}
