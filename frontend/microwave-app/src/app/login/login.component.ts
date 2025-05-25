import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
constructor(private auth: LoginService, private router: Router, private toastr: ToastrService) {}

  onLogin(): void {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.toastr.success('Login realizado com sucesso!');
        const token = response.token;
        this.auth.saveToken(token);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastr.error('Erro ao fazer login. Verifique suas credenciais.');
      },
    });
  }
}
