import Navbar from '@components/navbar';
import Sidebar from '@components/sidebar';
import { useState } from 'react';
import type { SkipTypes as Skip } from '@/types';
import { skips } from '@data/index';

const itemsPerPage = 6;

export default function SkipSelector() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterSize, setFilterSize] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSkipForModal, setSelectedSkipForModal] = useState<Skip | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredSkips = filterSize ? skips.filter((skip) => skip.size === filterSize) : skips;

  const totalPages = Math.ceil(filteredSkips.length / itemsPerPage);
  const paginatedSkips = filteredSkips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const SetSelectedIdMenu = ({ id, skip }: { id: number; skip: Skip | null }) => {
    if (selectedId === id) {
      setSelectedId(null);
      return;
    } else {
      setSelectedId(id);
      setSelectedSkipForModal(skip);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-gray-900 text-white px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Navbar */}
          <Navbar
            setViewMode={setViewMode}
            viewMode={viewMode}
            setFilterSize={setFilterSize}
            setCurrentPage={setCurrentPage}
            skips={skips}
          />

          <section className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {paginatedSkips.map((skip) => {
              const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2);
              const isSelected = skip.id === selectedId;
              const imageSrc = 'https://www.wintersbros.com/wp-content/uploads/2021/02/5-yard-dumpster-2021.jpg';

              return (
                <div
                  key={skip.id}
                  onClick={() => SetSelectedIdMenu({ id: skip.id, skip: skip ? skip : null })}
                  className={`transition-transform duration-300 transform hover:scale-[1.01] rounded-xl overflow-hidden border-2 shadow-md cursor-pointer ${
                    isSelected ? 'border-blue-500 bg-blue-800/20' : 'border-gray-700 bg-gray-800'
                  } ${viewMode === 'grid' ? 'p-5 flex flex-col' : 'p-4 flex flex-col md:flex-row gap-4'}`}
                >
                  <p className="text-sm text-gray-300 font-semibold mb-1">{skip.size} Yards</p>

                  <img
                    src={imageSrc}
                    alt={`${skip.size} Yard Skip`}
                    className={`rounded-lg cursor-zoom-in ${viewMode === 'grid' ? 'object-cover w-full h-40 mb-4' : 'w-full md:w-1/2 h-52'}`}
                  />

                  <div className={`flex-1 flex flex-col justify-between ${viewMode === 'grid' ? '' : 'pt-2'}`}>
                    <div className={viewMode === 'grid' ? 'mb-2' : 'mb-1'}>
                      <h2 className="text-xl font-bold mb-1">{skip.size} Yard Skip</h2>
                      {!skip.allowed_on_road && (
                        <div className="relative text-xs  bg-yellow-100 border border-yellow-400 text-yellow-800 font-semibold rounded mb-3 mt-3 px-1 py-1 text-center">
                          ⚠️not allowed on the road.
                        </div>
                      )}

                      <div className={`flex ${viewMode === 'grid' ? 'justify-between items-center mb-2' : 'flex-col gap-y-3 mb-2'}`}>
                        <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
                          {skip.hire_period_days} Days hire period
                        </span>

                        <p className="text-lg text-yellow-400 font-bold">£{totalPrice}</p>
                      </div>

                      <button
                        className={`py-2 w-full rounded-lg font-medium transition-colors ${
                          isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          SetSelectedIdMenu({ id: skip.id, skip: skip ? skip : null });
                        }}
                      >
                        {isSelected ? '✓ Selected' : 'Select This Skip'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {selectedSkipForModal && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={() => setSelectedSkipForModal(null)} />

              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative z-50">
                  <div className="flex  justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedSkipForModal.size} Yard Skip</h2>
                    <button
                      onClick={() => setSelectedSkipForModal(null)}
                      className="text-gray-600 p-1 hover:text-red-400 cursor-pointer focus:outline-none"
                      aria-label="Close Sidebar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <img
                    src="https://www.wintersbros.com/wp-content/uploads/2021/02/5-yard-dumpster-2021.jpg"
                    alt={`${selectedSkipForModal.size} Yard`}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="space-y-4 text-gray-700 text-sm">
                    <p>
                      <strong>Hire Period:</strong> {selectedSkipForModal.hire_period_days} days
                    </p>
                    <p>
                      <strong>Price:</strong> £{(selectedSkipForModal.price_before_vat * (1 + selectedSkipForModal.vat / 100)).toFixed(2)}
                    </p>

                    <div className="relative overflow-hidden bg-yellow-100 border border-yellow-400 text-yellow-800 rounded px-4 py-2">
                      <div className="inline-block whitespace-nowrap animate-scroll">
                        ⚠️ Imagery and information shown throughout this website may not reflect the exact shape or size specification —
                        colors may vary, options and/or accessories may be featured at additional cost.
                      </div>
                    </div>

                    {!selectedSkipForModal.allowed_on_road && (
                      <div className="flex items-center gap-2 text-red-600 font-semibold bg-red-100 border border-red-400 px-3 py-2 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Not allowed on the road
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between gap-3">
                    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Back</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Continue</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
