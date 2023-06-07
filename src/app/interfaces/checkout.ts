import { Cart } from './cart';

export interface Checkout {
  name: string;
  email: string;
  cart: Cart[];
}
