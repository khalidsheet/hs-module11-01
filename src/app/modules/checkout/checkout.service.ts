import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from 'src/app/interfaces/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  checkout(checkoutData: Checkout) {
    return this.httpClient.post('http://localhost:3000/checkout', {
      name: checkoutData.name,
      email: checkoutData.email,
      cart: checkoutData.cart,
    });
  }
}
