
import React from 'react';
import type { Candidate, Skill } from '../types';
import { Icon } from './ui/Icon';

interface CandidateCardProps {
  candidate: Candidate;
  onSelectCandidate: (candidateId: string) => void;
}

const SkillPill: React.FC<Skill> = ({ name, years }) => (
  <div className="text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
    {name} {years && `· ${years}y`}
  </div>
);

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onSelectCandidate }) => {
  return (
    <div 
      onClick={() => onSelectCandidate(candidate.id)}
      className="bg-white border border-slate-200 p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start space-x-3">
        <img src={candidate.avatarUrl} alt={candidate.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-800">{candidate.name}</h3>
            <div className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded-md">{candidate.matchScore}%</div>
          </div>
          <p className="text-xs text-slate-500">{candidate.role}</p>
          <div className="flex items-center text-xs text-slate-500 mt-1">
            <Icon name="location" className="w-3 h-3 mr-1" />
            <span>{candidate.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {candidate.skills.slice(0, 3).map(skill => (
          <SkillPill key={skill.name} name={skill.name} years={skill.years} />
        ))}
        {candidate.skills.length > 3 && (
            <div className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                +{candidate.skills.length - 3} more
            </div>
        )}
      </div>
    </div>
  );
};