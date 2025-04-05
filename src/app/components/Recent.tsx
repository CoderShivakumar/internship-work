"use client";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
  last_login: string;
}

export const Recent: React.FC = () => {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRecentLogins = async () => {
      try {
        const res = await fetch("http://localhost:5000/recent-logins");
        const data = await res.json();
        setRecentUsers(data.slice(0, 3)); // 3 most recent logins
      } catch (err) {
        console.error("Failed to fetch recent logins", err);
      }
    };

    fetchRecentLogins();
  }, []);

  return (
    <div className="ml-[380px] mt-[20px] p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg w-[600px]">
      <h1 className="mb-4 text-3xl font-semibold text-left text-white">Recent Calls</h1>
      <div className="flex gap-2">
        {recentUsers.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-56 p-5 text-white transition-transform transform bg-gray-700 rounded-lg shadow-md h-28 hover:scale-105"
          >
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-sm text-gray-300">{user.last_login}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
