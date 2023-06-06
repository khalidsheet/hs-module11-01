import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit, OnDestroy {
  cartItems: Cart[] = [];
  subscriptions$: Subscription[] = [];

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.getCartItems();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  getCartItems() {
    this.subscriptions$.push(
      this.appService.getCartItems().subscribe((cart) => {
        this.cartItems = cart;
      })
    );
  }

  subQuantityOrRemoveFromCart(cartItem: Cart) {
    this.appService.subQuantityOrRemoveFromCart(cartItem);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}
