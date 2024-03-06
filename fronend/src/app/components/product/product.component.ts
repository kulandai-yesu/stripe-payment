import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { TruncateDescriptionPipe } from '../../pipe/truncate-description.pipe';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TruncateDescriptionPipe, RouterModule, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
  constructor(private router: Router) {}

  checkoutProduct() {
    this.router.navigate(['/checkout', this.product.id]);
  }
}
