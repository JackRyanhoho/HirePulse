
import React from 'react';
import type { JobOpening } from '../../types';
import { Icon } from '../ui/Icon';

interface JobOpeningsPageProps {
    jobOpenings: JobOpening[];
}

const statusColors: Record<JobOpening['status'], string> = {
    Open: 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    Closed: 'bg-red-100 text-red-800',
};

const JobCard: React.FC<{ job: JobOpening }> = ({ job }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-semibold text-slate-800">{job.title}</h3>
                <p className="text-sm text-slate-500">{job.department}</p>
            </div>
            <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[job.status]}`}>
                {job.status}
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-slate-600">
            <div className="flex items-center gap-1">
                <Icon name="location" className="w-4 h-4"/>
                <span>{job.location}</span>
            </div>
             <div className="flex items-center gap-1">
                <Icon name="candidates" className="w-4 h-4"/>
                <span>{job.candidateIds.length} candidates</span>
            </div>
        </div>
    </div>
);


export const JobOpeningsPage: React.FC<JobOpeningsPageProps> = ({ jobOpenings }) => {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Job Openings ({jobOpenings.length})</h2>
            <button className="flex items-center gap-2 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                <Icon name="add" className="w-5 h-5" />
                <span>Create New Job</span>
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    </div>
  );
};
