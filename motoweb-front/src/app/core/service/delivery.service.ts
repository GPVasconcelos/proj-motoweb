import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private api = 'http://localhost:3000'; // URL base da API backend

  constructor(private http: HttpClient) { }

  // Lista todas as entregas do cliente
  getDeliveriryByClient(clientId: number): Observable<any> {
    return this.http.get(`${this.api}/client/${clientId}/delivery`);
  }

  // Cria uma nova entrega
  createDelivery(clientId: number, data: any): Observable<any> {
    return this.http.post(`${this.api}/client/${clientId}/delivery`, data);
  }

  // Cancela uma entrega existente (somente se PENDING)
  cancelDelivery(clientId: number, deliveryId: number): Observable<any> {
    return this.http.patch(`${this.api}/client/${clientId}/delivery/${deliveryId}/cancel`, {});
  }

  // Consulta o histórico de entregas
  getDeliveryHistory(clientId: number): Observable<any> {
    return this.http.get(`${this.api}/client/${clientId}/delivery/history`);
  }
}
