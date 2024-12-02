import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit{

  constructor(private users_service: UsersService, private http: HttpClient){}

  student: User = new User();
  base64String: string = "";

  ngOnInit(): void {
    let s_str = localStorage.getItem("logged");

    if(s_str){
      this.student = JSON.parse(s_str);
    }
  }

}
