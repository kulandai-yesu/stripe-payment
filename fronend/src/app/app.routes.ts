import { Routes } from '@angular/router';
import { CancelComponent } from './page/cancel/cancel.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { SuccessComponent } from './page/success/success.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
  },
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'home', component: HomeComponent },
];
