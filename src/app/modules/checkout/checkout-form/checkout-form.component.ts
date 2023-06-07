import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

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

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.formValuesChanges();
  }

  onSubmit(): void {}

  get totalCheckoutPrice(): number {
    return this.appService.getCartTotal();
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
          console.log('state becomes required');
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
    this.router.navigate(['/checkout/thank-you']);
    console.log(this.formGroup.value);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
