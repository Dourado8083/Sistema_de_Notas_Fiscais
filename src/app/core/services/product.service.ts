import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCreation, } from '../interfaces/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:5227/products";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }


  create(product: ProductCreation): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/create`,
      product,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  update(id: string, product: ProductCreation): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}