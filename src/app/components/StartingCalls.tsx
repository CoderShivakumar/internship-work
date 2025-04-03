import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon
import { HiUsers } from "react-icons/hi"; // Users group icon

interface User {
  id: number;
  name: string;
  profileImage?: string;
}

// Dummy Profile Image for Users Without Profile Pics
const defaultProfileImage = "https://via.placeholder.com/40";

// Dummy users list
const dummyUsers: User[] = [
  { id: 1, name: "Alice Johnson", profileImage: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Bob Smith", profileImage: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Charlie Davis" }, // No profile image
  { id: 4, name: "David Williams", profileImage: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Emma Brown" }, // No profile image
];

const StartingCalls: React.FC = () => {
  const [loggedInCount, setLoggedInCount] = useState<number | null>(null);

  useEffect(() => {
    // Generate random count only on the client
    setLoggedInCount(Math.floor(Math.random() * dummyUsers.length) + 1);
  }, []);

  return (
    <div className="fixed space-y-4 right-4 top-[135px] w-80">
      {/* Active Users Online Card */}
      <div className="flex items-center justify-center p-5 space-x-3 text-center text-white transition-transform transform rounded-lg shadow-lg bg-gradient-to-br from-purple-600 to-indigo-900 hover:scale-105">
        <HiUsers className="text-4xl" /> {/* Users icon */}
        <div>
          <h2 className="text-lg font-semibold">Active Users Online</h2>
          <p className="text-4xl font-bold">{loggedInCount !== null ? loggedInCount : "..."}</p>
        </div>
      </div>

      {/* Logged-in Users List Card */}
      <div className="p-4 bg-gray-100 border rounded-lg shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">User Profiles</h2>
        {dummyUsers.length > 0 ? (
          <div className="pr-2 space-y-2 overflow-y-auto h-60">
            {dummyUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 space-x-3 transition-all duration-300 bg-white border rounded-lg hover:bg-gray-200 hover:scale-105"
              >
                {/* Show user image if available, else show user icon */}
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="object-cover w-10 h-10 border rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500" />
                )}
                <span className="font-medium">{user.name}</span>
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
