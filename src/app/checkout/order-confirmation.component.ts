import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, StoreService } from '../store.service';

@Component({
  selector: 'app-order-confirmation',
  template: `
  <div class="container pt-5" style="max-width: 640px" *ngIf="order">
    <div class="text-center mb-4">
      <i class="fa fa-check-circle text-success" style="font-size: 3.5rem"></i>
      <h1 class="h3 mt-2">Thank you, {{ order.details.name }}!</h1>
      <p class="text-body-secondary mb-0">Order <strong>{{ order.id }}</strong> is confirmed. A receipt was sent to {{ order.details.email }}.</p>
    </div>
    <div class="card rounded-4"><div class="card-body">
      <div class="d-flex justify-content-between small mb-1" *ngFor="let l of order.lines">
        <span>{{ l.product.name }} × {{ l.qty }}</span><span>{{ l.qty * l.product.price | currency: 'INR':'symbol':'1.0-0' }}</span></div>
      <hr />
      <div class="d-flex justify-content-between fw-bold"><span>Total paid</span><span>{{ order.total | currency: 'INR':'symbol':'1.0-0' }}</span></div>
      <p class="small text-body-secondary mt-3 mb-0">Delivering to {{ order.details.address }}, {{ order.details.city }} {{ order.details.pincode }}</p>
    </div></div>
    <div class="text-center mt-4"><a routerLink="/products" class="btn btn-primary">Continue shopping</a></div>
  </div>`,
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  constructor(private store: StoreService, private router: Router) {}
  ngOnInit(): void {
    this.order = this.store.lastOrder;
    if (!this.order) { this.router.navigate(['/products']); }
  }
}
