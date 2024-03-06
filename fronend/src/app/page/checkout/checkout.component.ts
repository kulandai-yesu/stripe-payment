import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { StripeService } from '../../service/stripe.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  productId: number = 0;
  productDetail!: Product;
  private readonly stripe_pk = 'USE_STRIPE_PUBLISABLE_KEY_HERE';
  stripePromise = loadStripe(this.stripe_pk);

  constructor(
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProductById(this.productId);
  }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      if (data) {
        this.productDetail = data;
      }
    });
  }

  async pay() {
    // TODO: create payment object
    const payment = {
      name: this.productDetail.title,
      currency: 'inr',
      image: this.productDetail.image,
      successUrl:
        'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'http://localhost:4200/cancel',
      amount: this.productDetail.price,
      quantity: 1,
    };

    const stripe = await this.stripePromise;
    this.stripeService.payment(payment).subscribe({
      next: (data: string) => {
        console.log('uuuu', data);
        stripe?.redirectToCheckout({
          sessionId: data,
        });
      },
      error: (err: any) => {
        console.error('err', err);
      },
    });
  }
}
