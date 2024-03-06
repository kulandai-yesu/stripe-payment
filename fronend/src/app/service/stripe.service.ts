import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  payment(payment: any) {
    return this.http.post(
      'http://localhost:8080/api/create-checkout-session',
      payment,
      { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    );
  }

  getPaymentIntent(sessionId: string) {
    return this.http.get(`http://localhost:8080/api/session/${sessionId}`);
  }
}
