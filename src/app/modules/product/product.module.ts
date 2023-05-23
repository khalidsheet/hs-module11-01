import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ButtonComponent } from 'src/app/components/button/button.component';

@NgModule({
  declarations: [ProductCardComponent, ProductGridComponent],
  imports: [CommonModule, ButtonComponent],
  exports: [ProductCardComponent, ProductGridComponent],
})
export class ProductModule {}
