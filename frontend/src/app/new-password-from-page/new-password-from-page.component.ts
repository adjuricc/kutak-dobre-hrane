import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password-from-page',
  templateUrl: './new-password-from-page.component.html',
  styleUrls: ['./new-password-from-page.component.css']
})
export class NewPasswordFromPageComponent implements OnInit {

  usename: string = "";
  new_password: string = "";
  new_password_again: string = "";
  err_msg: string = "";

  constructor(private users_service: UsersService, private router: Router){}

  ngOnInit(): void {
    let u_str = localStorage.getItem("username");

    if(u_str != null)
      this.usename = u_str;
  }

  reset(){
    if(this.new_password != "" && this.new_password_again != ""){
      const reg_password = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
      if(reg_password.test(this.new_password)){
        if(this.new_password == this.new_password_again){
          this.users_service.change_password(this.usename, this.new_password).subscribe(
            () => {
              this.router.navigate([""]);
            },
            error => {
              if (error.status === 404) {
                this.err_msg = error.error.message;
              } else {
                this.err_msg = "Error. Please try again. ";
              }
            }
          )
        }
        else{
          this.err_msg = "New password and new password again must match. ";
        }
      }
      else{
        this.err_msg = "Password must have between 6 and 10 characters, it has to start with a letter, it has to have at least one capital letter, three small letters, one number and one special character! ";
      }
    }
    else{
      this.err_msg = "All fields are mandatory. ";
    }
  }

}
