import { Component } from '@angular/core';
import { FREE_SHIPPING_FROM, StoreService, Toast } from './store.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
  freeFrom = FREE_SHIPPING_FROM;
  constructor(public store: StoreService) {}
  byId(_: number, t: Toast): number { return t.id; }
}
