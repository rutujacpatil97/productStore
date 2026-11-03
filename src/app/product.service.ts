import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

const USER_RATINGS_KEY = 'productStore.userRatings';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly products: Product[] = [
    { id: 1, name: 'Shirt', imagePath: 'assets/products/shirt.svg', category: 'Clothing', price: 1200, oldPrice: 1600, rating: 4, reviews: 212, stock: 25, badge: 'Sale', description: 'A classic everyday shirt in breathable cotton that works for the office and the weekend.' },
    { id: 2, name: 'Trouser', imagePath: 'assets/products/trousers.svg', category: 'Clothing', price: 950, rating: 4, reviews: 148, stock: 18, description: 'Tapered, hard-wearing trousers with a comfortable stretch fit.' },
    { id: 3, name: 'Dress', imagePath: 'assets/products/dress.svg', category: 'Clothing', price: 800, rating: 3, reviews: 96, stock: 12, badge: 'New', description: 'A light, easy dress with a flattering flare, made for warm weather.' },
    { id: 4, name: 'Shoes', imagePath: 'assets/products/shoes.svg', category: 'Footwear', price: 2000, oldPrice: 2600, rating: 5, reviews: 431, stock: 30, badge: 'Bestseller', description: 'Cushioned, durable everyday sneakers built for all-day wear.' },
    { id: 5, name: 'Hoodie', imagePath: 'assets/products/hoodie.svg', category: 'Clothing', price: 1800, rating: 5, reviews: 305, stock: 4, badge: 'Bestseller', description: 'Heavyweight fleece hoodie with a roomy hood and kangaroo pocket.' },
    { id: 6, name: 'Everyday Backpack', imagePath: 'assets/products/backpack.svg', category: 'Accessories', price: 2400, oldPrice: 3000, rating: 4, reviews: 187, stock: 20, badge: 'Sale', description: 'Water-resistant 24L pack with a padded laptop sleeve and hidden pocket.' },
    { id: 7, name: 'Aviator Sunglasses', imagePath: 'assets/products/sunglasses.svg', category: 'Accessories', price: 1500, rating: 4, reviews: 120, stock: 0, description: 'UV400 polarised lenses in a lightweight metal frame.' },
    { id: 8, name: 'Classic Watch', imagePath: 'assets/products/watch.svg', category: 'Accessories', price: 3200, rating: 5, reviews: 260, stock: 9, badge: 'New', description: 'Minimal analog watch with sapphire-coated glass and a soft strap.' },
    { id: 9, name: 'Wireless Headphones', imagePath: 'assets/products/headphones.svg', category: 'Electronics', price: 4500, oldPrice: 5500, rating: 4, reviews: 512, stock: 15, badge: 'Sale', description: 'Over-ear Bluetooth headphones with noise cancelling and 40h battery.' },
    { id: 10, name: 'Bluetooth Speaker', imagePath: 'assets/products/speaker.svg', category: 'Electronics', price: 2800, rating: 4, reviews: 233, stock: 3, description: 'Portable 360° speaker with deep bass and an IPX6 splash-proof body.' },
    { id: 11, name: 'Ceramic Mug', imagePath: 'assets/products/mug.svg', category: 'Home', price: 450, rating: 5, reviews: 88, stock: 50, description: 'Hand-glazed 350ml stoneware mug that keeps drinks warm longer.' },
    { id: 12, name: 'Desk Lamp', imagePath: 'assets/products/lamp.svg', category: 'Home', price: 1900, rating: 4, reviews: 74, stock: 11, badge: 'New', description: 'Adjustable LED desk lamp with three colour temperatures.' },
  ];

  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sort$ = new BehaviorSubject<SortOption>('default');
  private readonly category$ = new BehaviorSubject<string>('');

  /** Products after the current search / category filter / sort are applied. */
  readonly visibleProducts$: Observable<Product[]> = combineLatest([
    this.search$,
    this.category$,
    this.sort$,
  ]).pipe(map(([term, category, sort]) => this.applyView(term, category, sort)));

  get searchTerm(): string {
    return this.search$.value;
  }
  get sortOption(): SortOption {
    return this.sort$.value;
  }
  get category(): string {
    return this.category$.value;
  }

  setSearch(term: string): void {
    this.search$.next(term);
  }
  setSort(option: SortOption): void {
    this.sort$.next(option);
  }
  setCategory(category: string): void {
    this.category$.next(category);
  }
  resetFilters(): void {
    this.search$.next('');
    this.category$.next('');
    this.sort$.next('default');
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getRelated(product: Product, limit = 4): Product[] {
    return this.products
      .filter((p) => p.id !== product.id)
      .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
      .slice(0, limit);
  }

  getCategories(): string[] {
    return Array.from(new Set(this.products.map((p) => p.category)));
  }

  /** The rating this browser's user gave a product (0 if none). */
  getUserRating(id: number): number {
    return this.readUserRatings()[id] ?? 0;
  }

  setUserRating(id: number, rating: number): void {
    const ratings = this.readUserRatings();
    ratings[id] = rating;
    try {
      localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(ratings));
    } catch {
      // Storage unavailable (private mode, quota): the rating just won't persist.
    }
  }

  private readUserRatings(): Record<number, number> {
    try {
      return JSON.parse(localStorage.getItem(USER_RATINGS_KEY) ?? '{}');
    } catch {
      return {};
    }
  }

  private applyView(term: string, category: string, sort: SortOption): Product[] {
    const query = term.trim().toLowerCase();
    let result = this.products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!query ||
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query))
    );

    switch (sort) {
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }
}
