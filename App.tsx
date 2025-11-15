
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { FileUpload } from './components/FileUpload';
import { ChatInterface } from './components/ChatInterface';
import type { Candidate, ChatMessage, View, JobOpening } from './types';
import agoraService from './services/agoraService';
import { CANDIDATE_DATA, JOB_OPENINGS_DATA } from './services/mockData';
import { CandidatesPage } from './components/pages/CandidatesPage';
import { JobOpeningsPage } from './components/pages/JobOpeningsPage';
import { CalendarPage } from './components/pages/CalendarPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProcessingView } from './components/views/ProcessingView';
import { CandidateDetailView } from './components/views/CandidateDetailView';
import { SearchResults } from './components/SearchResults';
import { CoverPage } from './components/CoverPage';

type AppState = 'main' | 'processing' | 'detail';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appState, setAppState] = useState<AppState>('main');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATE_DATA);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(JOB_OPENINGS_DATA);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hi! This is Agora AI. I can help you find candidates. Try asking things like 'Find candidates with React + fintech experience'.",
    },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processedCandidates, setProcessedCandidates] = useState<Candidate[]>([]);
  const [processedIndex, setProcessedIndex] = useState(0);
  
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const candidatesRef = useRef(candidates);
  useEffect(() => {
    candidatesRef.current = candidates;
  }, [candidates]);

  useEffect(() => {
    const handleMessageReceived = (botResponse: { text: string; candidates?: string[] }) => {
        let foundCandidates: Candidate[] = [];
        if (botResponse.candidates) {
            foundCandidates = candidatesRef.current.filter(c => botResponse.candidates?.includes(c.id));
        }

        setChatMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.isLoading) {
                lastMessage.text = botResponse.text;
                lastMessage.isLoading = false;
                lastMessage.candidates = foundCandidates;
            } else {
                newMessages.push({
                    sender: 'ai',
                    text: botResponse.text,
                    candidates: foundCandidates,
                    isLoading: false
                });
            }
            return newMessages;
        });
    };
    
    agoraService.init(handleMessageReceived);

    return () => {
        if (agoraService.conn && agoraService.conn.isOpened()) {
            agoraService.conn.close();
        }
    };
  }, []);
  
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // Optional: Reset state on logout
    setActiveView('dashboard');
    setIsSearching(false);
    setSearchResults([]);
  };


  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const processResumes = () => {
    if (uploadedFiles.length === 0) return;
    setAppState('processing');
  };
  
  const handleProcessingComplete = (newlyProcessedCandidates: Candidate[]) => {
    if (newlyProcessedCandidates.length === 0) {
        console.warn("Processing completed, but no valid candidate data was returned.");
        setUploadedFiles([]);
        setAppState('main');
        return;
    }

    const finalizedCandidates = newlyProcessedCandidates.map((candidate, index) => ({
        ...candidate,
        id: `new-${candidate.name.replace(/\s+/g, '-')}-${Date.now()}`,
        avatarUrl: `https://picsum.photos/seed/${candidate.name.split(' ').join('')}${index}/100`,
        matchScore: Math.floor(Math.random() * 21) + 75,
    }));

    setCandidates(prev => [...prev, ...finalizedCandidates]);
    setUploadedFiles([]);
    
    setProcessedCandidates(finalizedCandidates);
    setProcessedIndex(0);
    setSelectedCandidate(finalizedCandidates[0]);
    setAppState('detail');
  };

  const handleSelectCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setProcessedCandidates([]);
      setSelectedCandidate(candidate);
      setAppState('detail');
    }
  };

  const handleCloseDetailView = () => {
    setSelectedCandidate(null);
    setProcessedCandidates([]);
    setProcessedIndex(0);
    setAppState('main');
    setActiveView('dashboard');
  };

  const handleProfileNavigation = (newIndex: number) => {
      if (processedCandidates.length > 0 && newIndex >= 0 && newIndex < processedCandidates.length) {
          setProcessedIndex(newIndex);
          setSelectedCandidate(processedCandidates[newIndex]);
      }
  };

const handleSendMessage = useCallback((message: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
    setChatMessages(prev => [...prev, { sender: 'ai', text: '', isLoading: true }]);
    setIsSearching(true);

    // Simulate async search
    setTimeout(() => {
        const lowerCaseMessage = message.toLowerCase().trim();
        
        // 1. Keyword Parsing
        const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'with', 'for', 'of', 'find', 'show', 'me', 'who', 'is', 'are', 'have', 'has', 'and', 'or', 'developer', 'engineer', 'specialist', 'experience']);
        const keywords = lowerCaseMessage.split(/[\s+,]/).filter(word => word.length > 1 && !stopWords.has(word.replace(/[.,!?]/g, '')));

        if (keywords.length === 0) {
            setSearchResults([]);
            const botResponse = { text: "Please provide some keywords to search for, like 'React developer' or 'Python and AWS'." };
            setChatMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.isLoading) {
                    lastMessage.text = botResponse.text;
                    lastMessage.isLoading = false;
                }
                return newMessages;
            });
            return;
        }

        // 2. Scoring Algorithm
        const scoredCandidates = candidates.map(candidate => {
            let score = 0;
            const lowerCaseCandidate = {
                role: candidate.role.toLowerCase(),
                summary: candidate.summary.toLowerCase(),
                skills: candidate.skills.map(s => s.name.toLowerCase()),
                experience: candidate.experience.map(e => ({
                    role: e.role.toLowerCase(),
                    description: e.description.join(' ').toLowerCase()
                })),
                keyProjects: candidate.keyProjects.map(p => ({
                    name: p.name.toLowerCase(),
                    tech: p.tech.join(' ').toLowerCase(),
                    description: p.description.toLowerCase()
                }))
            };

            keywords.forEach(keyword => {
                if (lowerCaseCandidate.skills.some(skill => skill.includes(keyword))) {
                    score += 10;
                }
                if (lowerCaseCandidate.role.includes(keyword)) {
                    score += 8;
                }
                 lowerCaseCandidate.experience.forEach(exp => {
                    if (exp.role.includes(keyword)) {
                        score += 5;
                    }
                    if (exp.description.includes(keyword)) {
                        score += 2;
                    }
                });
                if (lowerCaseCandidate.summary.includes(keyword)) {
                    score += 4;
                }
                lowerCaseCandidate.keyProjects.forEach(proj => {
                    if(proj.name.includes(keyword) || proj.tech.includes(keyword) || proj.description.includes(keyword)) {
                        score += 1;
                    }
                });
            });

            return { ...candidate, newMatchScore: score };
        });

        // 3. Filtering and Ranking
        const filteredAndRanked = scoredCandidates
            .filter(c => c.newMatchScore > 0)
            .sort((a, b) => b.newMatchScore - a.newMatchScore);

        const maxScore = Math.max(...filteredAndRanked.map(c => c.newMatchScore), 1);
        const finalResults = filteredAndRanked.map(c => ({
            ...c,
            matchScore: Math.min(99, Math.round((c.newMatchScore / maxScore) * 90) + 10)
        }));

        setSearchResults(finalResults);
        
        const botResponseText = finalResults.length > 0 
            ? `Searching...\n\nI found ${finalResults.length} candidate(s) that match your query. Here are the top results.`
            : `I couldn't find any candidates matching your query for "${keywords.join(' ')}". Try broadening your search.`;

        setChatMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.isLoading) {
                lastMessage.text = botResponseText;
                lastMessage.isLoading = false;
                lastMessage.candidates = [];
            }
            return newMessages;
        });

    }, 1500);

}, [candidates]);


  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <StatsCard title="Total Candidates" value={candidates.length.toString()} change="+5 this week" />
              <StatsCard title="Active Roles" value={jobOpenings.filter(j => j.status === 'Open').length.toString()} change="+2" />
              <StatsCard title="Shortlisted" value="48" change="-3" />
              <StatsCard title="Interviews" value="23" change="+8" />
            </div>
            {isSearching ? (
                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-800 mb-1">Conversational Search</h2>
                        <p className="text-sm text-slate-500 mb-4">Ask questions in natural language to find the perfect candidates</p>
                        <ChatInterface messages={chatMessages} onSendMessage={handleSendMessage} onSelectCandidate={handleSelectCandidate} />
                    </div>
                    <div className="lg:col-span-2">
                        <SearchResults candidates={searchResults} onSelectCandidate={handleSelectCandidate} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Candidate Sourcing</h2>
                        <ChatInterface messages={chatMessages} onSendMessage={handleSendMessage} onSelectCandidate={handleSelectCandidate} />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Resume Ingestion</h2>
                        <FileUpload onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
                        <button
                            onClick={processResumes}
                            disabled={uploadedFiles.length === 0}
                            className="w-full mt-4 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {`Process ${uploadedFiles.length} Resumes`}
                        </button>
                        </div>
                    </div>
                </div>
            )}
          </>
        );
      case 'candidates':
        return <CandidatesPage candidates={candidates} jobOpenings={jobOpenings} onSelectCandidate={handleSelectCandidate} />;
      case 'jobs':
        return <JobOpeningsPage jobOpenings={jobOpenings} />;
      case 'calendar':
        return <CalendarPage />;
      case 'reports':
        return <ReportsPage jobOpenings={jobOpenings} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  }
  
  if (!isAuthenticated) {
    return <CoverPage onSignIn={handleSignIn} />;
  }

  if (appState === 'processing') {
    return <ProcessingView files={uploadedFiles} onComplete={handleProcessingComplete} />;
  }
  
  if (appState === 'detail' && selectedCandidate) {
    const isProcessingFlow = processedCandidates.length > 0;
    return (
        <CandidateDetailView 
            candidate={selectedCandidate} 
            onClose={handleCloseDetailView}
            isProcessingFlow={isProcessingFlow}
            currentIndex={processedIndex}
            totalProfiles={processedCandidates.length}
            onNavigate={handleProfileNavigation}
        />
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar activeView={activeView} onNavigate={setActiveView} onLogout={handleSignOut} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
