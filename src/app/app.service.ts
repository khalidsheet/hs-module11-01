import { Injectable } from '@angular/core';
import products from '../assets/products.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Product } from './interfaces/product';
import { Cart } from './interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private cartItems: Cart[] = [];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of<Product[]>(products);
  }

  getProduct(id: number): Observable<Product> {
    return of<Product>(<Product>products.find((product) => product.id === id));
  }

  getCartItems(): Observable<Cart[]> {
    return of<Cart[]>(this.cartItems);
  }

  addToCart(cartItem: Cart): void {
    const productInCart = this.cartItems.find(
      (item) => item.product.id === cartItem.product.id
    );

    if (productInCart) {
      productInCart.quantity += cartItem.quantity;
      productInCart.totalPrice += cartItem.totalPrice;
      return;
    }

    this.cartItems.push(cartItem);
  }

  subQuantityOrRemoveFromCart(cartItem: Cart): void {
    const productInCart = this.cartItems.find(
      (item) => item.product.id === cartItem.product.id
    );

    if (productInCart && productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      productInCart.totalPrice -= cartItem.product.price;
      return;
    }

    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
