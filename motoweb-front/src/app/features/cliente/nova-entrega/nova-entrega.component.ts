import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'; 
import { SupplierService } from '../../supplier/services/supplier.service'; // Importa o serviço de fornecedores
import { ClienteService } from '../services/cliente.service'; // Importa o serviço de cliente

@Component({
  selector: 'app-nova-entrega',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nova-entrega.component.html',
  styleUrls: ['./nova-entrega.component.css']
})
export class NovaEntregaComponent implements OnInit {

  clientId: number = 0; 
  suppliers: any[] = [];

  formData = {
    supplierId: 0,
    pickup: '',
    destination: '',
    recipient: '',
    serviceType: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService, 
    private supplierService: SupplierService,
    private clienteService: ClienteService 
  ) {}

  //Inicializa o componente carregando os dados essenciais. 
  ngOnInit(): void {
     this.clientId = this.authService.getDecodedToken()?.sub;
      if (!this.clientId) {
      console.error('ID não encontrado no token.');
  }
    this.loadSuppliers();
  }


  // Carrega as centrais (fornecedores) disponíveis para o select.
  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (res) => {
        this.suppliers = res;
      },
      error: (err) => {
        console.error('Erro ao carregar fornecedores:', err);
      }
    });
  }

  // Envia a solicitação de entrega com os dados preenchidos.
  onSubmit(): void {
    const payload = {
      supplierId: Number(this.formData.supplierId),
      pickup: this.formData.pickup,
      destination: this.formData.destination,
      recipient: this.formData.recipient,
      serviceType: this.formData.serviceType
    };

    this.clienteService.requestDelivery(this.clientId, payload).subscribe({
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
