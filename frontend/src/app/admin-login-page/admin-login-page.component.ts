import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit {
  constructor(private admin_service: AdminService, private router: Router){}

  username: string = "";
  password: string = "";
  err_msg: string = "";

  user: Admin = new Admin();

  ngOnInit(): void {
  }

  login(){
    if(this.username != "" && this.password != ""){
      this.admin_service.login(this.username, this.password).subscribe(
        data => {
          if(data != null){
            this.user = data;
            localStorage.setItem("logged", JSON.stringify(this.user));
            
            
            this.router.navigate(["admin", this.user.username]);
            
          }
        },
        error => {
          if (error.status === 404) {
            this.err_msg = "Nepostojeći korisnik. Molimo Vas pokušajte ponovo. ";
          } else {
            this.err_msg = "Došlo je do greške. Molimo Vas pokušajte ponovo. ";
          }
        }
      );
    }
    else{
      this.err_msg = "Molimo Vas unesite sve podatke. ";
    }
  }
}
