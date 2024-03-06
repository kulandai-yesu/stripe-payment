import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductService) {}
  products: Array<Product> = [];
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.products$.subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
