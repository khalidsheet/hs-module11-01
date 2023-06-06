import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Cart } from 'src/app/interfaces/cart';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnDestroy, OnInit {
  cartItems: Cart[] = [];
  subscriptions: Subscription[] = [];
  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.required]),
  });

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
