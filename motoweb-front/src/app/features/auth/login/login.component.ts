import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';




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

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.loginError = false;

    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/auth/login', payload).subscribe({
      next: (res) => {
        this.loading = false;

        if (res && res.accessToken) {
          // Salva o token no localStorage
          localStorage.setItem('token', res.accessToken);

          // Faz o decode opcionalmente se quiser tratar perfil
          const tokenParts = JSON.parse(atob(res.accessToken.split('.')[1]));
          const role = tokenParts.profileType;

          // Redirecionamento baseado no tipo de perfil
          if (role === 'CLIENTE') {
            this.router.navigate(['/cliente']);
          } else if (role === 'CENTRAL') {
            this.router.navigate(['/supplier']);
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.loginError = true;
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro no login:', err);
        this.loginError = true;
      }
    });
  }
}