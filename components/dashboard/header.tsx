'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Settings, Search, User, Menu, X } from 'lucide-react';
import { signOut } from "next-auth/react"

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Header left: Logo or title on mobile */}
          <div className="flex md:hidden items-center">
            <button 
              type="button" 
              className="text-gray-300 hover:text-white"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="ml-2 text-lg font-semibold text-white">Vigilance360</span>
          </div>
          
          {/* Header center: Search */}
          <div className={`flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end ${searchOpen ? 'block' : 'hidden md:block'}`}>
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-slate-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search for alerts, cameras..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          {/* Header right: Actions */}
          <div className="flex items-center">
            {/* Mobile search button */}
            <button
              type="button"
              className="md:hidden p-1 ml-auto mr-3 text-gray-400 hover:text-white"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            
            {/* Notifications */}
            <div className="relative ml-3">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-white"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                <Bell size={20} />
              </button>
              
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg z-10">
                  <div className="rounded-md bg-slate-800 shadow-xs">
                    <div className="p-3 border-b border-slate-700">
                      <h3 className="text-sm leading-5 font-medium text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <ul>
                        <li className="px-4 py-3 hover:bg-slate-700 border-b border-slate-700">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-2 w-2 rounded-full bg-red-500 mt-1"></div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                              <p className="text-sm leading-5 font-medium text-white">Motion detected: Camera 3</p>
                              <p className="text-xs text-gray-400">Just now</p>
                            </div>
                          </div>
                        </li>
                        <li className="px-4 py-3 hover:bg-slate-700 border-b border-slate-700">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-2 w-2 rounded-full bg-yellow-500 mt-1"></div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                              <p className="text-sm leading-5 font-medium text-white">Camera 2 offline</p>
                              <p className="text-xs text-gray-400">10 minutes ago</p>
                            </div>
                          </div>
                        </li>
                        <li className="px-4 py-3 hover:bg-slate-700">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-2 w-2 rounded-full bg-red-500 mt-1"></div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                              <p className="text-sm leading-5 font-medium text-white">Unauthorized access attempt</p>
                              <p className="text-xs text-gray-400">1 hour ago</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="p-2 border-t border-slate-700">
                      <a href="#" className="block text-center text-xs leading-5 font-medium text-indigo-400 hover:text-indigo-300">
                        View all notifications
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings */}
            <button
              type="button"
              className="p-1 ml-3 text-gray-400 hover:text-white"
            >
              <Settings size={20} />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex items-center text-sm rounded-full text-white focus:outline-none"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={18} className="text-gray-300" />
                  </div>
                  <span className="ml-2 hidden md:block text-sm font-medium">{userName}</span>
                </button>
              </div>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
                  <div className="py-1 rounded-md bg-slate-800 shadow-xs">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">
                      Your Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">
                      Settings
                    </Link>
                    {/* <Link href="/logout" className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">
                      Sign out
                    </Link> */}

                    <Link
                      onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/`
              })}
              href="/"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
            >
              Sign Out
            </Link>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search panel */}
      {searchOpen && (
        <div className="md:hidden px-2 py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              id="mobile-search"
              name="mobile-search"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-slate-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search for alerts, cameras..."
              type="search"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader; 