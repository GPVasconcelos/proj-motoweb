import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../../cliente/services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  // ID do usuário principal (recebido via rota)
  userId: number = 0;

  // Dados do formulário de cliente
  formData = {
    cnpj: '',
    stateReg: '',
    fantasyName: '',
    sector: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  /**
   * Ao inicializar o componente, captura o userId da URL
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
   * Envia os dados do cliente para a API
   */
  onSubmit(): void {
    const payload = {
      userId: this.userId,
      cnpj: this.formData.cnpj,
      stateReg: this.formData.stateReg,
      fantasyName: this.formData.fantasyName,
      sector: this.formData.sector
    };

    this.clienteService.registerClient(payload).subscribe({
      next: () => {
        alert('Cadastro de cliente realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
      }
    });
  }
}
