import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDetails, StoreService } from '../store.service';

@Component({ selector: 'app-checkout', templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  submitted = false;
  model: OrderDetails = { name: '', email: '', phone: '', address: '', city: '', pincode: '', payment: 'cod' };

  constructor(public store: StoreService, private router: Router) {}

  get shipping(): number { return this.store.shippingFor(this.store.subtotal); }

  submit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid || !this.store.count) { return; }
    this.store.placeOrder(this.model);
    this.router.navigate(['/order-confirmation']);
  }
}
