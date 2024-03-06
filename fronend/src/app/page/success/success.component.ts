import { StripeService } from '../../service/stripe.service';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  piId: string = '';

  paymetIntentId: any = '';
  constructor(
    private route: ActivatedRoute,
    private stripeService: StripeService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.piId = params['session_id'];
      console.log(this.piId);
      this.getPaymentIntentId(this.piId);
    });
  }

  getPaymentIntentId(sessionId: string) {
    this.stripeService.getPaymentIntent(sessionId).subscribe({
      next: (val: any) => {
        console.log('payment intent is', val);
        this.paymetIntentId = val;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
