import React from 'react';
import type { Product } from '../services/api';
import { ProductCard } from './ProductCard';
import { LoadMoreButton } from './LoadMoreButton';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  hasMore,
  onLoadMore,
  onRetry,
}) => {
  // 1. Full-page error state (no products loaded yet)
  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-8">
        <div className="bg-red-50 border border-red-100 rounded-lg p-8 max-w-md shadow-sm">
          <span className="text-3xl block mb-3" role="img" aria-label="warning">⚠️</span>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Products</h3>
          <p className="text-sm text-red-700 mb-5 leading-relaxed">{error}</p>
          <button 
            onClick={onRetry} 
            className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-md transition-colors duration-200 hover:bg-red-700 cursor-pointer" 
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 2. Initial loading state (no products loaded yet)
  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-8">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-4 text-sm text-gray-500">Fetching products...</p>
      </div>
    );
  }

  // 3. Empty state (loading finished and 0 products found)
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-8">
        <div className="bg-white border border-dashed border-gray-300 rounded-lg py-12 px-8 max-w-md w-full">
          <span className="text-4xl block mb-4" role="img" aria-label="empty">🔍</span>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Found</h3>
          <p className="text-sm text-gray-500">We couldn't find any products in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Inline pagination Error */}
      {error && (
        <div className="flex items-center justify-center gap-4 bg-red-50 border border-red-100 rounded-md p-3 mt-8 mb-12 w-full box-border">
          <p className="text-sm text-red-800 m-0">Error loading next batch: {error}</p>
          <button 
            onClick={onRetry} 
            className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md transition-colors duration-200 hover:bg-red-700 cursor-pointer" 
            type="button"
          >
            Retry
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !error && (
        <LoadMoreButton onClick={onLoadMore} loading={loading} />
      )}
    </div>
  );
};
