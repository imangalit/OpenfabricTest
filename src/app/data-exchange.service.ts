import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Product } from './interfaces';
@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {
  BASE_URL = 'http://localhost:3001';
  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(`${this.BASE_URL}/products`);
  }
  getProductDetail(id) {
    return this.http.get(`${this.BASE_URL}/products/${id}`)
  }
  createProduct(product: Product) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http.post(`${this.BASE_URL}/products`, product, {headers: headers})
  }
  deleteProduct(id) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http.delete(`${this.BASE_URL}/products/${id}`, {headers: headers})
  }
  updateProduct(id, product: Product) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
    return this.http.put(`${this.BASE_URL}/products/${id}`, product, {headers: headers})
  }
}
