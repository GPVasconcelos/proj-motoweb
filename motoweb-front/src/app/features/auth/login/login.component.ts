import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Modelos vinculados ao formulário
  email = '';
  password = '';

  // Controle de estados da interface
  loading = false;
  loginError = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Método executado ao submeter o formulário de login.
   * Envia os dados para a API e trata autenticação e redirecionamento.
   */
  onSubmit(): void {
    this.loading = true;
    this.loginError = false;

 
    // Chamada à API de autenticação
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false; 

          if (res) {
          const user = this.authService.getUserProfile();
          const role = user?.profileType;

          // Redireciona para a rota correspondente ao tipo de usuário
          switch (role) {
            case 'CLIENTE':
              this.router.navigate(['/cliente']);
              break;
            case 'CENTRAL':
              this.router.navigate(['/supplier']);
              break;
            default:
              this.router.navigate(['/login']);
              break;
          }
        } else {
          // Caso o token não seja retornado corretamente
          this.loginError = true;
        }
      },
      error: (err) => {
        // Em caso de erro na requisição
        this.loading = false;
        console.error('Erro no login:', err);
        this.loginError = true;
      }
    });
  }
}
