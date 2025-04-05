"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";




interface User {
  id: number;
  username: string;
  last_login: string;
  profileImage?: string;
}

const defaultProfileImage = "components/avatar.jpg";

const StartingCalls: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInCount, setLoggedInCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setUsers(data);
        setLoggedInCount(data.length);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="fixed space-y-4 right-4 top-[135px] w-80">
      <div className="flex items-center justify-center p-5 space-x-3 text-center text-white transition-transform transform rounded-lg shadow-lg bg-gradient-to-br from-purple-600 to-indigo-900 hover:scale-105">
        <HiUsers className="text-4xl" />
        <div>
          <h2 className="text-lg font-semibold">Active Users Online</h2>
          <p className="text-4xl font-bold">{loggedInCount !== null ? loggedInCount : "..."}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 border rounded-lg shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">User Profiles</h2>
        {users.length > 0 ? (
          <div className="pr-2 space-y-2 overflow-y-auto h-60">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 space-x-3 transition-all duration-300 bg-white border rounded-lg hover:bg-gray-200 hover:scale-105"
              >
                <img
                  src={defaultProfileImage}
                  alt={user.username}
                  className="object-cover w-10 h-10 border rounded-full"
                />
                <span className="font-medium">{user.username}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users logged in</p>
        )}
      </div>
    </div>
  );
};

export default StartingCalls;
