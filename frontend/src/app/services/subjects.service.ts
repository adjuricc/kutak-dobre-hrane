import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }

  back = "http://localhost:4000";

  get_all_subjects(){
    return this.http.get<Subject[]>(`${this.back}/subjects/getAllSubjects`);
  }
}
