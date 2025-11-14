import React from 'react';
import { Icon } from '../ui/Icon';
import type { JobOpening } from '../../types';

interface ReportsPageProps {
    jobOpenings: JobOpening[];
}

const MetricCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="flex items-baseline justify-between mt-2">
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change}
            </div>
        </div>
    </div>
);

const HiringFunnelChart: React.FC = () => {
    const stages = [
        { name: 'Sourced', count: 1240, color: 'bg-blue-500', width: '100%' },
        { name: 'Screened', count: 480, color: 'bg-sky-500', width: '75%' },
        { name: 'Interview', count: 150, color: 'bg-cyan-500', width: '50%' },
        { name: 'Offer', count: 32, color: 'bg-teal-500', width: '25%' },
        { name: 'Hired', count: 18, color: 'bg-emerald-500', width: '15%' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Hiring Funnel</h3>
            <div className="space-y-3">
                {stages.map(stage => (
                    <div key={stage.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-600">{stage.name}</span>
                            <span className="font-semibold text-slate-800">{stage.count}</span>
                        </div>
                        <div className="bg-slate-200 rounded-full h-2.5">
                            <div className={`${stage.color} h-2.5 rounded-full`} style={{ width: stage.width }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ReportsPage: React.FC<ReportsPageProps> = ({ jobOpenings }) => {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Avg. Time to Hire" value="32 days" change="-2 days" isPositive={true} />
            <MetricCard title="Offer Acceptance Rate" value="85%" change="+5%" isPositive={true} />
            <MetricCard title="Cost Per Hire" value="$4,520" change="+$150" isPositive={false} />
            <MetricCard title="Top Source" value="LinkedIn" change="Organic" isPositive={true} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <HiringFunnelChart />
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Job Openings</h3>
                 <table className="w-full text-sm text-left">
                     <thead className="text-xs text-slate-500">
                         <tr>
                             <th className="pb-2">Role</th>
                             <th className="pb-2 text-center">Candidates</th>
                             <th className="pb-2 text-right">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-200">
                         {jobOpenings.filter(j => j.status === 'Open').slice(0, 5).map(job => (
                             <tr key={job.id}>
                                 <td className="py-2 font-medium text-slate-700">{job.title}</td>
                                 <td className="py-2 text-center text-slate-600">{job.candidateIds.length}</td>
                                 <td className="py-2 text-right">
                                     <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{job.status}</span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
            </div>
        </div>
    </div>
  );
};