import { Component, Input, OnChanges, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { PageChangeEvent } from '../product-pagination/product-pagination.component';
import {
  APP_SETTINGS,
  APP_SETTINGS_TOKEN,
  appSettings,
} from 'src/app/app.settings';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnChanges {
  @Input() products: Product[] = [];
  paginatedProducts: Product[] = [];

  constructor(@Inject(APP_SETTINGS_TOKEN) appSettings: APP_SETTINGS) {}

  ngOnChanges() {
    this.handlePageChange({ page: 1, pageSize: appSettings.pageSize });
  }

  handlePageChange(event: PageChangeEvent) {
    const { page, pageSize } = event;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    this.paginatedProducts = this.products.slice(start, end);
  }
}
