import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  public getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }

  public createProduct(payload: Product) {
    return this.http.post<Product>(`${this.baseUrl}products`, payload);
  }

  public updateProduct(id: any, payload: Product) {
    return this.http.put<Product>(`${this.baseUrl}products/${id}`, payload);
  }
}
