import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

export const FREE_SHIPPING_FROM = 3000;
export interface CartLine { product: Product; qty: number; }
export interface OrderDetails { name: string; email: string; phone: string; address: string; city: string; pincode: string; payment: string; }
export interface Order {
  id: string; date: string; lines: CartLine[]; subtotal: number; shipping: number; total: number; details: OrderDetails;
}
export interface Toast { id: number; text: string; }

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T; } catch { return fallback; }
}
function save(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

/** Cart, wishlist, toasts and theme. Cart and wishlist persist in localStorage. */
@Injectable({ providedIn: 'root' })
export class StoreService {
  private cart: Record<number, number> = load('productStore.cart', {});
  private saved: number[] = load('productStore.wishlist', []);
  private toastId = 0;

  readonly cart$ = new BehaviorSubject<CartLine[]>(this.lines());
  readonly saved$ = new BehaviorSubject<number[]>(this.saved);
  readonly toasts$ = new BehaviorSubject<Toast[]>([]);
  theme: 'light' | 'dark' = load<'light' | 'dark'>(
    'productStore.theme',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  lastOrder: Order | null = load<Order | null>('productStore.lastOrder', null);

  constructor(private products: ProductService) { this.applyTheme(); }

  get count(): number { return this.cart$.value.reduce((n, l) => n + l.qty, 0); }
  get subtotal(): number { return this.cart$.value.reduce((n, l) => n + l.qty * l.product.price, 0); }

  add(product: Product, qty = 1): void {
    if (product.stock <= 0) { return; }
    this.cart[product.id] = Math.min((this.cart[product.id] ?? 0) + qty, product.stock);
    this.commit();
    this.toast(`${product.name} added to cart`);
  }
  setQty(product: Product, qty: number): void {
    if (qty <= 0) { delete this.cart[product.id]; } else { this.cart[product.id] = Math.min(qty, product.stock); }
    this.commit();
  }
  shippingFor(subtotal: number): number { return !subtotal || subtotal >= FREE_SHIPPING_FROM ? 0 : 99; }

  /** Turns the cart into an order, then empties the cart. */
  placeOrder(details: OrderDetails): Order {
    const subtotal = this.subtotal;
    const shipping = this.shippingFor(subtotal);
    const order: Order = {
      id: 'PS' + Date.now().toString().slice(-7), date: new Date().toISOString(),
      lines: this.cart$.value, subtotal, shipping, total: subtotal + shipping, details,
    };
    this.lastOrder = order;
    save('productStore.lastOrder', order);
    this.clear();
    return order;
  }
  clear(): void { this.cart = {}; this.commit(); }

  isSaved(id: number): boolean { return this.saved.includes(id); }
  toggleSaved(product: Product): void {
    const was = this.isSaved(product.id);
    this.saved = was ? this.saved.filter((i) => i !== product.id) : [...this.saved, product.id];
    save('productStore.wishlist', this.saved);
    this.saved$.next(this.saved);
    this.toast(was ? `Removed ${product.name} from saved` : `Saved ${product.name}`);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    save('productStore.theme', this.theme);
    this.applyTheme();
  }

  toast(text: string): void {
    const t = { id: ++this.toastId, text };
    this.toasts$.next([...this.toasts$.value, t]);
    setTimeout(() => this.toasts$.next(this.toasts$.value.filter((x) => x.id !== t.id)), 2500);
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-bs-theme', this.theme);
    document.documentElement.style.colorScheme = this.theme;
  }
  private lines(): CartLine[] {
    return Object.keys(this.cart)
      .map((id) => ({ product: this.products.getProduct(+id)!, qty: this.cart[+id] }))
      .filter((l) => l.product);
  }
  private commit(): void { save('productStore.cart', this.cart); this.cart$.next(this.lines()); }
}
