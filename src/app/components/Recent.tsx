import React from 'react';

export const Recent = () => {
  return (
    <div className="ml-[380px] mt-[20px] p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg w-[600px]">
      <h1 className="mb-4 text-3xl font-semibold text-left text-white">Recent Calls</h1>

      <div className="flex gap-2">
        {/* Recent Call 1 */}
        <div className="flex flex-col items-center justify-center w-56 p-5 text-white transition-transform transform bg-gray-700 rounded-lg shadow-md h-28 hover:scale-105">
          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-gray-300">March 28, 10:30 AM</p>
        </div>

        {/* Recent Call 2 */}
        <div className="flex flex-col items-center justify-center w-56 p-5 text-white transition-transform transform bg-gray-700 rounded-lg shadow-md h-28 hover:scale-105">
          <h2 className="text-lg font-semibold">Jane Smith</h2>
          <p className="text-sm text-gray-300">March 27, 3:15 PM</p>
        </div>

        {/* Recent Call 3 */}
        <div className="flex flex-col items-center justify-center w-56 p-5 text-white transition-transform transform bg-gray-700 rounded-lg shadow-md h-28 hover:scale-105">
          <h2 className="text-lg font-semibold">Alex Johnson</h2>
          <p className="text-sm text-gray-300">March 26, 6:45 PM</p>
        </div>
      </div>
    </div>
  );
};
