
import React from 'react';
import { Icon } from './ui/Icon';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-3xl font-semibold text-slate-800">{value}</p>
        <div className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <Icon name={isPositive ? 'arrowUp' : 'arrowDown'} className="h-4 w-4 mr-1"/>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};
