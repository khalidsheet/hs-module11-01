import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
