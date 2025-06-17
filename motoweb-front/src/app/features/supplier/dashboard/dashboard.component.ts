import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardSupplierComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Realiza logout, limpa o token e redireciona para login
   */
  logout(): void {
    this.authService.logout(); // Limpa token/dados do usuário
    this.router.navigate(['/login']); // Redireciona
  }
}
