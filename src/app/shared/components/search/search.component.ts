import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  hasError = false;
  errorContent = '';
  query = '';

  constructor(private appService: AppService) {}

  handleSearch(event: Event) {
    this.query = (event.target as HTMLInputElement).value || '';

    if (this.query.length <= 3) {
      this.hasError = true;
      this.errorContent = 'Search length must be greater than 3 characters';
      this.appService.searchProducts('');
      return;
    }

    this.hasError = false;
    this.appService.searchProducts(this.query);
  }

  handleBlur() {
    if (this.query.length >= 3 || this.query.length === 0) {
      this.hasError = false;
    }
  }
}
