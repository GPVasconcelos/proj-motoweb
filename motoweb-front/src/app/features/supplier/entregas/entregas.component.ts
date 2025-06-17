import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EntregasComponent implements OnInit {
  delivery: any[] = [];    // Lista de entregas pendentes
  motoboys: any[] = [];    // Lista de motoboys disponíveis
  userId: number = 0;      // ID da central logada

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

    this.loadEntregas();
    this.loadMotoboys();
  }

  // Carrega todas as entregas pendentes da central
  loadEntregas(): void {
    this.supplierService.getPendingDeliveries(this.userId).subscribe({
      next: (res) => this.delivery = res,
      error: (err) => console.error('Erro ao carregar entregas:', err)
    });
  }

  // Carrega os motoboys associados à central
  loadMotoboys(): void {
    this.supplierService.getAvailableMotoboys(this.userId).subscribe({
      next: (res) => this.motoboys = res,
      error: (err) => console.error('Erro ao carregar motoboys:', err)
    });
  }

  // Designa um motoboy a uma entrega específica
  designarMotoboy(deliveryId: number, motoboyId: number): void {
    if (!motoboyId) {
      alert('Selecione um motoboy para designar.');
      return;
    }

    this.supplierService.assignMotoboy(this.userId, deliveryId, motoboyId).subscribe({
      next: () => {
        alert('Motoboy designado com sucesso!');
        this.loadEntregas();
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message?.includes('nenhum motoboy disponível')) {
          alert('Nenhum motoboy disponível no momento.');
        } else {
          alert('Erro ao designar motoboy.');
          console.error(err);
        }
      }
    });
  }

  // Retorna o nome do motoboy com base no ID
  getMotoboyNameById(id: number): string {
    const motoboy = this.motoboys.find(m => m.id === id);
    return motoboy ? motoboy.name : 'Motoboy não encontrado';
  }
}
