import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { UserRequest } from '../models/helpers/user-request';

@Component({
  selector: 'app-admin-guest-requests',
  templateUrl: './admin-guest-requests.component.html',
  styleUrls: ['./admin-guest-requests.component.css']
})
export class AdminGuestRequestsComponent implements OnInit {
  requests: User[] = []


  constructor(private admin_service: AdminService, private users_service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.admin_service.get_all_requests().subscribe(
      data => {
        if(data != null){
          this.requests = data;
        }
      }
    )
  }

  accept(request: UserRequest){
    this.users_service.activate_user(request.username).subscribe(
      () => {
        this.admin_service.remove_request(request.username).subscribe(
          () => {
            
            
            // this.router.navigate(["admin", request.username]);
          }
        )
        window.location.reload();
      }
    )
  }

  err_msg: string = "";

  deny(request: UserRequest){
    this.users_service.update_accepted(request).subscribe(
      () => {
        this.admin_service.remove_request(request.username).subscribe(
          () => {
            
            
            // this.router.navigate(["admin", request.username]);
          }
        )
        window.location.reload();
      }
    )
    // window.location.reload();
  }

}
