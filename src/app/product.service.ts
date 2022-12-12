import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products : Product[] = [
    new Product(
      'Shirt',
      'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2013/7/Seller/1333568/Images/1333568_0_201307090537510000000.jpg',
      'Clothing',
      1200,
      4),
      new Product(
        'Trouser',
        'https://www.fjallraven.com/4a50f0/globalassets/catalogs/fjallraven/f9/f906/f90651/f246/7323450463199_fw18_a_soermland_tapered_trousers_m_21.jpg?width=2000&height=2000&mode=BoxPad&bgcolor=fff&quality=80',
        'Clothing',
        950,
        4),
      new Product(
        'Dress',
        'http://cdn.freewebstore.com/origin/693314/919x1208_1589294195053.jpg',
        'Clothing',
        800,
        3),
        new Product(
          'Shoes',
          'https://m.media-amazon.com/images/I/71D9ImsvEtL._UY500_.jpg',
          'Footwear',
          2000,
          5),

  ];

  constructor() { }

  getProducts() {
    return this.products.slice();
  }

  sortByPrice() : Product[]{
    let sortedproducts = this.products.slice().sort((a,b)=>a.price - b.price);
    return sortedproducts;
  }
}
