import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { StoreService } from '../store.service';

@Component({ selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css'] })
export class HeaderComponent {
  constructor(private productService: ProductService, private router: Router, public store: StoreService) {}

  get search(): string { return this.productService.searchTerm; }

  onSearch(term: string): void {
    this.productService.setSearch(term);
    if (this.router.url.split('?')[0] !== '/products') { this.router.navigate(['/products']); }
  }
}
