import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EntregasComponent implements OnInit {
  delivery: any[] = [];
  motoboys: any[] = [];
  supplierId: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.supplierId = decoded.sub;
      this.loadEntregas();
      this.loadMotoboys();
    }
  }

  loadEntregas() {
    this.http.get<any[]>(`http://localhost:3000/supplier/${this.supplierId}/delivery`).subscribe({
      next: (res) => this.delivery = res,
      error: (err) => console.error('Erro ao carregar entregas:', err)
    });
  }

  loadMotoboys() {
    this.http.get<any[]>(`http://localhost:3000/supplier/${this.supplierId}/motoboys`).subscribe({
      next: (res) => this.motoboys = res,
      error: (err) => console.error('Erro ao carregar motoboys:', err)
    });
  }

  updateStatus(deliveryId: number, status: string) {
    this.http.patch(`http://localhost:3000/supplier/${this.supplierId}/delivery/${deliveryId}/status`, { status }).subscribe({
      next: () => this.loadEntregas(),
      error: (err) => console.error('Erro ao atualizar status:', err)
    });
  }

  designarMotoboy(deliveryId: number, motoboyId: number) {
    this.http.patch(`http://localhost:3000/supplier/${this.supplierId}/delivery/${deliveryId}/assign`, { motoboyId }).subscribe({
      next: () => this.loadEntregas(),
      error: (err) => console.error('Erro ao designar motoboy:', err)
    });
  }
}
