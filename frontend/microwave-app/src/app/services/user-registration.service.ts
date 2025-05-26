import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../interfaces/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

     private readonly API_URL = 'http://localhost:5204/api/auth/register';


  constructor(private http: HttpClient) { }

  register(user: RegisterDTO): Observable<any> {
    return this.http.post(this.API_URL, user);
  }
}
