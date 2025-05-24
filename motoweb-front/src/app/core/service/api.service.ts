import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000', // ← ajuste se necessário
    });
  }

  get<T>(url: string) {
    return this.api.get<T>(url);
  }

  post<T>(url: string, data: any) {
    return this.api.post<T>(url, data);
  }

  patch<T>(url: string, data: any) {
    return this.api.patch<T>(url, data);
  }

  delete<T>(url: string) {
    return this.api.delete<T>(url);
  }
}
