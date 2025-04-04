"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Import router
import { Recent } from './components/Recent';
import StartingCalls from './components/StartingCalls';

export const Navbar = () => {
  const [loggedInGradient, setLoggedInGradient] = useState('from-gray-800 to-gray-600');
  const [callsGradient, setCallsGradient] = useState('from-gray-700 to-teal-900');

  const router = useRouter(); // <-- Initialize router

  const handleLoginClick = () => {
    router.push('/signin'); // <-- Redirect to signin page
  };

  const handleMouseMoveLoggedIn = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const xFactor = x / width;
    const yFactor = y / height;

    const blueIntensity = Math.floor(900 - xFactor * 400);
    const grayIntensity = Math.floor(800 - yFactor * 200);
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

    const tealIntensity = Math.floor(900 - xFactor * 400);
    const grayIntensity = Math.floor(700 - yFactor * 100);
    setCallsGradient(`from-gray-${grayIntensity} to-teal-${tealIntensity}`);
  };

  const handleMouseLeave = (setGradient, defaultGradient) => {
    setGradient(defaultGradient);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          {/* Navbar */}
          <nav className="flex items-center justify-between w-full p-4 bg-black">
            {/* Brand Name */}
            <a href="#" className="ml-5 text-2xl text-white font-oswald">
              TeleExpress
            </a>

            {/* Gradient Login Button */}
            <div className="flex items-center mr-5 space-x-4">
              <button
                onClick={handleLoginClick}
                className="px-6 py-2 font-semibold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:scale-105 hover:from-purple-700 hover:to-red-600"
              >
                Login
              </button>
            </div>
          </nav>

          {/* Statistics Section */}
          <div className="p-6 ml-[350px]">
            <h1 className="mb-6 text-3xl font-semibold text-white">Statistics</h1>
            <div className="flex gap-6 mt-4">
              {/* Logged-in Users Box */}
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

              {/* Calls Today Box */}
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

      {/* Additional Sections */}
      <Recent />
      <StartingCalls />
    </>
  );
};
