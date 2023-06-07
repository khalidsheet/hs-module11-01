import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent {
  constructor(private appService: AppService, private router: Router) {}

  backToHome() {
    this.appService.clearCart();
    this.router.navigate(['/']);
  }
}
