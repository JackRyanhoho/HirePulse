import React from 'react';
import type { Candidate, Experience, KeyProject, Education, Skill } from '../../types';
import { Icon } from '../ui/Icon';

interface DetailCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
        <Icon name={icon} className="w-5 h-5 text-primary-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);


const CandidateSummary: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    const initials = candidate.name.split(' ').map(n => n[0]).join('');
    return (
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                {initials}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{candidate.name}</h2>
                <p className="text-slate-600">{candidate.role}</p>
                <p className="text-sm text-slate-500 mt-1">{candidate.location} &middot; {candidate.summary}</p>
            </div>
         </div>
    )
}

const ResumePreview: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
        <header className="text-center pb-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 uppercase">{candidate.name}</h2>
            <p className="text-slate-600">{candidate.role}</p>
            <p className="text-sm text-slate-500 mt-1">
                {candidate.email || 'No email found'}
                {candidate.phone ? ` | ${candidate.phone}` : ''}
            </p>
        </header>
        <div className="mt-6">
            <h4 className="font-bold text-primary-700 text-sm uppercase tracking-wider">Technical Skills</h4>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {candidate.skills.map(s => s.name).join(', ')}
            </p>
        </div>
         <div className="mt-6">
            <h4 className="font-bold text-primary-700 text-sm uppercase tracking-wider">Experience</h4>
            <div className="mt-2 space-y-4">
                {candidate.experience.map((exp, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline">
                             <h5 className="font-semibold text-slate-800">{exp.role}</h5>
                             <p className="text-xs text-slate-500 font-medium">{exp.duration}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                        <ul className="list-disc list-inside mt-1">
                          {exp.description.map((d, j) => <li key={j} className="text-sm text-slate-500">{d}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

interface CandidateDetailViewProps {
  candidate: Candidate;
  onClose: () => void;
  isProcessingFlow?: boolean;
  currentIndex?: number;
  totalProfiles?: number;
  onNavigate?: (newIndex: number) => void;
}

export const CandidateDetailView: React.FC<CandidateDetailViewProps> = ({ 
    candidate, 
    onClose,
    isProcessingFlow,
    currentIndex = 0,
    totalProfiles = 0,
    onNavigate = () => {},
}) => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <button onClick={onClose} className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              {isProcessingFlow && totalProfiles > 1 ? `Finish Review (${totalProfiles} new)` : 'AI Extraction Complete'}
            </button>
            <h1 className="text-xl font-semibold text-slate-700 mt-2">Candidate Profile Extraction</h1>
            <p className="text-sm text-slate-500">Structured data extracted from resume</p>
          </div>
          {isProcessingFlow && totalProfiles > 1 && (
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600">
                    Viewing {currentIndex + 1} of {totalProfiles}
                </span>
                <button 
                    onClick={() => onNavigate(currentIndex - 1)} 
                    disabled={currentIndex === 0}
                    className="p-2 rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon name="chevronLeft" className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => onNavigate(currentIndex + 1)}
                    disabled={currentIndex >= totalProfiles - 1}
                    className="p-2 rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon name="chevronRight" className="w-5 h-5" />
                </button>
            </div>
           )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <CandidateSummary candidate={candidate} />
            
            <DetailCard icon="code" title="Technical Skills">
                <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                        <span key={skill.name} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </DetailCard>

            <DetailCard icon="briefcase" title="Experience">
                <div className="relative pl-5">
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                     {candidate.experience.map((exp, index) => (
                        <div key={index} className="relative mb-6">
                            <div className="absolute -left-1.5 top-1 w-3 h-3 bg-white border-2 border-primary-500 rounded-full"></div>
                            <div className="ml-5">
                                <h4 className="font-semibold text-slate-800">{exp.role}</h4>
                                <p className="text-sm text-slate-500">{exp.company} &middot; {exp.duration}</p>
                            </div>
                        </div>
                     ))}
                </div>
            </DetailCard>

            <DetailCard icon="projects" title="Key Projects">
                <div className="space-y-4">
                    {candidate.keyProjects.map((proj, i) => (
                        <div key={i} className="bg-slate-50/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-800">{proj.name}</h4>
                            <p className="text-sm text-slate-500">{proj.tech.join(', ')}</p>
                        </div>
                    ))}
                    {candidate.keyProjects.length === 0 && (
                        <p className="text-sm text-slate-500">No key projects listed on the resume.</p>
                    )}
                </div>
            </DetailCard>
            
            <DetailCard icon="education" title="Education">
                <div className="space-y-4">
                    {candidate.education.map((edu, i) => (
                        <div key={i} className="bg-slate-50/70 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-800">{edu.degree}</h4>
                            <p className="text-sm text-slate-500">{edu.institution} &middot; {edu.year}</p>
                        </div>
                    ))}
                </div>
            </DetailCard>

          </div>

          <div className="lg:sticky top-8">
            <ResumePreview candidate={candidate} />
          </div>
        </main>
      </div>
    </div>
  );
};