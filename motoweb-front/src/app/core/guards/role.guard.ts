import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root' // Faz com que o guard esteja disponível globalmente no app
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,   // Serviço responsável pela autenticação e token
    private router: Router       
  ) {}

  /**
   * Método que será chamado pelo Angular para decidir se a rota pode ser acessada.
   * Verifica se o perfil do usuário está entre os permitidos (definidos na rota).
   */
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles = route.data['roles'] as string[]; // Perfis autorizados
    const userRole = this.auth.getProfileType() ?? '';     // Perfil extraído do token

    // Se o perfil estiver autorizado, permite o acesso
    if (expectedRoles.includes(userRole)) {
      return true;
    }

    // Caso contrário, bloqueia e redireciona para o login
    console.warn('Acesso negado: perfil insuficiente');
    return this.router.createUrlTree(['/login']);
  }
}
