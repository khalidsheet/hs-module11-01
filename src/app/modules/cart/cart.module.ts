import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './cart-total/cart-total.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CartTotalComponent, CartListComponent, CartListItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [CartTotalComponent, CartListComponent, CartListItemComponent],
})
export class CartModule {}
