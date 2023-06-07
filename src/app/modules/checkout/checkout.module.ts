import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CartModule } from '../cart/cart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  declarations: [CheckoutComponent, CheckoutFormComponent, ThankYouComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CartModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CheckoutModule {}
