import { Component } from '@angular/core';
import { Product } from '../product.model';
import { FREE_SHIPPING_FROM, StoreService } from '../store.service';

@Component({ selector: 'app-cart', templateUrl: './cart.component.html' })
export class CartComponent {
  freeFrom = FREE_SHIPPING_FROM;
  constructor(public store: StoreService) {}

  get shipping(): number { return this.store.shippingFor(this.store.subtotal); }
  get progress(): number { return Math.min(100, (this.store.subtotal / FREE_SHIPPING_FROM) * 100); }
  qty(p: Product, delta: number, current: number): void { this.store.setQty(p, current + delta); }
}
