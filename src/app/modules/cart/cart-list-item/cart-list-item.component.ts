import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css'],
})
export class CartListItemComponent {
  @Input() item: Cart = {} as Cart;
  @Output() removeItem: EventEmitter<Cart> = new EventEmitter<Cart>();

  subQty() {
    this.removeItem.emit(this.item);
  }
}
