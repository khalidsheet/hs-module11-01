import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';
import { SharedModule } from './shared/shared.module';
import { APP_SETTINGS_TOKEN, appSettings } from './app.settings';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    ProductModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_SETTINGS_TOKEN,
      useValue: appSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
