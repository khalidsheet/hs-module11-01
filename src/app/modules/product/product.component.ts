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
