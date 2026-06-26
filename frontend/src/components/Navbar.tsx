import React from 'react';

interface NavbarProps {
  apiStatus: 'online' | 'offline' | 'checking';
}

export const Navbar: React.FC<NavbarProps> = ({ apiStatus }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl" aria-hidden="true">📦</span>
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Product Browser
        </h1>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
        <span
          className={`w-2 h-2 rounded-full inline-block ${
            apiStatus === 'online'
              ? 'bg-emerald-500'
              : apiStatus === 'offline'
              ? 'bg-red-500'
              : 'bg-gray-400 animate-pulse'
          }`}
        />
        <span>
          API: {apiStatus.charAt(0).toUpperCase() + apiStatus.slice(1)}
        </span>
      </div>
    </header>
  );
};
