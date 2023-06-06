import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Product } from './interfaces/product';
import { Cart } from './interfaces/cart';
import { generateId } from './utils';
import { Subject } from 'rxjs/internal/Subject';
import { NavItem } from './interfaces/navItem';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS, APP_SETTINGS_TOKEN, appSettings } from './app.settings';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private cartItems: Cart[] = [];
  private searchSubject = new Subject<string>();
  private categorySubject = new Subject<NavItem>();
  private filteredProducts: Product[] = [];

  constructor(
    private httpClient: HttpClient,

    @Inject(APP_SETTINGS_TOKEN)
    public appSettings: APP_SETTINGS
  ) {}

  get products$(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(appSettings.dataSourceURL);
  }

  getCartItems(): Observable<Cart[]> {
    return of<Cart[]>(this.cartItems);
  }

  addToCart(product: Product, quantity = 1): void {
    const productInCart = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (productInCart) {
      productInCart.quantity += quantity;
      productInCart.totalPrice += product.price;
      return;
    }

    this.cartItems.push({
      id: generateId(),
      product,
      quantity: 1,
      totalPrice: product.price,
    });
  }

  subQuantityOrRemoveFromCart(cartItem: Cart): void {
    const productInCart = this.cartItems.find(
      (item) => item.product.id === cartItem.product.id
    );

    if (productInCart && productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      productInCart.totalPrice -= cartItem.product.price;
      return;
    }

    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
  }

  searchProducts(query: string): void {
    this.searchSubject.next(query);
  }

  getSearchSubject(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  filterProducts(category: NavItem): void {
    this.categorySubject.next(category);
  }

  getCategorySubject(): Observable<NavItem> {
    return this.categorySubject.asObservable();
  }

  filterProductsByCategory(category: NavItem): Observable<Product[]> {
    if (category.category === 'All') {
      return this.products$;
    }

    return this.products$.pipe(
      map((products) =>
        products.filter((product) => product.category === category.category)
      )
    );
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
