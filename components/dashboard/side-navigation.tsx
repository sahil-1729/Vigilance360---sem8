'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Video, 
  Bell, 
  BarChart2, 
  Calendar, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Logo from '../ui/logo';

interface SideNavigationProps {
  userName: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ userName }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Live Cameras', href: '/dashboard/cameras', icon: Video },
    { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className={`bg-slate-800 text-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out flex flex-col`}>
      {/* Logo and title */}
      <div className="h-16 flex items-center px-4 border-b border-slate-700">
        <Link href="/dashboard" className="flex items-center">
          
          <div className="flex-shrink-0 h-8 w-8 rounded-md flex items-center justify-center">
            {/* <Shield   className="h-5 w-5 text-white" /> */}
            <Logo />
          </div>

          {!collapsed && (
            <span className="ml-2 text-xl font-bold">Vigilance360</span>
          )}
        </Link>
        

        <button 
          className={`ml-auto text-gray-400 hover:text-white focus:outline-none ${collapsed ? 'rotate-180' : ''}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className={`${collapsed ? 'mx-auto' : 'mr-3'} h-5 w-5`} aria-hidden="true" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{userName}</p>

              <Link 
               onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/`
              })}
              href="/" className="text-xs text-gray-400 hover:text-white flex items-center mt-1">
                <LogOut className="h-3 w-3 mr-1" />
                Sign out
              </Link>

            </div>
          )}
        </div>
      </div>

      {/* Help section */}
      <div className="p-4 border-t border-slate-700">
        <Link href="/help" className={`flex items-center text-sm text-gray-400 hover:text-white ${collapsed ? 'justify-center' : ''}`}>
          <HelpCircle className={`${collapsed ? 'mx-auto' : 'mr-2'} h-5 w-5`} />
          {!collapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </aside>
  );
};

export default SideNavigation; 