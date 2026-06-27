# Product Catalog Web Client (Frontend)

A React web application built with TypeScript, Vite, and Tailwind CSS.

## Features

* **Real-Time API Health Status**: Navbar health dot indicator that automatically polls the backend server `/health` status.
* **Category Filtering**: Dropdown filter selector that resets pagination and loads products by category.
* **Cursor Pagination**: Clean cursor-based catalog fetching with a "Load More" button that resolves `nextCursor`.
* **Formatted Pricing**: Formats product pricing as Indian Rupees (INR `₹`) formatted by local convention (`en-IN`).
* **Error & Loader States**: Handles connection errors with manual retry triggers, full-screen loaders, and inline pagination warning blocks.

## Environment Configurations
Configure the backend connection URL in your `.env` file:
```env
VITE_BACKEND_URL=https://codevector-assignment-1-0fq7.onrender.com/
```
*(Only environment variables prefixed with `VITE_` are exposed to the client-side bundle.)*

## Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
The compiled files will be located in the `dist` directory.
