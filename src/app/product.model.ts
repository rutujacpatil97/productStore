export interface Product {
  id: number;
  name: string;
  imagePath: string;
  category: string;
  price: number;
  oldPrice?: number;
  /** Average rating, 1-5. */
  rating: number;
  reviews: number;
  stock: number;
  badge?: 'New' | 'Sale' | 'Bestseller';
  description: string;
}
