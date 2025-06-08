import React from 'react';
import type { NavbarProps } from '@/types';

const Navbar: React.FC<NavbarProps> = ({ setViewMode, viewMode, setFilterSize, setCurrentPage, skips }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white ">Choose Your Skip Size</h1>
          <p className="text-gray-400 mt-1">Select the skip size that best suits your needs.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              aria-label="Grid View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6M4 14h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              aria-label="List View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Filter Dropdown */}
          <select
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setFilterSize(isNaN(val) ? null : val);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-md bg-gray-700  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sizes</option>
            {[...new Set(skips.map((s) => s.size))].map((size) => (
              <option key={size} value={size}>
                {size} Yard
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
