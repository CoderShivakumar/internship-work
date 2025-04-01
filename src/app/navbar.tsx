import React from 'react';
import { Recent } from './components/Recent';
import { StartingCalls } from './components/StartingCalls';

export const Navbar = () => {
  return (
    <>
    <StartingCalls/>
    <div className="flex">
      {/* SideNav occupies space, so content starts after it */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="flex items-center justify-between w-full p-4 bg-black">
          {/* Left Side: Brand Name */}
          <a href="" className="ml-5 text-2xl text-white font-oswald">
            TeleExpress
          </a>

          {/* Right Side: Profile Section */}
          <div className="flex items-center mr-5 space-x-4">
            {/* Username and Role */}
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-white">JohnDoe</h2>
              <h4 className="text-xs text-white">Admin</h4>
            </div>

            {/* Rounded Image */}
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src="/globe.svg"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </nav>

        {/* Statistics Section */}
        <div className="p-6 ml-[350px]"> {/* Adjust left margin to avoid overlap */}
          <h1 className="text-3xl text-white">Statistics</h1>
          <div className="flex gap-6 mt-4">
            {/* Total Logged-in Users Box */}
            <div className="flex flex-col items-center justify-center w-64 h-32 text-white bg-blue-600 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Total Logged-in</h2>
              <p className="text-2xl font-bold">150</p>
            </div>

            {/* Separate Calls for the Day Box */}
            <div className="flex flex-col items-center justify-center w-64 h-32 text-white bg-green-600 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Calls Today</h2>
              <p className="text-2xl font-bold">50</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Recent/>
    
    </>
  );
};
