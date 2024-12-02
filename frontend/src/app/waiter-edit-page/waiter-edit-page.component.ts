import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';
import { RestaurantsService } from '../services/restaurants.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-waiter-edit-page',
  templateUrl: './waiter-edit-page.component.html',
  styleUrls: ['./waiter-edit-page.component.css']
})
export class WaiterEditPageComponent implements OnInit {
  username: string =  "";
  password: string = "";
  answer: string = "";
  name: string =  "";
  surname: string = "";
  gender: string = "";
  address: string =  "";
  phone: string = "";
  email: string = "";
  file: File | null = null;
  file_encoded: string = "";
  credit_number: string = "";

  waiter: User = new User();
  
  err_msg: string = "";

  form_data: FormData = new FormData();

  default_profile_photo: string = "../../assets/profile-photo.jpg";

  constructor(private users_service: UsersService, private router: Router, private reservations_service: ReservationsService, private restaurants_service: RestaurantsService, private orders_service: OrdersService) {}

  ngOnInit(): void {
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.waiter = JSON.parse(g_str);
    }
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

  update(){
    // ne zaboravi localStorage da promenis
    const reg_password = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    const reg_phone = /^\+3816\d{8}$/;
    const reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const form_data = new FormData();
    if(this.file){
      form_data.append('file', this.file);
    }
    

    if(this.password != "" && !reg_password.test(this.password)){
      this.err_msg = "Password must have between 6 and 10 characters, it has to start with a letter, it has to have at least one capital letter, three small letters, one number and one special character! ";
      return;
    }

    if(this.phone != "" && !reg_phone.test(this.phone)){
      this.err_msg = "Invalid phone number format.";
      return;
    }

    if(this.email != "" && !reg_email.test(this.email)){
      this.err_msg = "Invalid email format.";
      return;
    }
    
    let file_to_appload: File | string;

    if(this.file == null)
      file_to_appload = this.default_profile_photo;
    else
      file_to_appload = this.file;

    this.form_data.append('old_username', this.waiter.username);
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
    this.form_data.append('active', ""+this.waiter.active);

    this.users_service.update_user(this.form_data).subscribe(
      data => {
        if(data != null){
          this.reservations_service.update_reservation(data, this.waiter.username).subscribe(
            () => {
              
            }
          )
          this.restaurants_service.update_restaurant(data, this.waiter.username).subscribe(
            () => {

            }
          )
          localStorage.setItem("logged", JSON.stringify(data));
          this.router.navigate(["waiter", data.username]);
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

}
