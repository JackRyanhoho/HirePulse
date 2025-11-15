
import React from 'react';
import type { Candidate } from '../types';

interface MatchCardProps {
  candidate: Candidate;
  onSelectCandidate: (candidateId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ candidate, onSelectCandidate }) => {
  const initials = candidate.name.split(' ').map(n => n[0]).join('');

  return (
    <div 
      onClick={() => onSelectCandidate(candidate.id)}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-primary-400 hover:shadow-lg cursor-pointer transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-bold">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{candidate.name}</h3>
            <p className="text-sm text-slate-500">{candidate.role}</p>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-4 border-primary-500 bg-primary-50 text-primary-600 font-bold text-lg">
          {candidate.matchScore}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.slice(0, 5).map(skill => (
          <span key={skill.name} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {skill.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-sm text-slate-600 space-y-1">
        {candidate.summary.split('. ').map((sentence, index) => (
          sentence && <p key={index} className="flex items-start"><span className="mr-2 mt-1 text-primary-500">&rarr;</span>{sentence}</p>
        ))}
      </div>
    </div>
  );
};
