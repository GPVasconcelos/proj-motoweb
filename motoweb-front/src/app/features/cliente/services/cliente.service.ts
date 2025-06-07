// src/app/features/cliente/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../config/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private api = `${environment.API_URL}/client`; // Base da rota do cliente

  constructor(private http: HttpClient) {}

  // Cadastra um cliente associado a um userId
  registerClient(data: {
    userId: number;
    cnpj: string;
    stateReg?: string;
    fantasyName: string;
    sector: string;
  }): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }

  // Solicita uma nova entrega para um cliente
  requestDelivery(clientId: number, data: {
    supplierId: number;
    pickup: string;
    destination: string;
    recipient: string;
    serviceType: string;
  }): Observable<any> {
    return this.http.post(`${this.api}/${clientId}/delivery`, data);
  }

 // Lista todas as entregas do cliente
  getDeliveryByClient(clientId: number): Observable<any> {
    return this.http.get(`${this.api}/${clientId}/delivery`);
  }

  // Cancela uma entrega pendente
  cancelDelivery(clientId: number, deliveryId: number): Observable<any> {
    return this.http.patch(`${this.api}/${clientId}/delivery/${deliveryId}/cancel`, {});
  }

  // Lista todas as entregas feitas por um cliente
  getDeliveryHistory(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${clientId}/deliveries/history`);
  }


}
