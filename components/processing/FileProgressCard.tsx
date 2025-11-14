import React from 'react';
import { Icon } from '../ui/Icon';
import type { ProcessingFile, StepStatus } from '../../types';

interface StepPillProps {
  label: string;
  status: StepStatus;
}

const StepPill: React.FC<StepPillProps> = ({ label, status }) => {
  const baseClasses = "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors";
  let statusClasses = "bg-slate-100 text-slate-500";
  let icon = null;

  if (status === 'in_progress') {
    statusClasses = "bg-primary-100 text-primary-700";
  } else if (status === 'completed') {
    statusClasses = "bg-green-100 text-green-700";
    icon = <Icon name="checkCircle" className="w-3.5 h-3.5" />;
  }

  return (
    <div className={`${baseClasses} ${statusClasses}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};


export const FileProgressCard: React.FC<{ file: ProcessingFile }> = ({ file }) => {
  const isCompleted = file.status === 'completed';
  const iconColor = isCompleted ? 'text-green-500' : 'text-primary-500';

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-green-100' : 'bg-primary-100'}`}>
            <Icon name={isCompleted ? 'checkCircle' : 'file'} className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">{file.fileName}</p>
            <div className="flex items-center gap-2 mt-2">
                <StepPill label="OCR" status={file.steps.ocr} />
                <StepPill label="Extracting Skills" status={file.steps.extractSkills} />
                <StepPill label="Building Knowledge Graph" status={file.steps.buildGraph} />
            </div>
          </div>
        </div>
        <div className="text-sm font-bold text-slate-600">
            {Math.round(file.progress)}%
        </div>
      </div>
       <div className="mt-4 bg-slate-200 rounded-full h-1.5 w-full overflow-hidden">
         <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${file.progress}%`}}
        ></div>
       </div>
    </div>
  );
};
