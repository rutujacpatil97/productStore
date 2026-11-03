import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const visible = (): Promise<Product[]> =>
    service.visibleProducts$.pipe(first()).toPromise() as Promise<Product[]>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('returns all products by default', async () => {
    expect((await visible()).length).toBe(service.getProducts().length);
  });

  it('filters by search term, case-insensitively', async () => {
    service.setSearch('  SHOE ');
    expect((await visible()).map((p) => p.name)).toEqual(['Shoes']);
  });

  it('filters by category', async () => {
    service.setCategory('Footwear');
    expect((await visible()).every((p) => p.category === 'Footwear')).toBeTrue();
  });

  it('sorts by price ascending and descending', async () => {
    service.setSort('price-asc');
    const asc = (await visible()).map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));

    service.setSort('price-desc');
    const desc = (await visible()).map((p) => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it('does not mutate the underlying product order when sorting', () => {
    const before = service.getProducts().map((p) => p.id);
    service.setSort('price-desc');
    expect(service.getProducts().map((p) => p.id)).toEqual(before);
  });

  it('resets filters', async () => {
    service.setSearch('zzz');
    service.setCategory('Clothing');
    service.setSort('rating');
    service.resetFilters();
    expect((await visible()).length).toBe(service.getProducts().length);
  });

  it('finds a product by id and returns undefined for unknown ids', () => {
    expect(service.getProduct(1)?.name).toBe('Shirt');
    expect(service.getProduct(999)).toBeUndefined();
  });

  it('persists user ratings', () => {
    expect(service.getUserRating(1)).toBe(0);
    service.setUserRating(1, 4);
    expect(service.getUserRating(1)).toBe(4);
  });
});
