import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './interfaces/product';
import { AppService } from './app.service';
import { NavItem } from './interfaces/navItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private appService: AppService) {}

  subscribable$: Subscription[] = [];
  products: Product[] = [];
  productCategories: Product[] = [];
  selectedCategory: NavItem = {
    category: 'All',
    isActive: true,
  };

  ngOnInit() {
    this.getSelectedCategory();
    this.getProducts();

    this.subscribable$.push(
      this.appService.products$.subscribe((products) => {
        this.productCategories = products;
      })
    );
  }

  getSelectedCategory() {
    this.subscribable$.push(
      this.appService.getCategorySubject().subscribe((category) => {
        this.getProducts(category);
      })
    );
  }

  getProducts(category?: NavItem) {
    console.log(category);
    this.subscribable$.push(
      this.appService
        .filterProductsByCategory(category ?? this.selectedCategory)
        .subscribe((products) => {
          this.products = products;
          console.log(products);
        })
    );
  }

  ngOnDestroy() {
    this.subscribable$.forEach((sub) => sub.unsubscribe());
  }
}
