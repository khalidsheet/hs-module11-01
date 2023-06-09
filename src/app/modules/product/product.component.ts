import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { NavItem } from 'src/app/interfaces/navItem';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(private appService: AppService) {}

  subscribable$: Subscription[] = [];
  products: Product[] = [];
  productCategories: Product[] = [];
  selectedCategory: NavItem = {
    category: 'All',
    isActive: true,
  };
  isLoading = true;

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
    this.isLoading = true;
    this.subscribable$.push(
      this.appService
        .filterProductsByCategory(category ?? this.selectedCategory)
        .subscribe({
          next: (products) => {
            this.products = products;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        })
    );
  }

  ngOnDestroy() {
    this.subscribable$.forEach((sub) => sub.unsubscribe());
  }
}
