import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { StoreService } from '../store.service';

@Component({ selector: 'app-product-detail', templateUrl: './product-detail.component.html' })
export class ProductDetailComponent implements OnInit {
  product?: Product;
  related: Product[] = [];
  userRating = 0;
  qty = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService, public store: StoreService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this.productService.getProduct(Number(params.get('id')));
      this.related = this.product ? this.productService.getRelated(this.product) : [];
      this.userRating = this.product ? this.productService.getUserRating(this.product.id) : 0;
      this.qty = 1;
      window.scrollTo({ top: 0 });
    });
  }

  step(delta: number): void {
    if (this.product) { this.qty = Math.max(1, Math.min(this.product.stock, this.qty + delta)); }
  }
  onRate(rating: number): void {
    if (!this.product) { return; }
    this.userRating = rating;
    this.productService.setUserRating(this.product.id, rating);
  }
}
