import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css'],
})
export class CartTotalComponent {
  @Input() cartItems: Cart[] = [];

  get total() {
    return this.cartItems.reduce((acc, item) => {
      return acc + item.totalPrice;
    }, 0);
  }
}
