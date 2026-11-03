import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService, SortOption } from '../product.service';
import { FREE_SHIPPING_FROM, StoreService } from '../store.service';

@Component({ selector: 'app-products', templateUrl: './products.component.html', styleUrls: ['./products.component.css'] })
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: string[] = [];
  showSaved = false;
  freeFrom = FREE_SHIPPING_FROM;
  private subscription?: Subscription;

  constructor(private productService: ProductService, public store: StoreService) {}

  get selectedCategory(): string { return this.productService.category; }
  get sort(): SortOption { return this.productService.sortOption; }
  get shown(): Product[] { return this.showSaved ? this.products.filter((p) => this.store.isSaved(p.id)) : this.products; }

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.subscription = this.productService.visibleProducts$.subscribe((p) => (this.products = p));
  }
  ngOnDestroy(): void { this.subscription?.unsubscribe(); }

  selectCategory(category: string): void { this.showSaved = false; this.productService.setCategory(category); }
  onSort(option: SortOption): void { this.productService.setSort(option); }
  clearFilters(): void { this.showSaved = false; this.productService.resetFilters(); }
  trackById(_: number, p: Product): number { return p.id; }
}
