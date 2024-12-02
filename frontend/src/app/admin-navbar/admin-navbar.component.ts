import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  username: string = "anja";

  constructor(private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  log_out(){
    localStorage.setItem("logged", "");
    this.router.navigate(["/admin_login"]);
  }
}
