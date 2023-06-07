import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CheckoutService } from '../checkout.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    state: new FormControl('', []),
    terms: new FormControl(false, [
      Validators.required,
      Validators.requiredTrue,
    ]),
  });
  subscription: Subscription[] = [];
  cartItems: Cart[] = [];
  isLoading = false;

  constructor(
    private appService: AppService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValuesChanges();
    this.getCartItems();
  }

  onSubmit(): void {}

  get totalCheckoutPrice(): number {
    return this.appService.getCartTotal();
  }

  getCartItems(): void {
    this.subscription.push(
      this.appService
        .getCartItems()
        .subscribe((cartItems) => (this.cartItems = cartItems))
    );
  }

  hasFormControlError(formControlName: string) {
    return (
      this.formGroup.controls[formControlName].invalid &&
      (this.formGroup.controls[formControlName].dirty ||
        this.formGroup.controls[formControlName].touched)
    );
  }

  formValuesChanges(): void {
    this.subscription.push(
      this.formGroup.valueChanges.subscribe(() => {
        if (
          this.formGroup.controls['country'].value.toLowerCase() !== 'iraq' &&
          this.formGroup.controls['country'].value.toLowerCase() !== ''
        ) {
          this.formGroup.controls['state'].setValidators([Validators.required]);
          this.formGroup.controls['state'].updateValueAndValidity({
            onlySelf: true,
          });
          this.formGroup.controls['state'].markAsTouched();
        } else {
          this.formGroup.controls['state'].clearValidators();
          this.formGroup.controls['state'].updateValueAndValidity({
            onlySelf: true,
          });
          this.formGroup.controls['state'].markAsUntouched();
        }
      })
    );
  }

  finishCheckout() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.checkoutService
        .checkout({
          name:
            this.formGroup.controls['firstName'].value +
            ' ' +
            this.formGroup.controls['lastName'].value,
          email: this.formGroup.controls['email'].value,
          cart: this.cartItems,
        })
        .subscribe({
          next: (res) => {
            this.appService.clearCart();
            this.router.navigate(['/checkout/thank-you']);
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
      return;
    }

    this.formGroup.markAllAsTouched();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
