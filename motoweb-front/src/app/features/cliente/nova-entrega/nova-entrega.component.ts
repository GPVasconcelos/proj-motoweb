import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nova-entrega',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nova-entrega.component.html',
  styleUrls: ['./nova-entrega.component.css']
})
export class NovaEntregaComponent implements OnInit {

  userId: number = 0;
  suppliers: any[] = [];

  formData = {
    supplierId: 0,
    pickup: '',
    destination: '',
    recipient: '',
    serviceType: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Inicializa o componente carregando os dados essenciais.
   */
  ngOnInit(): void {
    this.decodeToken();
    this.loadSuppliers();
  }

  /**
   * Decodifica o token JWT armazenado e obtém o ID do cliente (userId).
   */
  decodeToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userId = decoded.sub;
      } catch {
        console.error('Erro ao decodificar o token.');
      }
    } else {
      console.error('Token não encontrado.');
    }
  }

  /**
   * Carrega as centrais (fornecedores) disponíveis para o select.
   */
  loadSuppliers(): void {
    this.http.get<any[]>('http://localhost:3000/supplier').subscribe({
      next: (res) => {
        this.suppliers = res;
      },
      error: (err) => {
        console.error('Erro ao carregar fornecedores:', err);
      }
    });
  }

  /**
   * Envia a solicitação de entrega com os dados preenchidos.
   */
  onSubmit(): void {
    if (!this.userId) {
      alert('Usuário não autenticado.');
      return;
    }

    const payload = {
      supplierId: Number(this.formData.supplierId),
      pickup: this.formData.pickup,
      destination: this.formData.destination,
      recipient: this.formData.recipient,
      serviceType: this.formData.serviceType
    };

    this.http.post(`http://localhost:3000/client/${this.userId}/delivery`, payload).subscribe({
      next: () => {
        alert('Entrega solicitada com sucesso!');
        this.router.navigate(['/cliente/minhas-entregas']);
      },
      error: (err) => {
        console.error('Erro ao criar entrega:', err);
        alert('Erro ao solicitar entrega. Verifique os dados e tente novamente.');
      }
    });
  }
}
