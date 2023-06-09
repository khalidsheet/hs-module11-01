import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { checkoutGuard } from 'src/app/guards/checkout-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [checkoutGuard],
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
    canActivate: [checkoutGuard],
    data: {
      animation: 'thankYouAnimation',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
