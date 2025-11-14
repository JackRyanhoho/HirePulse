
import type { Candidate, JobOpening } from '../types';

export const SARAH_CHEN_DETAIL: Candidate = {
  id: 'c-sarah-chen',
  name: 'Sarah Chen',
  role: 'Senior Software Engineer',
  matchScore: 95,
  location: 'San Francisco, CA',
  avatarUrl: 'https://picsum.photos/seed/sarahchen/100',
  summary: '5+ years experience',
  skills: [
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'Machine Learning' },
    { name: 'AWS' },
    { name: 'Docker' },
    { name: 'PostgreSQL' },
    { name: 'GraphQL' },
    { name: 'CI/CD' },
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      duration: '2021 - Present',
      description: [
        'Led development of microservices architecture serving 1M+ users.',
        'Implemented CI/CD pipelines reducing deployment time by 60%.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: ['Built real-time analytics dashboard using React and GraphQL.'],
    },
    {
      role: 'Junior Developer',
      company: 'DevStudio',
      duration: '2017 - 2019',
      description: [],
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2013 - 2017',
    },
  ],
  keyProjects: [
    {
      name: 'E-commerce Platform',
      tech: ['React', 'Node.js', 'MongoDB'],
      description: '',
    },
    {
      name: 'ML Recommendation Engine',
      tech: ['Python', 'TensorFlow', 'AWS'],
      description: '',
    },
    {
      name: 'Real-time Analytics Dashboard',
      tech: ['React', 'GraphQL', 'WebSocket'],
      description: '',
    },
  ],
};


export const CANDIDATE_DATA: Candidate[] = [
  {
    ...SARAH_CHEN_DETAIL,
    id: 'c1',
    name: 'Alex Johnson',
    role: 'Senior Frontend Developer',
    matchScore: 92,
    location: 'San Francisco, CA',
    avatarUrl: 'https://picsum.photos/seed/alex/100',
    summary: '6+ years of frontend experience',
    skills: [
      { name: 'React', years: 6 },
      { name: 'TypeScript', years: 5 },
      { name: 'Node.js', years: 3 },
      { name: 'GraphQL', years: 2 },
    ],
    experience: [
      {
        role: 'Lead Frontend Engineer',
        company: 'Innovate Inc.',
        duration: '2020 - Present',
        description: ['Led a team of 5 developers.', 'Architected a new micro-frontend platform.'],
      },
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Stanford University',
        year: '2016',
      },
    ],
    keyProjects: [],
  },
  {
    id: 'c2',
    name: 'Maria Garcia',
    role: 'Full-Stack Engineer',
    matchScore: 85,
    location: 'New York, NY',
    avatarUrl: 'https://picsum.photos/seed/maria/100',
    summary: '7+ years of full-stack experience',
    skills: [
      { name: 'Python', years: 7 },
      { name: 'Django', years: 5 },
      { name: 'React', years: 4 },
      { name: 'AWS', years: 3 },
    ],
     experience: [
      {
        role: 'Full-Stack Developer',
        company: 'DataSolutions',
        duration: '2018 - 2022',
        description: ['Developed and maintained a large-scale data processing pipeline.', 'Built RESTful APIs.'],
      },
    ],
    education: [
      {
        degree: 'M.S. in Software Engineering',
        institution: 'Carnegie Mellon University',
        year: '2018',
      },
    ],
    keyProjects: [],
  },
  {
    id: 'c3',
    name: 'Chen Wei',
    role: 'DevOps Specialist',
    matchScore: 78,
    location: 'Seattle, WA',
    avatarUrl: 'https://picsum.photos/seed/chen/100',
    summary: '7+ years of DevOps experience',
    skills: [
      { name: 'Kubernetes', years: 5 },
      { name: 'Docker', years: 6 },
      { name: 'Terraform', years: 4 },
      { name: 'CI/CD', years: 7 },
    ],
    experience: [
        {
          role: 'Senior DevOps Engineer',
          company: 'Cloud Corp',
          duration: '2019 - Present',
          description: ['Managed cloud infrastructure on AWS and GCP.', 'Implemented CI/CD pipelines.'],
        },
      ],
      education: [
        {
          degree: 'B.S. in Information Technology',
          institution: 'University of Washington',
          year: '2015',
        },
      ],
      keyProjects: [],
  },
   {
    id: 'c4',
    name: 'Emily Carter',
    role: 'UX/UI Designer',
    matchScore: 95,
    location: 'Austin, TX',
    avatarUrl: 'https://picsum.photos/seed/emily/100',
    summary: '6+ years of design experience',
    skills: [
      { name: 'Figma', years: 5 },
      { name: 'Sketch', years: 4 },
      { name: 'User Research', years: 6 },
      { name: 'Prototyping', years: 5 },
    ],
    experience: [],
    education: [],
    keyProjects: [],
  },
  {
    id: 'c5',
    name: 'David Lee',
    role: 'Product Manager',
    matchScore: 89,
    location: 'Chicago, IL',
    avatarUrl: 'https://picsum.photos/seed/david/100',
    summary: '8+ years of product experience',
    skills: [
      { name: 'Agile', years: 8 },
      { name: 'Roadmapping', years: 6 },
      { name: 'Jira', years: 7 },
      { name: 'Market Analysis', years: 5 },
    ],
    experience: [],
    education: [],
    keyProjects: [],
  },
  {
    id: 'c6',
    name: 'Sarah Jenkins',
    role: 'Backend Developer',
    matchScore: 82,
    location: 'Boston, MA',
    avatarUrl: 'https://picsum.photos/seed/sarah/100',
    summary: '8+ years of backend experience',
    skills: [
        { name: 'Java', years: 8 },
        { name: 'Spring Boot', years: 6 },
        { name: 'PostgreSQL', years: 7 },
        { name: 'Microservices', years: 4 },
    ],
    experience: [],
    education: [],
    keyProjects: [],
  }
];


export const JOB_OPENINGS_DATA: JobOpening[] = [
    {
        id: 'j1',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        status: 'Open',
        candidateIds: ['c1', 'c2'],
    },
    {
        id: 'j2',
        title: 'Product Manager, Growth',
        department: 'Product',
        location: 'New York, NY',
        status: 'Open',
        candidateIds: ['c5'],
    },
    {
        id: 'j3',
        title: 'Lead DevOps Engineer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        status: 'On Hold',
        candidateIds: ['c3'],
    },
    {
        id: 'j4',
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'Remote',
        status: 'Closed',
        candidateIds: ['c4'],
    },
];

const MOCK_ROLES = ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer'];
const MOCK_COMPANIES = ['Innovate Inc.', 'DataSolutions', 'Cloud Corp', 'NextGen AI', 'QuantumLeap', 'Synergy Systems'];
const MOCK_LOCATIONS = ['New York, NY', 'Seattle, WA', 'Austin, TX', 'Chicago, IL', 'Boston, MA', 'Remote'];
const MOCK_SKILLS: { [key: string]: string[] } = {
  'Software Engineer': ['Python', 'Go', 'Microservices', 'AWS', 'Docker'],
  'Product Manager': ['Agile', 'Roadmapping', 'Jira', 'User Research'],
  'UX Designer': ['Figma', 'Sketch', 'Prototyping', 'Wireframing'],
  'Data Scientist': ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Scikit-learn'],
  'DevOps Engineer': ['Kubernetes', 'Terraform', 'CI/CD', 'Ansible'],
  'Frontend Developer': ['React', 'Vue.js', 'TypeScript', 'TailwindCSS'],
  'Backend Developer': ['Node.js', 'Java', 'Spring Boot', 'PostgreSQL'],
};
const MOCK_DEGREES = ['B.S. in Computer Science', 'M.S. in Human-Computer Interaction', 'B.A. in Business', 'Ph.D. in Machine Learning'];
const MOCK_INSTITUTIONS = ['MIT', 'Georgia Tech', 'University of Illinois', 'UC Berkeley', 'University of Washington'];
const MOCK_PROJECTS = [
  { name: 'Scalable API Gateway', tech: ['Go', 'gRPC'], description: 'High-performance API gateway.' },
  { name: 'Design System V2', tech: ['Figma', 'React'], description: 'Reusable component library.' },
  { name: 'Predictive Analytics Model', tech: ['Python', 'Scikit-learn'], description: 'Customer churn prediction model.' },
  { name: 'CI/CD Pipeline Automation', tech: ['Jenkins', 'Terraform'], description: 'Automated build and deploy pipelines.' },
];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateMockCandidateDetail = (name: string): Candidate => {
  const role = getRandom(MOCK_ROLES);
  const skills = getRandomSubset(MOCK_SKILLS[role] || MOCK_SKILLS['Software Engineer'], 5).map(s => ({ name: s }));
  const location = getRandom(MOCK_LOCATIONS);

  return {
    id: `new-${name.replace(/\s+/g, '-')}-${Date.now()}`,
    name,
    role,
    matchScore: Math.floor(Math.random() * 21) + 75,
    location,
    avatarUrl: `https://picsum.photos/seed/${name}/100`,
    summary: `${Math.floor(Math.random() * 5) + 3}+ years of experience`,
    skills,
    experience: [
      {
        role: role,
        company: getRandom(MOCK_COMPANIES),
        duration: '2021 - Present',
        description: ['Contributed to core product features.', 'Collaborated with cross-functional teams.'],
      },
      {
        role: `Junior ${role.split(' ')[0]}`,
        company: getRandom(MOCK_COMPANIES),
        duration: '2019 - 2021',
        description: ['Assisted in the development of new features.'],
      },
    ],
    education: [
      {
        degree: getRandom(MOCK_DEGREES),
        institution: getRandom(MOCK_INSTITUTIONS),
        year: (new Date().getFullYear() - (Math.floor(Math.random() * 5) + 4)).toString(),
      },
    ],
    keyProjects: getRandomSubset(MOCK_PROJECTS, 2),
  };
};
