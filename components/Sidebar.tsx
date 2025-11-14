import React from 'react';
import { Icon } from './ui/Icon';
import type { View } from '../types';

interface SidebarLinkProps {
    icon: React.ReactNode;
    label: string;
    viewName: View;
    activeView: View;
    onNavigate: (view: View) => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, viewName, activeView, onNavigate }) => (
  <button
    onClick={() => onNavigate(viewName)}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      activeView === viewName
        ? 'bg-primary-600 text-white'
        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

interface SidebarProps {
    activeView: View;
    onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const navItems: { viewName: View; label: string; icon: string }[] = [
    { viewName: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { viewName: 'candidates', label: 'Candidates', icon: 'candidates' },
    { viewName: 'jobs', label: 'Job Openings', icon: 'jobs' },
    { viewName: 'calendar', label: 'Calendar', icon: 'calendar' },
    { viewName: 'reports', label: 'Reports', icon: 'reports' },
  ];
    
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
      <div className="flex items-center justify-center h-20 border-b border-slate-200">
        <Icon name="logo" className="h-8 w-auto text-primary-600" />
        <h1 className="text-2xl font-bold text-slate-800 ml-2">HirePulse</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
             <SidebarLink 
                key={item.viewName}
                icon={<Icon name={item.icon} />} 
                label={item.label}
                viewName={item.viewName}
                activeView={activeView}
                onNavigate={onNavigate}
            />
        ))}
      </nav>
      <div className="px-4 py-6 space-y-2">
        <SidebarLink 
            icon={<Icon name="settings" />}
            label="Settings"
            viewName="settings"
            activeView={activeView}
            onNavigate={onNavigate}
        />
         <button className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800">
          <Icon name="logout" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};