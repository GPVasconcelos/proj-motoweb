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
  delivery: any[] = [];       // Lista de entregas pendentes
  motoboys: any[] = [];       // Lista de motoboys disponíveis
  supplierId: number = 0;     // ID da central fornecedora extraído do token

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Recupera o token armazenado localmente
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token); // Decodifica o token JWT
      this.supplierId = decoded.sub;         // Armazena o ID da central
      this.loadEntregas();                   // Carrega as entregas pendentes
      this.loadMotoboys();                   // Carrega os motoboys disponíveis
    }
  }

  // Carrega as entregas pendentes para a central
  loadEntregas() {
    this.http.get<any[]>(`http://localhost:3000/supplier/${this.supplierId}/delivery/pending`).subscribe({
      next: (res) => this.delivery = res,
      error: (err) => console.error('Erro ao carregar entregas:', err)
    });
  }

  // Carrega a lista de motoboys disponíveis
  loadMotoboys() {
    this.http.get<any[]>(`http://localhost:3000/supplier/${this.supplierId}/motoboys`).subscribe({
      next: (res) => this.motoboys = res,
      error: (err) => console.error('Erro ao carregar motoboys:', err)
    });
  }

  // Designa um motoboy para uma entrega específica
  designarMotoboy(deliveryId: number, motoboyId: number) {
    if (!motoboyId) {
      alert("Selecione um motoboy para designar.");
      return;
    }

    this.http.patch(`http://localhost:3000/supplier/${this.supplierId}/delivery/${deliveryId}/assign`, { motoboyId }).subscribe({
      next: () => {
        alert("Motoboy designado com sucesso!");
        this.loadEntregas(); // Recarrega a lista de entregas para refletir a mudança
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message?.includes("nenhum motoboy disponível")) {
          alert("Nenhum motoboy disponível no momento.");
        } else {
          alert("Erro ao designar motoboy.");
        }
      }
    });
  }

  // Retorna o nome do motoboy designado com base no ID
  getMotoboyNameById(id: number): string {
    const motoboy = this.motoboys.find(m => m.id === id);
    return motoboy ? motoboy.name : 'Motoboy não encontrado';
  }
}
