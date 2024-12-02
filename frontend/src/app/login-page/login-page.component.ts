import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(private users_service: UsersService, private router: Router){}

  username: string = "";
  password: string = "";
  err_msg: string = "";

  user: User = new User();

  ngOnInit(): void {
  }

  login(){
    if(this.username != "" && this.password != ""){
      this.users_service.login(this.username, this.password).subscribe(
        data => {
          if(data != null){
            this.user = data;
            localStorage.setItem("logged", JSON.stringify(this.user));
            
            if(this.user.type == "konobar"){
              this.router.navigate(["waiter", this.user.username]);
            }
            else if(this.user.type == "gost"){
              this.router.navigate(["guest", this.user.username]);
            }
          }
        },
        error => {
          if (error.status === 404) {
            this.err_msg = "No user found. Please try again. ";
          } else {
            this.err_msg = "Error. Please try again. ";
          }
        }
      );
    }
    else{
      this.err_msg = "Enter all the fields. ";
    }
  }

  reg_page(){
    this.router.navigate(["registration"]);
  }

  reset_password_page(){
    // localStorage.setItem("user_reset", this.username);
    this.router.navigate(["reset_password"]);
  }

}
