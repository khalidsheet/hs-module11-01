import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface PageChangeEvent {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.css'],
})
export class ProductPaginationComponent {
  @Input()
  totalProducts = 0;

  @Input()
  pageSize = 6;

  currentPage = 1;

  @Output()
  onPageChange: EventEmitter<PageChangeEvent> =
    new EventEmitter<PageChangeEvent>();

  get totalPages(): number[] {
    const pages = Math.ceil(this.totalProducts / this.pageSize);
    return Array(pages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.onPageChange.emit({
      page,
      pageSize: this.pageSize,
    });
  }
}
