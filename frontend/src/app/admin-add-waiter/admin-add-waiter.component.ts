import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-admin-add-waiter',
  templateUrl: './admin-add-waiter.component.html',
  styleUrls: ['./admin-add-waiter.component.css']
})
export class AdminAddWaiterComponent implements OnInit {

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

  restaurants: Restaurant[] = [];
  restaurants_names: string[] = [];
  selected_restaurant: string = "";

  constructor(private users_service: UsersService, private restaurants_service: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurants_service.get_all_restaurants().subscribe(
      data => {
        if(data != null){
          this.restaurants = data;
          
        }
      }
    )
  }

  register(){
    
    this.err_msg = "";
    
    if(this.username != "" && this.password != "" && this.name != "" && this.surname != "" && this.gender != "" && this.address != "" && this.phone != ""
    && this.email != "" && this.credit_number != ""){
      const reg_password = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
      const reg_phone = /^\+3816\d{8}$/;
      const reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(reg_password.test(this.password)){
        if(reg_phone.test(this.phone)){
          if(reg_email.test(this.email)){
            // IZMENI

            let file_to_appload: File | string;

            file_to_appload = this.default_profile_photo;
  
            this.form_data.append('username', this.username);
            this.form_data.append('password', this.password);
            this.form_data.append('answer', this.answer);
            this.form_data.append('name', this.name);
            this.form_data.append('surname', this.surname);
            this.form_data.append('gender', this.gender);
            this.form_data.append('address', this.address);
            this.form_data.append('phone', this.phone);
            this.form_data.append('email', this.email);
            this.form_data.append('type', "konobar");
            this.form_data.append('credit_number', this.credit_number);
            this.form_data.append('active', '1');
            this.users_service.register(this.form_data).subscribe(
              data => {
                if(data != null){
                  if(data){
                    // this.err_msg = "ok";
                    console.log(this.username);
                    this.users_service.get_user(this.username).subscribe(
                      data2 => {
                        if(data2 != null){
                          console.log(this.selected_restaurant);
                          this.restaurants_service.add_a_waiter(data2, this.selected_restaurant).subscribe(
                              data3 => {
                                if(data3 != null){
                                  console.log("ok");
                                }
                              }
                          )
                        }
                      }
                    )
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
  }

}
