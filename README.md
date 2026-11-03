# Product Store

A responsive Angular 13 storefront with search, filters, a cart, a wishlist, a validated checkout and light/dark themes. Product images are hand-built SVGs, so there are no external image dependencies.

## Screenshots

| Home (light) | Home (dark) |
| --- | --- |
| <img width="1912" height="955" alt="image" src="https://github.com/user-attachments/assets/59618454-5b51-44dc-ad53-5e318d4e2ed3" /> | <img width="1910" height="952" alt="image" src="https://github.com/user-attachments/assets/1e4e991c-4433-4373-8053-de6d8b0bc7ba" /> |

| Product detail | Cart |
| --- | --- |
| <img width="1321" height="860" alt="image" src="https://github.com/user-attachments/assets/888c1bff-3747-4217-bba3-45dce87d461d" /> | <img width="1367" height="495" alt="image" src="https://github.com/user-attachments/assets/e58e692b-2b73-4751-a739-7096dc27e504" /> |

| Checkout | Order confirmation |
| --- | --- |
| <img width="1336" height="753" alt="image" src="https://github.com/user-attachments/assets/e0a998f0-fe1a-4da6-ab76-5efa7dc2abe3" /> | <img width="1335" height="535" alt="image" src="https://github.com/user-attachments/assets/e1b7e323-364f-40eb-8372-b12fe3142499" /> |

## Features

**Browsing**
- 12 products across Clothing, Footwear, Accessories, Electronics and Home
- Search by product name or category
- Category chips and a "Saved" filter
- Sort by price (low to high, high to low) or rating
- Sale, New and Bestseller badges, discount percentages and low-stock hints
- Empty states with a "Clear filters" action

**Product page** (`/products/:id`)
- Breadcrumbs, average rating with review count, stock status
- Quantity picker and add to cart
- Personal star rating, remembered in the browser
- "You might also like" related products

**Cart and checkout**
- Cart (`/cart`) with quantity controls capped at stock, line totals and a free-shipping progress bar (free over ₹3000, otherwise ₹99)
- Checkout (`/checkout`) with a validated delivery form (name, email, 10-digit phone, address, city, 6-digit PIN) and a payment choice
- Order confirmation (`/order-confirmation`); the cart empties only once an order is placed
- Cart, saved items and last order persist in `localStorage`

**UI and UX**
- Light and dark mode, following the system preference until toggled
- Sticky header with live search and a cart badge
- Toast notifications, hover effects, mobile-friendly layout
- Broken images fall back to a placeholder

## Tech stack

Angular 13, TypeScript, RxJS, Bootstrap 5.3.3, Font Awesome 4.7, Karma + Jasmine.

## Getting started

```bash
npm install
npm start        # http://localhost:4200
npm test         # Karma + Jasmine
npm run build    # production build in dist/product-store
```

Bootstrap 5.3 is required for dark mode. If you upgraded from an older copy, run `npm install` again and check that `npm ls bootstrap` shows 5.3.3.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/app/product.service.ts` | Product data plus search, category and sort state (`visibleProducts$`) |
| `src/app/store.service.ts` | Cart, wishlist, orders, toasts and theme, persisted in `localStorage` |
| `src/app/header` | Sticky navbar: search, theme toggle, cart badge |
| `src/app/products` | Shop page: hero, filters, sort and product grid |
| `src/app/item` | Product card |
| `src/app/product-detail` | Product page |
| `src/app/cart` | Cart page |
| `src/app/checkout` | Checkout form and order confirmation |
| `src/app/star-rating` | Display and input star component |
| `src/app/img-fallback.directive.ts` | Placeholder for images that fail to load |
| `src/assets/products` | SVG product illustrations |

## Routes

| Route | Page |
| --- | --- |
| `/products` | Shop |
| `/products/:id` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/order-confirmation` | Order confirmation |

## Notes

This is a demo store: products are hardcoded in `ProductService` and no real payment is taken.
