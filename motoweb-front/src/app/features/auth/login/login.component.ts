import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  this.authService.login(this.email, this.password).subscribe(success => {
    if (success) {
      const profile = this.authService.getUserProfile();
      const role = profile?.profileType;

      if (role === 'CLIENTE') {
        this.router.navigate(['/cliente']);
      } else if (role === 'CENTRAL') {
        this.router.navigate(['/central']);
      } else if (role === 'MOTOBOY') {
        this.router.navigate(['/motoboy']);
      } else {
        console.warn('Tipo de perfil desconhecido:', role);
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Email ou senha incorretos');
      this.loginError = true;
    }
  });


}
}