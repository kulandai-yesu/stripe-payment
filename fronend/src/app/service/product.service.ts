import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productSubject.asObservable();
  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get('https://fakestoreapi.com/products?limit=20')
      .pipe(
        map((products: any) => {
          return products.map((product: any) => {
            if (product.rating) {
              product.ratingRate = product.rating.rate;
              product.ratingCount = product.rating.count;
              delete product.rating;
            }
            return product as Product;
          });
        })
      )
      .subscribe((val) => {
        console.log(val);
        this.productSubject.next([...val]);
      });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.productSubject.pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }
}
