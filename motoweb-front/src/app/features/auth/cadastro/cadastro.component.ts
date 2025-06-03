import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  // Modelo do formulário principal
  formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    profileType: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Envia os dados do formulário para o backend.
   * Valida se as senhas coincidem e redireciona conforme o tipo de perfil.
   */
  onSubmit(): void {
    // Verificação de senha
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('As senhas não conferem.');
      return;
    }

    // Montagem do payload com os dados principais
    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      address: this.formData.address,
      password: this.formData.password,
      profileType: this.formData.profileType
    };

    // Requisição de registro para a API
    this.http.post<any>('http://localhost:3000/auth/register', payload).subscribe({
      next: (res) => {
        const userId = res.id;

        // Redireciona conforme o perfil selecionado
        if (this.formData.profileType === 'CLIENTE') {
          this.router.navigate(['/cadastro/cadastro-cliente', userId]);
        } else if (this.formData.profileType === 'CENTRAL') {
          this.router.navigate(['/cadastro/cadastro-central', userId]);
        } else {
          alert('Tipo de perfil não reconhecido.');
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    });
  }
}
