# Product Catalog API (Backend)

An Express server utilizing Prisma ORM with PostgreSQL, featuring cursor-based pagination and category filtering.

## API Endpoints

* **GET /**: Welcoming landing page showing developer credits and sample test links.
* **GET /health**: API health status check.
* **GET /api/products**: Browse products catalog.
  * Query parameters:
    * `limit` (optional): Number of items per batch (default: 20, max: 100).
    * `category` (optional): Filter products by category (case-sensitive).
    * `cursor` (optional): Base64 URL-safe keyset pagination cursor containing `updatedAt` and `id`.

## Keyset Cursor Pagination
The pagination uses a base64 encoded cursor of `{ updatedAt: string, id: string }` to perform fast keyset scanning:
```typescript
// Sort order: updatedAt desc, id desc
(updatedAt < cursorDate) OR (updatedAt == cursorDate AND id < cursorId)
```

## Seeding the Database
To populate the database with 200,000 products across different categories with randomized update timestamps:
```bash
npm run build:seed
npx prisma db seed
```
