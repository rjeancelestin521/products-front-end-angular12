import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(environment.host + '/all');
  }

  getSelectedProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(environment.host + '/selectedProduct');
  }

  getAvailableProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(environment.host + '/availableProduct');
  }

  getProductsByNameContains(keyword: string): Observable<Product[]>
  {
    return this.http.get<Product[]>(environment.host + '/searchByName?name=' + keyword);
  }

  selectProduct(product: Product): Observable<Product>
  {
    product.selected = !product.selected;
    return this.http.put<Product>(environment.host + '/update/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<void>
  {
    return this.http.delete<void>(environment.host + '/delete/' + product.id);
  }

  saveProduct(product: Product): Observable<Product>
  {
    return this.http.post<Product>(environment.host, product);
  }

  getProductById(id: number): Observable<Product>
  {
    return this.http.get<Product>(environment.host + '/' + id);
  }

  updateProduct(product: Product): Observable<Product>
  {
    return this.http.put<Product>(environment.host + '/update/' + product.id, product);
  }
}
