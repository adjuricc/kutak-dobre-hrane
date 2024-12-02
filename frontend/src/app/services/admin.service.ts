import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post<Admin>(`${this.back}/admin/login`, data);
  }

  add_request(name: String, surname: String, username: String, admin_username: string){
    const data = {
      name: name,
      surname: surname,
      username: username,
      admin_username: admin_username
    }
    return this.http.post(`${this.back}/admin/add_requests`, data);
  }

  remove_request(username: string){
    const data = {
      username: username
    }
    return this.http.post(`${this.back}/admin/remove_request`, data);
  }

  get_all_requests(){
    return this.http.get<User[]>(`${this.back}/admin/get_all_requests`);
  }
}
