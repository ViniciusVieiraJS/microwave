import { Component } from '@angular/core';
import { UserRegistrationService } from '../services/user-registration.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {

  username = '';
  password = '';

  constructor(private userRegistrationService: UserRegistrationService, private toastrService: ToastrService, private router: Router) { }

  register(): void {
    this.userRegistrationService.register({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.toastrService.success(response.message || 'Cadastro bem-sucedido!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastrService.error('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    });

  }




}
