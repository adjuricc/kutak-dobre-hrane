import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from '../models/helpers/axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  get_coordinates(address: string){
    const data = {
      address: address
    };

    return this.http.post<Coordinate>(`${this.back}/axios/get_coordinates`, data);
  }
}
