import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../../../core/service/delivery.service';
import { AuthService } from '../../../core/service//auth.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-minhas-entregas',
  templateUrl: './minhas-entregas.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class MinhasEntregasComponent implements OnInit {

  delivery: any[] = [];
  clientId: number = 0; 
  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService, 
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.decodeToken();
    this.loadDeliverys();
  }

    // Captura o clientId do token JWT
  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.clientId = decoded.sub;
    } else {
      console.error('Token não encontrado.');
    }
  }

  // Carrega as entregas do cliente logado
loadDeliverys() {
  if (!this.clientId) {
    console.error('Client ID não definido. Verifique o token.');
    return;
  }

  this.http.get<any[]>(`http://localhost:3000/client/${this.clientId}/delivery`).subscribe({
    next: (res) => {
      this.delivery = res;
    },
    error: (err) => {
      console.error('Erro ao carregar entregas:', err);
    }
  });
}

  // Cancela uma entrega
cancelDelivery(deliveryId: number): void {
  if (!this.clientId) {
    console.error('Client ID não definido. Cancelamento abortado.');
    return;
  }

  this.deliveryService.cancelDelivery(this.clientId, deliveryId).subscribe({
    next: () => {
      this.loadDeliverys(); // Atualiza a lista após cancelar
    },
    error: (err) => {
      console.error('Erro ao cancelar entrega:', err);
    }
  });
}

  // Define as classes CSS para o status da entrega
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
