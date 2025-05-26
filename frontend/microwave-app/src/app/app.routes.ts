import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  {
    path: '',
    component: HomeComponent,
  },
  { path: '**', redirectTo: 'login' },

];
