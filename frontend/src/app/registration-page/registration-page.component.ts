import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit{

  // default_profile_photo: string = "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOmUzM2NmNzc0LWEzOGYtNDRhNS04MDYwLTk0OTgwNzJjZmUyNTwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmI2ZDUyZjNjLWY2ODYtNGRiNy1hY2U5LWY5OTk4NTM3YTQwNjwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/8AACwgBaAFoAQERAP/EABwAAQACAwEBAQAAAAAAAAAAAAAFBgEEBwMCCP/EADwQAQABAwIBCAcIAQMFAQAAAAABAgMEBREGEhYhMVFTkZMTIkFhcaGxNEJSYnOBwdEyFCNyJDNEY4Ph/9oACAEBAAA/AP2WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";

  constructor(private users_service: UsersService, private admin_service: AdminService, private router: Router){}

  username: string = "";
  password: string = "";
  name: string = "";
  surname: string = "";
  gender: string = "";
  address: string = "";
  phone: string = "";
  email: string = "";
  credit_number: string = "";
  file: File | null = null;
  // file_encoded: string = "";
  answer: string = "";
  form_data: FormData = new FormData();

  err_msg: string = "";
  default_profile_photo: string = "../../assets/profile-photo.jpg";

  user: User = new User();

  ngOnInit(): void {
  }

  on_file_selected(event: any){
    this.file = event.target.files[0];

    if(this.file){
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          if (
            img.width < 100 ||
            img.height < 100 ||
            img.width > 300 ||
            img.height > 300
          ) {
            this.err_msg = 'Velicina fotografije mora biti izmedju 100x100 i 300x300 piksela.';
          } else {
            // this.file_encoded = e.target.result.split(',')[1];
            this.err_msg = '';

            if(this.file){
              this.form_data.append('file', this.file, this.file.name);
            }
            
          }
        }
      };

      reader.readAsDataURL(this.file);
    }
  }

  register(){
    console.log("???");
    this.err_msg = "";
    
    if(this.username != "" && this.password != "" && this.answer != "" && this.name != "" && this.surname != "" && this.gender != "" && this.address != "" && this.phone != ""
    && this.email != "" && this.credit_number != ""){
      const reg_password = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
      const reg_phone = /^\+3816\d{8}$/;
      const reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(reg_password.test(this.password)){
        if(reg_phone.test(this.phone)){
          if(reg_email.test(this.email)){
            // IZMENI

            let file_to_appload: File | string;

            if(this.file == null)
              file_to_appload = this.default_profile_photo;
            else
              file_to_appload = this.file;

            this.form_data.append('username', this.username);
            this.form_data.append('password', this.password);
            this.form_data.append('answer', this.answer);
            this.form_data.append('name', this.name);
            this.form_data.append('surname', this.surname);
            this.form_data.append('gender', this.gender);
            this.form_data.append('address', this.address);
            this.form_data.append('phone', this.phone);
            this.form_data.append('email', this.email);
            this.form_data.append('type', "gost");
            this.form_data.append('credit_number', this.credit_number);
            this.form_data.append('active', '0');
            this.users_service.register(this.form_data).subscribe(
              data => {
                if(data != null){
                  if(data){
                    this.err_msg = "ok";
                    this.admin_service.add_request(this.name, this.surname, this.username, "anja").subscribe(
                    
                    )
                    this.router.navigate([""]);
                  }

                  
                }
              },
              error => {
                if(error.status == 500){
                  this.err_msg = "Registration failed. ";
                }
                if(error.status == 404){
                  this.err_msg = error.error.message;
                }  
              }
            )
          }
          else{
            this.err_msg = "Invalid format of email address."
          }
        }

        else{
          this.err_msg = "Invalid format of the phone number."
        }
        
      }
      else {
        this.err_msg = "Password must have between 6 and 10 characters, it has to start with a letter, it has to have at least one capital letter, three small letters, one number and one special character! ";
      }
    }
    else{
      this.err_msg = "All fields are mandatory.";
      
    }
  }
  
}