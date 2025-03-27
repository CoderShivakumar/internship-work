import React from 'react';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-black p-4 w-full">
      {/* Left Side: Brand Name */}
      <a href="" className="text-white text-2xl font-oswald ml-5">
        TeleExpress
      </a>

      {/* Right Side: Profile Section */}
      <div className="flex items-center space-x-4 mr-5">
        {/* Username and Role */}
        <div className="flex flex-col">
          <h2 className="text-white text-xl font-bold">JohnDoe</h2>
          <h4 className="text-white text-xs">Admin</h4>
        </div>

        {/* Rounded Image (moved after text) */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/globe.svg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};