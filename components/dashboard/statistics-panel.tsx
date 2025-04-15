'use client';

import React from 'react';
import { 
  Shield, 
  AlertCircle, 
  Camera, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  FileText,
  Calendar
} from 'lucide-react';

// Mock statistics data
const mockStats = [
  {
    id: 1,
    name: 'Active Cameras',
    value: '5',
    change: '+1',
    changeType: 'increase',
    icon: Camera,
    color: 'indigo',
  },
  {
    id: 2,
    name: 'Alerts Today',
    value: '7',
    change: '+3',
    changeType: 'increase',
    icon: AlertCircle,
    color: 'red',
  },
  {
    id: 3,
    name: 'Secured Areas',
    value: '4',
    change: '0',
    changeType: 'neutral',
    icon: Shield,
    color: 'emerald',
  },
  {
    id: 4,
    name: 'Authorized Users',
    value: '8',
    change: '+1',
    changeType: 'increase',
    icon: UserCheck,
    color: 'blue',
  },
];

// Current monitoring status
const monitoringStatus = {
  status: 'active',
  since: '08:00 AM',
  nextCheck: '02:00 PM',
};

const StatisticCard = ({ stat }: { stat: typeof mockStats[0] }) => {
  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'indigo': return 'bg-indigo-500/20';
      case 'red': return 'bg-red-500/20';
      case 'emerald': return 'bg-emerald-500/20';
      case 'blue': return 'bg-blue-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'indigo': return 'text-indigo-400';
      case 'red': return 'text-red-400';
      case 'emerald': return 'text-emerald-400';
      case 'blue': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getChangeTypeColorClass = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-emerald-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-400">{stat.name}</p>
          <p className="text-2xl font-semibold mt-1 text-white">{stat.value}</p>
        </div>
        <div className={`h-10 w-10 rounded-lg ${getBgColorClass(stat.color)} flex items-center justify-center`}>
          <stat.icon size={20} className={getTextColorClass(stat.color)} />
        </div>
      </div>
      <div className="mt-2">
        <div className={`text-xs font-medium inline-flex items-center ${getChangeTypeColorClass(stat.changeType)}`}>
          {stat.changeType === 'increase' && <TrendingUp size={12} className="mr-1" />}
          {stat.changeType === 'decrease' && <TrendingUp size={12} className="mr-1 rotate-180" />}
          {stat.change} from yesterday
        </div>
      </div>
    </div>
  );
};

const StatisticsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Status card */}
      <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Clock size={20} className="mr-2 text-indigo-400" />
            Monitoring Status
          </h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            monitoringStatus.status === 'active' 
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/20 text-amber-400'
          }`}>
            {monitoringStatus.status === 'active' ? 'Active' : 'Maintenance'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Active since:</span>
              <span className="text-white text-sm font-medium">{monitoringStatus.since}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Next scheduled check:</span>
              <span className="text-white text-sm font-medium">{monitoringStatus.nextCheck}</span>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition duration-150 ease-in-out flex items-center">
              <FileText size={14} className="mr-1" />
              Report
            </button>
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-md transition duration-150 ease-in-out flex items-center">
              <Calendar size={14} className="mr-1" />
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Statistics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat) => (
          <StatisticCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsPanel; 