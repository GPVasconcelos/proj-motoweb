import { Component } from '@angular/core';
import { DeliveryService } from '../../../core/service/delivery.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-entrega',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-entrega.component.html',
})
export class NovaEntregaComponent {

  // Objeto que armazena os dados do formulário
  formData = {
    clientId: 0,
    supplierId: 0,
    pickup: '',
    destination: '',
    recipient: '',
    notes: '',
    serviceType: ''
  };

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Método executado quando o usuário envia o formulário.
   * Envia os dados para a API, cria a entrega e redireciona.
   */
  onSubmit(): void {
    const user = this.authService.getUserProfile();
    const clientId = user.sub;

    this.deliveryService.createDelivery(clientId, this.formData).subscribe({
      next: () => {
        alert('Entrega solicitada com sucesso!');
        this.router.navigate(['/cliente/minhas-entregas']);
      },
      error: (err) => {
        console.error('Erro ao criar entrega:', err);
        alert('Ocorreu um erro ao solicitar a entrega. Tente novamente.');
      }
    });
  }
}
