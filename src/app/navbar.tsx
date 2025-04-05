"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Recent } from "./components/Recent";
import StartingCalls from "./components/StartingCalls";

export const Navbar = () => {
  const [loggedInGradient, setLoggedInGradient] = useState("from-gray-800 to-gray-600");
  const [callsGradient, setCallsGradient] = useState("from-gray-700 to-teal-900");

  const [totalLogins, setTotalLogins] = useState<number | null>(null);
  const [callsToday, setCallsToday] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [loginsRes, callsRes] = await Promise.all([
          fetch("http://localhost:5000/total-logins"),
          fetch("http://localhost:5000/calls-today"),
        ]);

        const loginsData = await loginsRes.json();
        const callsData = await callsRes.json();

        setTotalLogins(loginsData.total_logins);
        setCallsToday(callsData.calls_today);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleMouseMoveLoggedIn = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xFactor = (e.clientX - rect.left) / rect.width;
    const yFactor = (e.clientY - rect.top) / rect.height;

    setLoggedInGradient(`from-gray-${Math.floor(800 - yFactor * 200)} to-blue-${Math.floor(900 - xFactor * 400)}`);
  };

  const handleMouseMoveCalls = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xFactor = (e.clientX - rect.left) / rect.width;
    const yFactor = (e.clientY - rect.top) / rect.height;

    setCallsGradient(`from-gray-${Math.floor(700 - yFactor * 100)} to-teal-${Math.floor(900 - xFactor * 400)}`);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <nav className="flex items-center justify-between w-full p-4 bg-black">
            <a href="#" className="ml-5 text-2xl text-white font-oswald">TeleExpress</a>
            <div className="flex items-center mr-5 space-x-4">
              <button
                onClick={handleLoginClick}
                className="px-6 py-2 font-semibold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:scale-105"
              >
                Login
              </button>
            </div>
          </nav>

          <div className="p-6 ml-[350px]">
            <h1 className="mb-6 text-3xl font-semibold text-white">Statistics</h1>
            <div className="flex gap-6 mt-4">
              <div
                className={`flex flex-col items-center justify-center w-64 text-white transition-transform transform shadow-lg h-36 bg-gradient-to-br ${loggedInGradient} rounded-xl`}
                onMouseMove={handleMouseMoveLoggedIn}
              >
                <h2 className="text-lg font-medium tracking-wide">Total Logged-in</h2>
                <p className="mt-2 text-4xl font-bold">
                  {totalLogins !== null ? totalLogins : "--"}
                </p>
                <p className="mt-1 text-xs text-gray-300">Updated in real-time</p>
              </div>

              <div
                className={`flex flex-col items-center justify-center w-64 text-white transition-transform transform shadow-lg h-36 bg-gradient-to-br ${callsGradient} rounded-xl`}
                onMouseMove={handleMouseMoveCalls}
              >
                <h2 className="text-lg font-medium tracking-wide">Calls Today</h2>
                <p className="mt-2 text-4xl font-bold">
                  {callsToday !== null ? callsToday : "--"}
                </p>
                <p className="mt-1 text-xs text-gray-300">As of today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Recent />
      <StartingCalls />
    </>
  );
};
