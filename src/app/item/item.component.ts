import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { StoreService } from '../store.service';

@Component({ selector: 'app-item', templateUrl: './item.component.html', styleUrls: ['./item.component.css'] })
export class ItemComponent {
  @Input() product!: Product;
  constructor(public store: StoreService) {}
  get discount(): number { return this.product.oldPrice ? Math.round(100 - (this.product.price / this.product.oldPrice) * 100) : 0; }
}
