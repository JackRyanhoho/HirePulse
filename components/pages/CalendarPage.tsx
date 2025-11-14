import React, { useState, useMemo } from 'react';
import { Icon } from '../ui/Icon';

interface CalendarEvent {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    color: string;
}

const MOCK_EVENTS: CalendarEvent[] = [
    // July 2024
    { id: 'e8', title: 'Interview: John Doe', date: '2024-07-15', color: 'bg-green-500' },
    { id: 'e23', title: 'Screening Call: Kevin L.', date: '2024-07-16', color: 'bg-green-500' },
    { id: 'e13', title: 'Follow-up: Maria G.', date: '2024-07-18', color: 'bg-blue-500' },
    { id: 'e24', title: 'Hiring Manager Sync', date: '2024-07-19', color: 'bg-yellow-500' },
    { id: 'e9', title: 'Team Sync', date: '2024-07-22', color: 'bg-yellow-500' },
    { id: 'e25', title: 'Follow-up: Kevin L.', date: '2024-07-24', color: 'bg-blue-500' },
    { id: 'e10', title: 'Follow-up: John Doe', date: '2024-07-25', color: 'bg-blue-500' },
    { id: 'e19', title: 'Final Interview: John Doe', date: '2024-07-29', color: 'bg-purple-500' },

    // August 2024
    { id: 'e1', title: 'Interview: Alex J.', date: '2024-08-05', color: 'bg-green-500' },
    { id: 'e26', title: 'Interview: Emily R.', date: '2024-08-06', color: 'bg-green-500' },
    { id: 'e38', title: 'Screening Call: Nancy W.', date: '2024-08-07', color: 'bg-green-500' },
    { id: 'e14', title: 'Team Meeting: Q3 Planning', date: '2024-08-08', color: 'bg-yellow-500' },
    { id: 'e2', title: 'Interview: Maria G.', date: '2024-08-12', color: 'bg-green-500' },
    { id: 'e3', title: 'Follow-up: Chen W.', date: '2024-08-14', color: 'bg-blue-500' },
    { id: 'e4', title: 'Final Interview: Alex J.', date: '2024-08-19', color: 'bg-purple-500' },
    { id: 'e27', title: 'Debrief: Alex J.', date: '2024-08-20', color: 'bg-blue-500' },
    { id: 'e20', title: 'Hiring Manager Sync', date: '2024-08-21', color: 'bg-yellow-500' },
    { id: 'e37', title: 'Onboarding: Alex J.', date: '2024-08-22', color: 'bg-purple-500' },
    { id: 'e5', title: 'Team Sync', date: '2024-08-26', color: 'bg-yellow-500' },
    { id: 'e28', title: 'Interview: Brian T.', date: '2024-08-28', color: 'bg-green-500' },


    // September 2024
    { id: 'e31', title: 'Hiring Sprint Kick-off', date: '2024-09-03', color: 'bg-yellow-500' },
    { id: 'e40', title: 'Final Interview: Brian T.', date: '2024-09-04', color: 'bg-purple-500' },
    { id: 'e6', title: 'Interview: Sarah Jenkins', date: '2024-09-05', color: 'bg-green-500' },
    { id: 'e15', title: 'Interview: Michael B.', date: '2024-09-09', color: 'bg-green-500' },
    { id: 'e39', title: 'Project Kickoff', date: '2024-09-10', color: 'bg-yellow-500' },
    { id: 'e29', title: 'Follow-up: Michael B.', date: '2024-09-11', color: 'bg-blue-500' },
    { id: 'e7', title: 'Planning Session', date: '2024-09-12', color: 'bg-yellow-500' },
    { id: 'e11', title: 'Interview: David Lee', date: '2024-09-16', color: 'bg-green-500' },
    { id: 'e32', title: 'Final Interview: Michael B.', date: '2024-09-18', color: 'bg-purple-500'},
    { id: 'e21', title: 'Interview: Chris P.', date: '2024-09-19', color: 'bg-green-500' },
    { id: 'e12', title: 'Final Interview: Sarah Jenkins', date: '2024-09-23', color: 'bg-purple-500' },
    { id: 'e30', title: 'Offer Prep: Sarah J.', date: '2024-09-25', color: 'bg-purple-500' },
    
    // October 2024
    { id: 'e16', title: 'Follow-up: David Lee', date: '2024-10-02', color: 'bg-blue-500' },
    { id: 'e33', title: 'Team Meeting', date: '2024-10-04', color: 'bg-yellow-500' },
    { id: 'e17', title: 'Interview: Olivia C.', date: '2024-10-07', color: 'bg-green-500' },
    { id: 'e22', title: 'Follow-up: Olivia C.', date: '2024-10-10', color: 'bg-blue-500' },
    { id: 'e18', title: 'Team Sync', date: '2024-10-14', color: 'bg-yellow-500' },
    { id: 'e34', title: 'Interview: Jessica W.', date: '2024-10-16', color: 'bg-green-500' },
    { id: 'e35', title: 'Final Interview: Olivia C.', date: '2024-10-22', color: 'bg-purple-500' },
    { id: 'e36', title: 'Follow-up: Jessica W.', date: '2024-10-24', color: 'bg-blue-500' },
];


const CalendarDay: React.FC<{ day?: number; isToday?: boolean; events: CalendarEvent[] }> = ({ day, isToday, events }) => {
    return (
        <div className={`border-t border-r border-slate-200 pt-2 px-2 overflow-hidden flex flex-col ${!day ? 'bg-slate-50' : ''}`}>
            {day && (
                <div className={`text-sm self-start mb-1 ${isToday ? 'bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold' : 'text-slate-600'}`}>
                    {day}
                </div>
            )}
            <div className="space-y-1 overflow-y-auto">
              {events.map(event => (
                  <div key={event.id} className={`text-xs text-white ${event.color} rounded px-1.5 py-0.5 truncate`}>
                      {event.title}
                  </div>
              ))}
            </div>
        </div>
    );
};

export const CalendarPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleGoogleConnect = () => {
        // Simulate OAuth flow
        setIsAuthenticated(true);
    };

    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const calendarData = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const leadingEmptyDays = Array.from({ length: startingDayOfWeek });
        
        const totalGridCells = 42; // 6 weeks
        const trailingEmptyDaysCount = totalGridCells - days.length - leadingEmptyDays.length;
        const trailingEmptyDays = Array.from({ length: trailingEmptyDaysCount > 0 ? trailingEmptyDaysCount : 0 });
        
        return { days, leadingEmptyDays, trailingEmptyDays };
    }, [year, month]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDate(new Date(year, parseInt(e.target.value), 1));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDate(new Date(parseInt(e.target.value), month, 1));
    };

    const upcomingInterviews = useMemo(() => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        return MOCK_EVENTS
            .filter(event => {
                const eventDate = new Date(event.date);
                // Adjust for timezone offset by creating date in UTC
                const eventUTCDate = new Date(Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()));
                return event.title.toLowerCase().includes('interview') && eventUTCDate >= todayDate;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(event => {
                const date = new Date(event.date);
                const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return {
                    title: event.title,
                    time: `${formattedDate}, 10:00 AM` // Demo time
                };
            });
    }, []);
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({length: 11}, (_, i) => today.getFullYear() - 5 + i);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-full bg-white p-6 rounded-lg shadow-sm text-center">
                <div>
                    <Icon name="calendar" className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-slate-800">Connect your Calendar</h2>
                    <p className="text-slate-500 mt-2 max-w-sm">
                        Integrate your Google Calendar to automatically sync interviews and manage your schedule directly from HirePulse.
                    </p>
                    <button
                        onClick={handleGoogleConnect}
                        className="mt-6 inline-flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        <Icon name="google" className="w-5 h-5" />
                        <span>Connect Google Calendar</span>
                    </button>
                </div>
            </div>
        )
    }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1.5 rounded-md hover:bg-slate-100"><Icon name="chevronLeft" className="w-5 h-5" /></button>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1.5 rounded-md hover:bg-slate-100"><Icon name="chevronRight" className="w-5 h-5" /></button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select value={month} onChange={handleMonthChange} className="appearance-none bg-transparent font-semibold text-slate-800 text-lg py-1 pl-2 pr-8 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                        </select>
                        <Icon name="arrowDown" className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                     <div className="relative">
                        <select value={year} onChange={handleYearChange} className="appearance-none bg-transparent font-semibold text-slate-800 text-lg py-1 pl-2 pr-8 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <Icon name="arrowDown" className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
                 <button onClick={() => setCurrentDate(new Date())} className="border border-slate-300 px-4 py-1.5 text-sm font-semibold rounded-md hover:bg-slate-50">Today</button>
            </div>
            <div className="grid grid-cols-7 text-center text-sm font-semibold text-slate-500 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 flex-1 border-l border-b border-slate-200">
                {calendarData.leadingEmptyDays.map((_, i) => <CalendarDay key={`empty-lead-${i}`} events={[]}/>)}
                {calendarData.days.map(day => {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayEvents = MOCK_EVENTS.filter(e => e.date === dateStr);
                    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
                    return <CalendarDay key={day} day={day} isToday={isToday} events={dayEvents} />
                })}
                {calendarData.trailingEmptyDays.map((_, i) => <CalendarDay key={`empty-trail-${i}`} events={[]}/>)}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
                <h3 className="text-md font-semibold text-slate-700 mb-3">Legend</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-slate-600">Interview</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        <span className="text-sm text-slate-600">Follow-up</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                        <span className="text-sm text-slate-600">Final Interview</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="text-sm text-slate-600">Team Meeting</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="lg:w-72 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
                {upcomingInterviews.length > 0 ? upcomingInterviews.map((interview, index) => (
                    <div key={index}>
                        <p className="font-semibold text-sm text-slate-700">{interview.title}</p>
                        <p className="text-xs font-medium text-primary-600 mt-1">{interview.time}</p>
                    </div>
                )) : <p className="text-sm text-slate-500">No upcoming interviews.</p>}
            </div>
        </div>
    </div>
  );
};