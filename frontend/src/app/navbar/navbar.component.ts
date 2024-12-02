import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  user: User = new User();

  constructor(private router:Router){}

  ngOnInit(): void { 
    let g_str = localStorage.getItem("logged");

    if(g_str){
      this.user = JSON.parse(g_str);
    }
  }

  log_out(){
    localStorage.setItem("logged", "");
    this.router.navigate(["/login"]);
  }

}
