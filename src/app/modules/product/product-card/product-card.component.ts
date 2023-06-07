import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;
  searchKeywords = '';
  subscription: Subscription = new Subscription();

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.subscription = this.appService
      .getSearchSubject()
      .subscribe((query) => {
        this.searchKeywords = query;
      });
  }

  handleAddItemToCart(product: Product) {
    this.appService.addToCart(product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
