import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-central',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro-central.component.html',
  styleUrls: ['./cadastro-central.component.css']
})
export class CadastroCentralComponent implements OnInit {

  // ID do usuário principal, recebido por rota
  userId: number = 0;

  // Dados do formulário da central
  formData = {
    cnpj: '',
    fantasyName: '',
    operation: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Captura o userId da rota ao carregar o componente
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userId');
    this.userId = id ? Number(id) : 0;

    if (!this.userId) {
      alert('ID de usuário inválido ou ausente.');
      this.router.navigate(['/cadastro']);
    }
  }

  /**
   * Envia os dados da central para a API
   */
  onSubmit(): void {
    const payload = {
      userId: this.userId,
      cnpj: this.formData.cnpj,
      fantasyName: this.formData.fantasyName,
      operation: this.formData.operation
    };

    this.http.post('http://localhost:3000/supplier', payload).subscribe({
      next: () => {
        alert('Cadastro da central realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar central:', err);
        alert('Erro ao cadastrar central. Verifique os dados e tente novamente.');
      }
    });
  }
}
