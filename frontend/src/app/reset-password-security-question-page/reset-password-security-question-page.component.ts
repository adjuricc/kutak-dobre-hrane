import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-security-question-page',
  templateUrl: './reset-password-security-question-page.component.html',
  styleUrls: ['./reset-password-security-question-page.component.css']
})
export class ResetPasswordSecurityQuestionPageComponent implements OnInit {

  username: string = "";
  answer: string = "";
  err_msg: string = "";

  constructor(private users_service: UsersService, private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  reset(){
    if(this.username != "" && this.answer != ""){
      this.users_service.check_security_answer(this.username, this.answer).subscribe(
        data => {
          if(data != null){
            if(data){
              localStorage.setItem("username", this.username);
              this.router.navigate(['new_password_form']);
            }
          }
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
      this.err_msg = "All fields are mandatory. ";
    }
  }

}
