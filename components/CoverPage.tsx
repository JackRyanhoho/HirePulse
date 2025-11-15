
import React from 'react';
import { Icon } from './ui/Icon';

interface CoverPageProps {
  onSignIn: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onSignIn }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-slate-50 text-center p-4">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
        <Icon name="logo" className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-slate-800" style={{ color: '#4a4a68' }}>HirePulse</h1>
      <p className="mt-4 text-lg text-slate-600 max-w-md">
        Find the perfect candidates for your team. Connect with top talent effortlessly.
      </p>
      <div className="mt-10 space-y-4 w-full max-w-xs">
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          Register
        </button>
        <button 
          onClick={onSignIn}
          className="w-full bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl border border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400 transform hover:-translate-y-1 transition-all duration-300"
        >
          Sign In
        </button>
      </div>
      <p className="mt-12 text-sm text-slate-400">
        Trusted by leading companies worldwide
      </p>
    </div>
  );
};
