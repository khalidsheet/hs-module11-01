import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CartModule, ProductModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
