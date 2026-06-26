import axios from 'axios';

// Define the backend API URL
const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductsResponse {
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}

/**
 * Fetches products from the backend with cursor-based pagination and optional category filtering.
 */
export const fetchProducts = async (
  cursor?: string,
  category?: string,
  limit = 20
): Promise<PaginatedProductsResponse> => {
  const params: Record<string, string | number> = { limit };
  if (cursor) params.cursor = cursor;
  if (category) params.category = category;

  const response = await api.get<PaginatedProductsResponse>('/api/products', { params });
  return response.data;
};

/**
 * Checks the health status of the backend API server.
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get<{ status: string }>('/health');
    return response.data.status === 'OK';
  } catch {
    return false;
  }
};
