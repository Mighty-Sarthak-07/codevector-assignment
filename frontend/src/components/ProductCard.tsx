import React from 'react';
import type { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(product.price));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 text-left">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-base font-semibold text-gray-900 truncate flex-grow" title={product.name}>
          {product.name}
        </h3>
        <span className="text-base font-bold text-blue-600 shrink-0">{formattedPrice}</span>
      </div>
      <div className="mb-4">
        <span className="inline-block bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded border border-gray-200">
          {product.category}
        </span>
      </div>
      <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">Added</span>
          <span className="text-gray-600 font-medium">{formatDate(product.createdAt)}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">Updated</span>
          <span className="text-gray-600 font-medium">{formatDate(product.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};
