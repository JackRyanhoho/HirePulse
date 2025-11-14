import React from 'react';

interface OverallProgressProps {
  total: number;
  completedCount: number;
  processingCount: number;
  queuedCount: number;
}

const StatBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg text-center">
        <p className="text-2xl font-bold text-primary-700">{value}</p>
        <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
);

export const OverallProgress: React.FC<OverallProgressProps> = ({
  total,
  completedCount,
  processingCount,
  queuedCount
}) => {
  const overallProgress = total > 0 ? (completedCount / total) * 100 : 0;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Overall Progress</h3>
                <p className="text-sm text-slate-500">{completedCount} of {total} resumes processed</p>
            </div>
            <div className="text-lg font-bold text-primary-600">{Math.round(overallProgress)}% Complete</div>
        </div>
        <div className="bg-slate-200 rounded-full h-2.5 w-full overflow-hidden mb-6">
            <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${overallProgress}%`}}
            ></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <StatBox value={completedCount} label="Completed" />
            <StatBox value={processingCount} label="Processing" />
            <StatBox value={queuedCount} label="Queued" />
        </div>
    </div>
  );
};
