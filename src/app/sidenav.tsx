import React from 'react';
import { Icons } from './components/Icons';

export const Sidenav = () => {
  return (
    <div className="fixed top-30 left-20 flex flex-col items-center w-16 py-4 space-y-3 bg-gray-900 border-2 border-gray-700 rounded-lg h-[500px] mt-0">
      <Icons.call className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.statistics className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.multipleCalls className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.storage className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.missedCall className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <div className="flex flex-col gap-3 p-4 mt-auto">
        <Icons.settings className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
        <Icons.logout className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      </div>
    </div>
  );
};
