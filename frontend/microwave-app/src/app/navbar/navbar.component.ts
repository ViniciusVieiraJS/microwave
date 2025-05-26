import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  title = 'Microondas';
  isAuthenticated: boolean = false;
  user = '';
  constructor(private router: Router, private auth: LoginService) {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.user = sessionStorage.getItem('user') || '';
    
  }

  logout() {
    sessionStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
