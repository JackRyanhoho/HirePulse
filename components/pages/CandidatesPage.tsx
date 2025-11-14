
import React, { useState, useMemo } from 'react';
import type { Candidate, JobOpening } from '../../types';
import { Icon } from '../ui/Icon';

interface CandidatesPageProps {
  candidates: Candidate[];
  jobOpenings: JobOpening[];
  onSelectCandidate: (candidateId: string) => void;
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ candidates, jobOpenings, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate | 'matchScore'; direction: 'ascending' | 'descending' } | null>({ key: 'matchScore', direction: 'descending' });

  const filteredCandidates = useMemo(() => {
    let jobFilteredCandidates: Candidate[];

    if (selectedJobId === 'all') {
      jobFilteredCandidates = candidates;
    } else {
      const selectedJob = jobOpenings.find(job => job.id === selectedJobId);
      const candidateIdsForJob = new Set(selectedJob?.candidateIds || []);
      jobFilteredCandidates = candidates.filter(candidate => candidateIdsForJob.has(candidate.id));
    }

    return jobFilteredCandidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [candidates, searchTerm, selectedJobId, jobOpenings]);

  const sortedCandidates = useMemo(() => {
    let sortableItems = [...filteredCandidates];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key as keyof Candidate;
        if (a[key] < b[key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCandidates, sortConfig]);

  const requestSort = (key: keyof Candidate | 'matchScore') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: keyof Candidate | 'matchScore') => {
    if (!sortConfig || sortConfig.key !== key) {
        return <Icon name="sort" className="w-4 h-4 text-slate-400" />
    }
    if (sortConfig.direction === 'ascending') {
        return <Icon name="sortUp" className="w-4 h-4" />
    }
    return <Icon name="sortDown" className="w-4 h-4" />
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Candidates ({filteredCandidates.length})</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full sm:w-48 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 py-2 px-3"
            >
                <option value="all">All Job Openings</option>
                {jobOpenings.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                ))}
            </select>
            <div className="relative w-full sm:w-auto">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                <button onClick={() => requestSort('name')} className="flex items-center gap-2">
                    Name {getSortIcon('name')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                 <button onClick={() => requestSort('role')} className="flex items-center gap-2">
                    Role {getSortIcon('role')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Top Skills
              </th>
               <th scope="col" className="px-6 py-3">
                 <button onClick={() => requestSort('matchScore')} className="flex items-center gap-2">
                    Match {getSortIcon('matchScore')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate) => (
              <tr key={candidate.id} onClick={() => onSelectCandidate(candidate.id)} className="bg-white border-b hover:bg-slate-50 cursor-pointer">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full" src={candidate.avatarUrl} alt={candidate.name} />
                    <div>
                        <div className="font-semibold">{candidate.name}</div>
                        <div className="font-normal text-slate-500">{candidate.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{candidate.role}</td>
                <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map(skill => (
                             <span key={skill.name} className="text-xs font-medium bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded-md`}>
                    {candidate.matchScore}%
                  </span>
                </td>
              </tr>
            ))}
            {sortedCandidates.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-500">
                        No candidates found for the selected criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};