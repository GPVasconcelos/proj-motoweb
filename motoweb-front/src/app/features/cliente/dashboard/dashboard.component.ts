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
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Realiza logout e redireciona para a tela de login
   */
  logout(): void {
    this.authService.logout(); // Limpa token, dados de sessão, etc.
    this.router.navigate(['/login']); // Redireciona
  }
}
