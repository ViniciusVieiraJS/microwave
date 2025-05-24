import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateHeatingProgram } from '../interfaces/create-heating-program';


@Injectable({
  providedIn: 'root'
})
export class HeatingProgramService {
  deleteProgram(id: number) {
    return this.http.delete(`http://localhost:5204/api/heating-programs/${id}`);
  }
  getHeatingOptions() : any {
    return this.http.get('http://localhost:5204/api/heating-programs');
  }

  constructor(private http: HttpClient) { }

  createProgram(program: CreateHeatingProgram) : any {
    return this.http.post('http://localhost:5204/api/heating-programs', program);
  }
}
