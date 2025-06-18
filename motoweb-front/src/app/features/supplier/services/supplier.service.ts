import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../config/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private api = `${environment.API_URL}/supplier`; // URL base da API de fornecedores

  constructor(private http: HttpClient) {}

  // Cadastra uma nova central fornecedora
  registerCentral(data: {
    userId: number;
    cnpj: string;
    fantasyName: string;
    operation: string;
  }): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }

  // Retorna todas as centrais fornecedoras
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // Retorna todas as entregas pendentes da central fornecedora
  getPendingDeliveries(supplierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${supplierId}/delivery/pending`);
  }

  // Retorna o histórico de entregas da central (entregues e canceladas)
  getDeliveryHistory(supplierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${supplierId}/delivery/history`);
  }

  // Retorna os motoboys disponíveis vinculados à central
  getAvailableMotoboys(supplierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${supplierId}/motoboys`);
  }

  // Designa um motoboy para uma entrega específica
  assignMotoboy(supplierId: number, deliveryId: number, motoboyId: number): Observable<any> {
    return this.http.patch(`${this.api}/${supplierId}/delivery/${deliveryId}/assign`, {
      motoboyId
    });
  }

  // Atualiza o status de uma entrega (ex: IN_PROGRESS, COMPLETED)
  updateDeliveryStatus(supplierId: number, deliveryId: number, status: string): Observable<any> {
    return this.http.patch(`${this.api}/${supplierId}/delivery/${deliveryId}/status`, { status });
  }

  // Cancela uma entrega
  cancelDelivery(supplierId: number, deliveryId: number): Observable<any> {
    return this.http.patch(`${this.api}/${supplierId}/delivery/${deliveryId}/cancel`, {});
  }
}
