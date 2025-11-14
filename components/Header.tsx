import React from 'react';
import { Icon } from './ui/Icon';
import type { View } from '../types';

interface HeaderProps {
    activeView: View;
}

const viewTitles: Record<View, string> = {
    dashboard: 'Dashboard',
    candidates: 'Candidates',
    jobs: 'Job Openings',
    calendar: 'Calendar',
    reports: 'Reports',
    settings: 'Settings',
};

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-20 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="flex items-center">
         <h1 className="text-xl md:text-2xl font-semibold text-slate-800">{viewTitles[activeView]}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition">
          <Icon name="notification" />
        </button>
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://picsum.photos/seed/recruiter/100"
            alt="Recruiter Avatar"
          />
          <div>
            <p className="text-sm font-semibold text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">Recruiter</p>
          </div>
        </div>
      </div>
    </header>
  );
};