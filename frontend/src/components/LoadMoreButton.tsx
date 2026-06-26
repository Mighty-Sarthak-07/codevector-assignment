import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, loading }) => {
  return (
    <div className="flex justify-center mt-8 mb-12">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-80 flex items-center justify-center min-w-[180px]"
        type="button"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
            Loading more...
          </span>
        ) : (
          'Load More Products'
        )}
      </button>
    </div>
  );
};
