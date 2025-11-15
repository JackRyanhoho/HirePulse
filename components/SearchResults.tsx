
import React from 'react';
import type { Candidate } from '../types';
import { MatchCard } from './MatchCard';

interface SearchResultsProps {
  candidates: Candidate[];
  onSelectCandidate: (candidateId: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ candidates, onSelectCandidate }) => {
  return (
    <div className="flex flex-col h-full max-h-[70vh]"> 
      <div className="flex-shrink-0 pb-4">
        <h2 className="text-xl font-semibold text-slate-800">Top Matches</h2>
        <p className="text-sm text-slate-500">{candidates.length} candidates found</p>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
        {candidates.map(candidate => (
          <MatchCard key={candidate.id} candidate={candidate} onSelectCandidate={onSelectCandidate} />
        ))}
        {candidates.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            <p>No matches found for your query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
