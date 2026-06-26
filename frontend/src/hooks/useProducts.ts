import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';
import type { Product } from '../services/api';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  nextCursor: string | null;
  loadMore: () => Promise<void>;
  retry: () => void;
}

/**
 * Reusable hook to handle cursor pagination, category filtering, 
 * loading states, errors, and list updates.
 */
export function useProducts(category?: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  // Helper function to fetch a batch of products
  const fetchBatch = useCallback(
    async (cursorToUse?: string | null, isReset = false) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProducts(cursorToUse || undefined, category);
        
        setProducts((prev) => {
          if (isReset) {
            return response.products;
          }
          // Avoid duplicate product additions (safeguard)
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = response.products.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });

        setNextCursor(response.nextCursor);
        setHasMore(response.hasMore);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products. Please check your connection.');
      } finally {
        setLoading(false);
      }
    },
    [category]
  );

  // Automatically reset list and fetch page 1 whenever selected category changes
  useEffect(() => {
    let isCurrent = true;

    const fetchInitial = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProducts(undefined, category);
        if (!isCurrent) return;
        setProducts(response.products);
        setNextCursor(response.nextCursor);
        setHasMore(response.hasMore);
      } catch (err: any) {
        if (!isCurrent) return;
        console.error('Error fetching initial products:', err);
        setError(err.message || 'Failed to load products. Please check if the backend is running.');
        setProducts([]);
        setNextCursor(null);
        setHasMore(false);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchInitial();

    return () => {
      isCurrent = false;
    };
  }, [category]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor) return;
    await fetchBatch(nextCursor, false);
  }, [loading, hasMore, nextCursor, fetchBatch]);

  const retry = useCallback(() => {
    if (products.length > 0 && nextCursor) {
      fetchBatch(nextCursor, false);
    } else {
      fetchBatch(null, true);
    }
  }, [products.length, nextCursor, fetchBatch]);

  return {
    products,
    loading,
    error,
    hasMore,
    nextCursor,
    loadMore,
    retry,
  };
}
