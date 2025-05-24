import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../../../core/service/delivery.service';
import { AuthService } from '../../../core/service//auth.service';


@Component({
  selector: 'app-minhas-entregas',
  templateUrl: './minhas-entregas.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class MinhasEntregasComponent implements OnInit {

  deliveries: any[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDeliverys();
  }

  // Carrega as entregas do cliente logado
  loadDeliverys(): void {
    const user = this.authService.getUserProfile();
    const clientId = user.sub; // O ID do cliente vem do token

    this.deliveryService.getDeliveriryByClient(clientId).subscribe({
      next: (res) => {
        this.deliveries = res;
      },
      error: (err) => {
        console.error('Erro ao carregar entregas:', err);
      }
    });
  }

  // Cancela uma entrega
  cancelDelivery(deliveryId: number): void {
    const user = this.authService.getUserProfile();
    const clientId = user.sub;

    this.deliveryService.cancelDelivery(clientId, deliveryId).subscribe({
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
