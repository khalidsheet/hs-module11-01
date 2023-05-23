import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './interfaces/product';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private appService: AppService) {}

  subscribable$: Subscription[] = [];
  products: Product[] = [];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.subscribable$.push(
      this.appService.getProducts().subscribe((products) => {
        this.products = products;
      })
    );
  }

  ngOnDestroy() {
    this.subscribable$.forEach((sub) => sub.unsubscribe());
  }
}
