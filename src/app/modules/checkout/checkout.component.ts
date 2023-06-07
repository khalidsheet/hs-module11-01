import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnDestroy, OnInit {
  cartItems: Cart[] = [];
  subscriptions: Subscription[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService
        .getCartItems()
        .subscribe((cartItems) => (this.cartItems = cartItems))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
