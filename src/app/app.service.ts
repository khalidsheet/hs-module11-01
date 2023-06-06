import { Injectable } from '@angular/core';
import products from '../assets/products.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Product } from './interfaces/product';
import { Cart } from './interfaces/cart';
import { generateId } from './utils';
import { Subject } from 'rxjs/internal/Subject';
import { NavItem } from './interfaces/navItem';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private cartItems: Cart[] = [];
  private searchSubject = new Subject<string>();
  private categorySubject = new Subject<NavItem>();
  private products: Product[] = [];

  constructor() {}

  getProducts(): Observable<Product[]> {
    this.products = products;
    return of<Product[]>(products);
  }

  getProduct(id: number): Observable<Product> {
    return of<Product>(<Product>products.find((product) => product.id === id));
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
      return this.getProducts();
    }

    this.getProducts();

    const filteredProducts = this.products.filter(
      (product) => product.category === category.category
    );

    this.products = filteredProducts;

    return of<Product[]>(filteredProducts);
  }

  onPageChange(page: number, pageSize: number): Observable<Product[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = this.products.slice(start, end);
    this.products = results;
    return of<Product[]>(results);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
