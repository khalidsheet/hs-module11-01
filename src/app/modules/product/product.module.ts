import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductPaginationComponent } from './product-pagination/product-pagination.component';

@NgModule({
  declarations: [ProductCardComponent, ProductGridComponent, ProductPaginationComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductCardComponent, ProductGridComponent],
})
export class ProductModule {}
