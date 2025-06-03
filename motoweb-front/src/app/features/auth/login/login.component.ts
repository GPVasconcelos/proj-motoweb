import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  // Modelos vinculados ao formulário
  email = '';
  password = '';

  // Controle de estados da interface
  loading = false;
  loginError = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * Método executado ao submeter o formulário de login.
   * Envia os dados para a API e trata autenticação e redirecionamento.
   */
  onSubmit(): void {
    this.loading = true;
    this.loginError = false;

    // Montagem do payload para requisição
    const payload = {
      email: this.email,
      password: this.password
    };

    // Chamada à API de autenticação
    this.http.post<any>('http://localhost:3000/auth/login', payload).subscribe({
      next: (res) => {
        this.loading = false;

        // Verifica se há token de acesso na resposta
        if (res && res.accessToken) {
          localStorage.setItem('token', res.accessToken);

          // Decodifica o token JWT para extrair informações do perfil
          const tokenPayload = JSON.parse(atob(res.accessToken.split('.')[1]));
          const role = tokenPayload.profileType;

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
