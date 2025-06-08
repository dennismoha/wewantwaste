import type { Sidebarprops } from '@/types';

const Sidebar: React.FC<Sidebarprops> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div className="lg:hidden mb-4">
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
            aria-label="Open Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-xl font-bold">Skip Selection</h2>
          <div />
        </div>
      </div>

      <aside
        className={`lg:static fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 z-40 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:h-auto lg:rounded-xl lg:shadow-md`}
      >
        <div className="flex justify-end lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white p-1 hover:text-red-400 focus:outline-none"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-white">Step Info</h2>

        <nav className="space-y-4 text-sm">
          <div>
            <div className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow cursor-pointer">• Postcode</div>
            <div className="flex justify-center text-green-600 ">↓</div>
          </div>

          <div>
            <div className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow cursor-pointer">• Waste Type</div>
            <div className="flex justify-center text-green-600 ">↓</div>
          </div>

          <div>
            <div className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow cursor-pointer">• Select Skip</div>
            <div className="flex justify-center text-blue-400 animate-bounce mt-1">↓</div>
          </div>

          <div>
            <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold shadow cursor-pointer">• Permit Check</div>
            <div className="flex justify-center text-gray-500 mt-1">↓</div>
          </div>

          <div>
            <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold shadow cursor-pointer">• Choose Date</div>
            <div className="flex justify-center text-gray-500 mt-1">↓</div>
          </div>

          <div>
            <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold shadow cursor-pointer">• Payment</div>
          </div>
        </nav>
      </aside>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" />}
    </>
  );
};

export default Sidebar;
