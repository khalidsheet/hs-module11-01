import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/interfaces/product';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;

  constructor(
    private appService: AppService,
    private utilService: UtilsService
  ) {}

  handleAddItemToCart(product: Product) {
    console.log('Add item to cart', product);
    this.appService.addToCart({
      product,
      quantity: 1,
      totalPrice: product.price,
      id: this.utilService.generateId(),
    });
  }
}
