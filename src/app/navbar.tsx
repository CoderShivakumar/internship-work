"use client";
import React, { useState } from 'react';
import { Recent } from './components/Recent';
import { relative } from 'path';
import StartingCalls from './components/StartingCalls';

export const Navbar = () => {
  const [loggedInGradient, setLoggedInGradient] = useState('from-gray-800 to-gray-600');
  const [callsGradient, setCallsGradient] = useState('from-gray-700 to-teal-900');

  const handleMouseMoveLoggedIn = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the container
    const y = e.clientY - rect.top;   // Y position within the container
    const width = rect.width;
    const height = rect.height;

    // Calculate intensity based on cursor position (0 to 1)
    const xFactor = x / width;
    const yFactor = y / height;

    // Dynamic gradient based on hover position
    const blueIntensity = Math.floor(900 - xFactor * 400); // Blue from 900 to 500
    const grayIntensity = Math.floor(800 - yFactor * 200); // Gray from 800 to 600
    setLoggedInGradient(`from-gray-${grayIntensity} to-blue-${blueIntensity}`);
  };

  const handleMouseMoveCalls = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const xFactor = x / width;
    const yFactor = y / height;

    const tealIntensity = Math.floor(900 - xFactor * 400); // Teal from 900 to 500
    const grayIntensity = Math.floor(700 - yFactor * 100); // Gray from 700 to 600
    setCallsGradient(`from-gray-${grayIntensity} to-teal-${tealIntensity}`);
  };

  const handleMouseLeave = (setGradient, defaultGradient) => {
    setGradient(defaultGradient);
  };

  return (
    <>
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
          <div className="p-6 ml-[350px]">
            <h1 className="mb-6 text-3xl font-semibold text-white">Statistics</h1>
            <div className="flex gap-6 mt-4">
              {/* Total Logged-in Users Box */}
              <div
                className={`flex flex-col items-center justify-center w-64 text-white transition-transform transform shadow-lg h-36 bg-gradient-to-br ${loggedInGradient} rounded-xl`}
                onMouseMove={handleMouseMoveLoggedIn}
                onMouseLeave={() =>
                  handleMouseLeave(setLoggedInGradient, 'from-gray-800 to-gray-600')
                }
              >
                <h2 className="text-lg font-medium tracking-wide">Total Logged-in</h2>
                <p className="mt-2 text-4xl font-bold">150</p>
                <p className="mt-1 text-xs text-gray-300">Updated in real-time</p>
              </div>

              {/* Separate Calls for the Day Box */}
              <div
                className={`flex flex-col items-center justify-center w-64 text-white transition-transform transform shadow-lg h-36 bg-gradient-to-br ${callsGradient} rounded-xl`}
                onMouseMove={handleMouseMoveCalls}
                onMouseLeave={() =>
                  handleMouseLeave(setCallsGradient, 'from-gray-700 to-teal-900')
                }
              >
                <h2 className="text-lg font-medium tracking-wide">Calls Today</h2>
                <p className="mt-2 text-4xl font-bold">50</p>
                <p className="mt-1 text-xs text-gray-300">As of today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Recent />
      <StartingCalls/>
    </>
  );
};