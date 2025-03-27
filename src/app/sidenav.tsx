import React from 'react'
import { Icons } from './components/Icons';
export const Sidenav = () => {
  return (
    <>-
    <div className="flex flex-col items-center w-16 h-screen py-6 space-y-4 bg-gray-900 border-2 border-gray-700 rounded-lg">
      <Icons.call className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.statistics className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.multipleCalls className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.storage className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <Icons.missedCall className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      <div className='flex flex-col gap-5 p-48'>
        <Icons.settings className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
        <Icons.logout className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
      </div>
    </div>
    </>
  )
}
