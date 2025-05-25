import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDTO } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



   private readonly API_URL = 'http://localhost:5204/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginDTO): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.API_URL, credentials, { headers });
  }

  saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
