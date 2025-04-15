'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Video, 
  User, 
  X, 
  Filter, 
  Eye, 
  CheckCircle,
  ChevronRight,
  ChevronDown,
  PinOff
} from 'lucide-react';

// Mock alert data
const mockAlerts = [
  {
    id: 1,
    type: 'motion',
    level: 'high',
    camera: 'Front Entrance',
    message: 'Motion detected in restricted area',
    timestamp: '2 minutes ago',
    status: 'unread',
    details: 'Unidentified person detected at the front entrance during off-hours.',
    image: 'https://picsum.photos/seed/alert1/100/60'
  },
  {
    id: 2,
    type: 'offline',
    level: 'medium',
    camera: 'Lobby',
    message: 'Camera went offline',
    timestamp: '10 minutes ago',
    status: 'unread',
    details: 'The lobby camera has gone offline. Network connectivity issue suspected.',
    image: null
  },
  {
    id: 3,
    type: 'unauthorized',
    level: 'high',
    camera: 'Server Room',
    message: 'Unauthorized access attempt',
    timestamp: '34 minutes ago',
    status: 'read',
    details: 'Someone attempted to access the server room with an invalid access code.',
    image: 'https://picsum.photos/seed/alert3/100/60'
  },
  {
    id: 4,
    type: 'system',
    level: 'low',
    camera: 'System',
    message: 'System update required',
    timestamp: '1 hour ago',
    status: 'read',
    details: 'Security system update available. Schedule update during maintenance window.',
    image: null
  },
  {
    id: 5,
    type: 'motion',
    level: 'medium',
    camera: 'Parking Lot',
    message: 'Motion detected after hours',
    timestamp: '3 hours ago',
    status: 'read',
    details: 'Motion detected in the parking lot after business hours. Possible vehicle movement.',
    image: 'https://picsum.photos/seed/alert5/100/60'
  }
];

const AlertsPanel = () => {
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [expanded, setExpanded] = useState<boolean>(true);

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filter === 'unread') return alert.status === 'unread';
    if (filter === 'high') return alert.level === 'high';
    return true;
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAlertClick = (alertId: number) => {
    setSelectedAlertId(alertId === selectedAlertId ? null : alertId);
  };

  const markAsRead = (alertId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would update the alert in the database
    console.log(`Mark alert ${alertId} as read`);
  };

  const dismissAlert = (alertId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would remove the alert from the list
    console.log(`Dismiss alert ${alertId}`);
  };

  const getIconForAlertType = (type: string) => {
    switch (type) {
      case 'motion':
        return <Video size={16} />;
      case 'offline':
        return <PinOff size={16} />;
      case 'unauthorized':
        return <User size={16} />;
      case 'system':
        return <ShieldAlert size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Bell size={18} className="mr-2 text-indigo-400" />
          Recent Alerts
          {filteredAlerts.some(alert => alert.status === 'unread') && (
            <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {filteredAlerts.filter(alert => alert.status === 'unread').length}
            </span>
          )}
        </h2>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={toggleExpand}
          aria-label={expanded ? "Collapse panel" : "Expand panel"}
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="border-b border-slate-700 p-2 flex items-center justify-between bg-slate-700/30">
            <div className="flex items-center text-sm">
              <span className="text-gray-400 mr-2">
                <Filter size={14} />
              </span>
              <button 
                className={`mr-2 px-2 py-0.5 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`mr-2 px-2 py-0.5 rounded-md ${filter === 'unread' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
              <button 
                className={`px-2 py-0.5 rounded-md ${filter === 'high' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                onClick={() => setFilter('high')}
              >
                High Priority
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow">
            {filteredAlerts.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <Bell size={40} className="mx-auto mb-2 opacity-30" />
                <p>No alerts found</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-700">
                {filteredAlerts.map((alert) => (
                  <li key={alert.id} className="group">
                    <div 
                      className={`p-3 hover:bg-slate-700 cursor-pointer ${alert.status === 'unread' ? 'bg-slate-700/40' : ''}`}
                      onClick={() => handleAlertClick(alert.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 rounded-full p-1 ${getLevelStyles(alert.level)} mr-3`}>
                          {getIconForAlertType(alert.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white truncate">{alert.message}</div>
                          <div className="mt-1 flex justify-between">
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock size={12} className="mr-1" />
                              <span>{alert.timestamp}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {alert.camera}
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          {alert.status === 'unread' && (
                            <button 
                              className="text-gray-400 hover:text-white mr-1"
                              onClick={(e) => markAsRead(alert.id, e)}
                              aria-label="Mark as read"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button 
                            className="text-gray-400 hover:text-red-400"
                            onClick={(e) => dismissAlert(alert.id, e)}
                            aria-label="Dismiss"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {selectedAlertId === alert.id && (
                        <div className="mt-2 pt-2 border-t border-slate-700 text-gray-300 text-xs">
                          <p className="mb-2">{alert.details}</p>
                          {alert.image && (
                            <div className="mt-2">
                              <img src={alert.image} alt="Alert evidence" className="rounded-md" />
                              <div className="flex justify-end mt-1">
                                <button className="text-indigo-400 hover:text-indigo-300 flex items-center">
                                  <Eye size={12} className="mr-1" />
                                  View full image
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="flex mt-2 space-x-2">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded">
                              View Camera
                            </button>
                            <button className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded">
                              Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-2 border-t border-slate-700 bg-slate-700/30">
            <a href="/dashboard/alerts" className="text-indigo-400 hover:text-indigo-300 text-sm flex justify-center items-center">
              View all alerts
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AlertsPanel; 