import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { ClienteService } from '../services/cliente.service'; // ajuste conforme o caminho real
import { AuthService } from '../../auth/services/auth.service'; // Importa o serviço de autenticação

@Component({
  selector: 'app-minhas-entregas',
  templateUrl: './minhas-entregas.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class MinhasEntregasComponent implements OnInit {
  delivery: any[] = []; // Lista de entregas do cliente
  clientId: number = 0; // ID do cliente extraído do token

  constructor(
    private clienteService: ClienteService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
     this.clientId = this.authService.getDecodedToken()?.sub;
      if (!this.clientId) {
      console.error('ID não encontrado no token.');
  }
    this.loadDeliveries();
  }

  // Carrega as entregas do cliente logado
  loadDeliveries(): void {
    if (!this.clientId) {
      console.error('Client ID não definido.');
      return;
    }

    this.clienteService.getDeliveryByClient(this.clientId).subscribe({
      next: (res) => this.delivery = res,
      error: (err) => console.error('Erro ao carregar entregas:', err)
    });
  }

  // Cancela uma entrega e recarrega a lista
  cancelDelivery(deliveryId: number): void {
    if (!this.clientId) {
      console.error('Client ID não definido.');
      return;
    }

    this.clienteService.cancelDelivery(this.clientId, deliveryId).subscribe({
      next: () => this.loadDeliveries(),
      error: (err) => console.error('Erro ao cancelar entrega:', err)
    });
  }

  // Define classes visuais conforme o status da entrega
  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-primary text-white';
      case 'IN_PROGRESS':
        return 'bg-warning text-dark';
      case 'COMPLETED':
        return 'bg-success text-white';
      case 'CANCELED':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}
