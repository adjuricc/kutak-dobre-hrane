import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { ProfilePicture } from '../models/helpers/profile.picture';
import { UserRequest } from '../models/helpers/user-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post<User>(`${this.back}/users/login`, data);
  }

  register(form_data: FormData){
    return this.http.post<boolean>(`${this.back}/users/registerGuest`, form_data);
  }

  activate_user(username: string){
    const data = {
      username: username
    }
    return this.http.put(`${this.back}/users/activate_user`, data);
  }

  reset_password_with_old(username: string, old_password: string, new_password: string){
    const data = {
      username: username,
      old_password: old_password,
      new_password: new_password
    }

    return this.http.put<any>(`${this.back}/users/reset_password_with_old`, data);
  }

  check_security_answer(username: string, answer: string){
    const data = {
      username: username,
      answer: answer
    }

    return this.http.post<any>(`${this.back}/users/check_security_answer`, data);
  }

  change_password(username: string, new_password: string){
    const data = {
      username: username,
      new_password: new_password
    }

    return this.http.put<any>(`${this.back}/users/change_password`, data);
  }

  update_user(form_data: FormData){
    return this.http.put<User>(`${this.back}/users/update_user`, form_data);
  }

  get_profile_picture(username: string){
    return this.http.get<ProfilePicture>(`${this.back}/users/getProfilePicture/${username}`);
  }

  update_profile_picture(username: string, photo: string){
    const data = {
      username: username,
      photo: photo
    }
    return this.http.put(`${this.back}/users/updateProfilePicture`, data);
  }
  
  number_of_registered_guests(){
    return this.http.get<number>(`${this.back}/users/number_of_registered_guests`);
  }

  get_all_guests(){
    return this.http.get<User[]>(`${this.back}/users/get_all_guests`);
  }

  get_all_waiters(){
    return this.http.get<User[]>(`${this.back}/users/get_all_waiters`);
  }

   update_accepted(user: UserRequest){
    const data = {
      user: user
    }
    return this.http.put(`${this.back}/users/update_accepted`, data);
   }

   get_user(username: string){
    const data = {
      username: username
    }
    return this.http.post<User>(`${this.back}/users/get_user`, data);
   }
}
