import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductPaginationComponent } from './product-pagination/product-pagination.component';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductGridComponent,
    ProductPaginationComponent,
    ProductComponent,
  ],
  imports: [CommonModule, SharedModule, CartModule, ProductRoutingModule],
  exports: [ProductCardComponent, ProductGridComponent],
})
export class ProductModule {}
