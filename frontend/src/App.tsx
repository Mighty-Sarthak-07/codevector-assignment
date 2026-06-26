import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductList } from './components/ProductList';
import { useProducts } from './hooks/useProducts';
import { checkHealth } from './services/api';

// Predefined categories aligned with the database seed configuration
const CATEGORIES = [
  'Electronics',
  'Apparel',
  'Home & Kitchen',
  'Books',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Toys & Games',
  'Automotive',
  'Tools & Home Improvement',
  'Office Products',
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Fetch product list using custom pagination hook
  const {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
  } = useProducts(selectedCategory || undefined);

  // Background health monitoring for the backend API status
  useEffect(() => {
    let active = true;

    const verifyHealth = async () => {
      const isOnline = await checkHealth();
      if (!active) return;
      setApiStatus(isOnline ? 'online' : 'offline');
    };

    verifyHealth();

    // Check health status every 15 seconds
    const intervalId = setInterval(verifyHealth, 15000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar apiStatus={apiStatus} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 box-border">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 m-0">
              Products Catalog
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing {products.length} product{products.length === 1 ? '' : 's'}
            </p>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
            categories={CATEGORIES}
          />
        </div>

        <ProductList
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onRetry={retry}
        />
      </main>
    </div>
  );
}

export default App;
