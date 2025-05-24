import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Método responsável por realizar o logout do usuário.
   * - Remove o token salvo no localStorage.
   * - Redireciona o usuário para a tela de login.
   */
  logout(): void {
    // Executa o logout via serviço de autenticação
    this.authService.logout();

    // Redireciona para a rota de login
    this.router.navigate(['/login']);
  }
}
