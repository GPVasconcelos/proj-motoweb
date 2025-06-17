import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoricoComponent implements OnInit {
  delivery: any[] = [];   // Lista de entregas históricas
  userId: number = 0;     // ID da central logada (extraído do token)

  constructor(
    private supplierService: SupplierService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getDecodedToken()?.sub;

    if (!this.userId) {
      alert('Erro ao carregar informações da central. Faça login novamente.');
      return;
    }

    this.loadEntregas(); // Carrega histórico da central logada
  }

  // Requisição de entregas concluídas/canceladas da central
  loadEntregas(): void {
    this.supplierService.getDeliveryHistory(this.userId).subscribe({
      next: (res) => this.delivery = res,
      error: (err) => console.error('Erro ao carregar histórico:', err)
    });
  }
}
