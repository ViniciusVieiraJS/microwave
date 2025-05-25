import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
constructor(private auth: LoginService, private router: Router) {}

  onLogin(): void {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        const token = response.token;
        this.auth.saveToken(token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login falhou:', err);
        alert('Usuário ou senha inválidos.');
      },
    });
  }
}
