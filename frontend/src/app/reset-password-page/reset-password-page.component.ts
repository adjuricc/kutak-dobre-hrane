import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{

  username: string = "";
  old_password: string = "";
  new_password: string = "";
  new_password_again: string = "";
  err_msg: string = "";

  constructor(private users_service: UsersService, private router: Router){}

  ngOnInit(): void {
  }

  reset(){
    const reg_password = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if(this.username != "" && this.old_password != "" && this.new_password != "" && this.new_password_again != ""){
      if(reg_password.test(this.new_password) && reg_password.test(this.new_password_again)){
        if(this.new_password == this.new_password_again){
          this.users_service.reset_password_with_old(this.username, this.old_password, this.new_password).subscribe(
            ()=>{
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
          this.err_msg = "They have to match. ";
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

  sec_question_page(){
    this.router.navigate(['security_question']);
  }
}
