import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateHeatingProgram } from '../interfaces/create-heating-program';


@Injectable({
  providedIn: 'root'
})
export class HeatingProgramService {

  constructor(private http: HttpClient) { }

  createProgram(program: CreateHeatingProgram) {
    return this.http.post('http://localhost:5204/api/heating-programs', program);
  }
}
