import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../config/environment';
import { jwtDecode} from 'jwt-decode'; // Importa a biblioteca jwt-decode para decodificar tokens JWT


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.API_URL}/auth`; // URL base da API backend
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Login
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.api}/login`, { email, password }).pipe(
      map(res => {
        if (res && res.accessToken) {
          localStorage.setItem(this.tokenKey, res.accessToken);
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

   // Realiza cadastro de usuário
  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, payload).pipe(
      catchError(this.handleError)
    );
  }

  //Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  //Verifica se está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  //Pega o token salvo
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //Decodifica o token (para pegar dados como profileType)
  getUserProfile(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    return null;
  }

  //Trata erros
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Erro no front:', error.error.message);
    } else {
      console.error(
        `Backend retornou o código ${error.status}, ` +
        `body: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => new Error('Erro na autenticação. Verifique email e senha.'));
  }

  // Decodifica o token armazenado
  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.getDecodedToken();
    if (!decodedToken) return false;

    // Verifica se o token expirou
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    return decodedToken.exp > currentTime;
  }

  // Retorna o tipo de perfil do usuário
  getProfileType(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

   try {
      const decoded: any = jwtDecode(token);
      return decoded.profileType || null;
    } catch {
    return null;
  }
}
}
