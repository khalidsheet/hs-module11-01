import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { NavItem } from 'src/app/interfaces/navItem';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-tabbed-nav',
  templateUrl: './tabbed-nav.component.html',
  styleUrls: ['./tabbed-nav.component.css'],
})
export class TabbedNavComponent implements OnInit {
  @Input() products: Product[] = [];
  navItems: NavItem[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.displayNavItems();
  }

  displayNavItems() {
    const items = this.products
      .filter((product, index, self) => {
        return self.findIndex((p) => p.category === product.category) === index;
      })
      .map((product) => {
        return {
          category: product.category,
          isActive: false,
        };
      });

    // hardcoded all products
    this.navItems = [
      {
        category: 'All',
        isActive: true,
      },
      ...items,
    ];
  }

  handleNavClick(item: NavItem) {
    this.navItems.forEach((_item) => {
      _item.isActive = false;
    });
    item.isActive = true;
    this.appService.filterProducts(item);
  }
}
