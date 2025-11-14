export type View = 'dashboard' | 'candidates' | 'jobs' | 'calendar' | 'reports' | 'settings';

export interface Skill {
  name: string;
  years?: number; // Made optional as it's not always present
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills?: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface KeyProject {
  name: string;
  tech: string[];
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  location: string;
  avatarUrl: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  summary: string;
  keyProjects: KeyProject[];
}


export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  candidates?: Candidate[];
  isLoading?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  status: 'Open' | 'Closed' | 'On Hold';
  candidateIds: string[];
}

// Types for the new processing view
export type StepStatus = 'pending' | 'in_progress' | 'completed';

export interface ProcessingFile {
  id: string;
  fileName: string;
  status: 'queued' | 'processing' | 'completed';
  progress: number;
  steps: {
    ocr: StepStatus;
    extractSkills: StepStatus;
    buildGraph: StepStatus;
  };
}