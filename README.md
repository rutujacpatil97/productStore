# Product Store

A small Angular 13 storefront: browse products, search, filter by category, sort, and open a detail page where you can leave your own star rating.

## Features

- **Checkout** (`/checkout`) with a validated delivery form and an order confirmation page; the cart only empties once an order is placed.
- **Cart** (`/cart`) with quantities, stock limits, free-shipping progress and a mock checkout; persisted in `localStorage`.
- **Saved items** (heart) with a "Saved" filter, **dark mode**, toasts, sale/new/bestseller badges and low-stock hints.
- **12 products** illustrated with SVG files in `src/assets/products/`.
- **Related products** on each detail page.

- **Search** (header) matches product name and category.
- **Sort** by price (either direction) or rating.
- **Category filter** chips on the list page, with an empty state and "Clear filters".
- **Product detail page** at `/products/:id`, with an average rating and a personal rating saved in `localStorage`.
- Broken product images fall back to a placeholder.

## Development

Bootstrap 5.3 is required for dark mode. If you upgraded from an older copy, run `npm install` again and check `npm ls bootstrap` shows 5.3.3.

```bash
npm install
npm start        # http://localhost:4200
npm test         # Karma + Jasmine
npm run build    # output in dist/product-store
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/app/product.service.ts` | Product data plus search / category / sort state, exposed as `visibleProducts$` |
| `src/app/header` | Navbar with search box and sort select |
| `src/app/products` | List page (category chips + grid) |
| `src/app/item` | Product card |
| `src/app/product-detail` | Detail page |
| `src/app/star-rating` | Display / input star component |
| `src/app/img-fallback.directive.ts` | Placeholder for images that fail to load |
