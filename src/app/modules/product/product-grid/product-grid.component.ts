import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { PageChangeEvent } from '../product-pagination/product-pagination.component';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnChanges {
  @Input() products: Product[] = [];
  paginatedProducts: Product[] = [];

  constructor() {}

  ngOnChanges() {
    this.handlePageChange({ page: 1, pageSize: 6 });
  }

  handlePageChange(event: PageChangeEvent) {
    const { page, pageSize } = event;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    this.paginatedProducts = this.products.slice(start, end);
  }
}
