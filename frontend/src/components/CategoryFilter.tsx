import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
  categories: string[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onChangeCategory,
  categories,
}) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
        Filter by Category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md cursor-pointer outline-none transition-colors duration-200 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 min-w-[200px]"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
