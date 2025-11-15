
import type { Candidate, JobOpening } from '../types';

export const CANDIDATE_DATA: Candidate[] = [
  {
    id: 'c-sarah-chen',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '555-0101',
    role: 'Senior Software Engineer',
    matchScore: 95,
    location: 'San Francisco, CA',
    avatarUrl: 'https://picsum.photos/seed/sarahchen/100',
    summary: '5+ years building fintech platforms at TechCorp. Led development of payment processing system using React and microservices.',
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Fintech APIs' },
      { name: 'Node.js' },
      { name: 'AWS' },
    ],
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        duration: '2021 - Present',
        description: [
          'Led development of microservices architecture for a payment processing system serving 1M+ users.',
          'Implemented CI/CD pipelines reducing deployment time by 60%.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'Stanford University',
        year: '2017',
      },
    ],
    keyProjects: [
      {
        name: 'Payment Processing Gateway',
        tech: ['React', 'Node.js', 'AWS'],
        description: 'High-throughput payment gateway for fintech applications.',
      },
    ],
  },
  {
    id: 'c-michael-torres',
    name: 'Michael Torres',
    email: 'michael.t@example.com',
    phone: '555-0112',
    role: 'Full Stack Developer',
    matchScore: 88,
    location: 'New York, NY',
    avatarUrl: 'https://picsum.photos/seed/michaeltorres/100',
    summary: '3 years at FinanceHub developing trading dashboards with React. Experience with payment gateway integrations.',
    skills: [
      { name: 'React' },
      { name: 'Python' },
      { name: 'Banking Systems' },
      { name: 'PostgreSQL' },
    ],
    experience: [
      {
        role: 'Full Stack Developer',
        company: 'FinanceHub',
        duration: '2020 - Present',
        description: [
          'Developed real-time trading dashboards and analytical tools using React and Python.',
          'Integrated with multiple third-party payment gateways and financial data APIs.',
        ],
      },
    ],
     education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Columbia University',
        year: '2020',
      },
    ],
    keyProjects: [],
  },
  {
    id: 'c-jessica-williams',
    name: 'Jessica Williams',
    email: 'jessica.w@example.com',
    phone: '555-0113',
    role: 'Frontend Engineer',
    matchScore: 82,
    location: 'Chicago, IL',
    avatarUrl: 'https://picsum.photos/seed/jessicawilliams/100',
    summary: 'Built real-time stock trading interface at InvestCo. Strong React skills with focus on data visualization.',
    skills: [
        { name: 'React' },
        { name: 'Redux' },
        { name: 'Financial Data Viz' },
        { name: 'D3.js' },
    ],
    experience: [
      {
        role: 'Frontend Engineer',
        company: 'InvestCo',
        duration: '2019 - Present',
        description: [
          'Built and maintained a high-performance, real-time stock trading user interface using React and Redux.',
          'Developed custom data visualization components with D3.js to display complex financial data.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.A. in Design & Technology',
        institution: 'University of Illinois',
        year: '2019',
      },
    ],
    keyProjects: [],
  },
  {
    id: 'c1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '555-0102',
    role: 'Senior Frontend Developer',
    matchScore: 92,
    location: 'San Francisco, CA',
    avatarUrl: 'https://picsum.photos/seed/alex/100',
    summary: '6+ years of frontend experience architecting micro-frontend platforms.',
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
    email: 'maria.g@example.com',
    phone: '555-0103',
    role: 'Full-Stack Engineer',
    matchScore: 85,
    location: 'New York, NY',
    avatarUrl: 'https://picsum.photos/seed/maria/100',
    summary: '7+ years of full-stack experience building RESTful APIs.',
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
    email: 'chen.w@example.com',
    phone: '555-0104',
    role: 'DevOps Specialist',
    matchScore: 78,
    location: 'Seattle, WA',
    avatarUrl: 'https://picsum.photos/seed/chen/100',
    summary: '7+ years of DevOps experience managing cloud infrastructure on AWS and GCP.',
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
    email: 'emily.c@example.com',
    phone: '555-0105',
    role: 'UX/UI Designer',
    matchScore: 95,
    location: 'Austin, TX',
    avatarUrl: 'https://picsum.photos/seed/emily/100',
    summary: '6+ years of design experience in user research and prototyping.',
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
    email: 'david.l@example.com',
    phone: '555-0106',
    role: 'Product Manager',
    matchScore: 89,
    location: 'Chicago, IL',
    avatarUrl: 'https://picsum.photos/seed/david/100',
    summary: '8+ years of product experience with Agile methodologies.',
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
    email: 'sarah.j@example.com',
    phone: '555-0107',
    role: 'Backend Developer',
    matchScore: 82,
    location: 'Boston, MA',
    avatarUrl: 'https://picsum.photos/seed/sarah/100',
    summary: '8+ years of backend experience with Java and Spring Boot.',
    skills: [
        { name: 'Java', years: 8 },
        { name: 'Spring Boot', years: 6 },
        { name: 'PostgreSQL', years: 7 },
        { name: 'Microservices', years: 4 },
    ],
    experience: [],
    education: [],
    keyProjects: [],
  },
  {
    id: 'c7',
    name: 'Laura Smith',
    email: 'laura.s@example.com',
    phone: '555-0108',
    role: 'Frontend Developer',
    matchScore: 88,
    location: 'Austin, TX',
    avatarUrl: 'https://picsum.photos/seed/laura/100',
    summary: '3+ years of frontend experience with React and Vue.js.',
    skills: [
        { name: 'React', years: 3 },
        { name: 'Vue.js', years: 2 },
        { name: 'TypeScript', years: 3 },
        { name: 'TailwindCSS', years: 2 },
    ],
    experience: [
        {
          role: 'Frontend Developer',
          company: 'Synergy Systems',
          duration: '2020 - Present',
          description: ['Developed and maintained client-facing web applications using React.', 'Improved component library performance.'],
        },
    ],
    education: [
        {
          degree: 'B.A. in Digital Media',
          institution: 'University of Texas',
          year: '2019',
        },
    ],
    keyProjects: [],
  },
  {
    id: 'c8',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '555-0109',
    role: 'Frontend Developer',
    matchScore: 85,
    location: 'Seattle, WA',
    avatarUrl: 'https://picsum.photos/seed/michael/100',
    summary: '4+ years of frontend experience with a focus on Vue.js.',
    skills: [
        { name: 'Vue.js', years: 4 },
        { name: 'JavaScript', years: 4 },
        { name: 'CSS', years: 4 },
        { name: 'Webpack', years: 3 },
    ],
    experience: [
        {
          role: 'Frontend Developer',
          company: 'NextGen AI',
          duration: '2019 - Present',
          description: ['Led the migration of a legacy jQuery app to Vue.js.', 'Built and maintained a reusable component library.'],
        },
    ],
    education: [
        {
          degree: 'B.S. in Web Design & Development',
          institution: 'University of Washington',
          year: '2018',
        },
    ],
    keyProjects: [],
  },
  {
    id: 'c9',
    name: 'Jessica Rodriguez',
    email: 'jessica.r@example.com',
    phone: '555-0110',
    role: 'Frontend Engineer',
    matchScore: 89,
    location: 'New York, NY',
    avatarUrl: 'https://picsum.photos/seed/jessica/100',
    summary: '5+ years of frontend experience building complex SPAs with Angular.',
    skills: [
        { name: 'Angular', years: 5 },
        { name: 'TypeScript', years: 5 },
        { name: 'RxJS', years: 4 },
        { name: 'Ngrx', years: 3 },
    ],
    experience: [
        {
          role: 'Frontend Engineer',
          company: 'QuantumLeap',
          duration: '2018 - Present',
          description: ['Developed complex single-page applications for financial clients using Angular.', 'Mentored junior developers on best practices.'],
        },
    ],
    education: [
        {
          degree: 'B.S. in Computer Engineering',
          institution: 'Columbia University',
          year: '2017',
        },
    ],
    keyProjects: [],
  },
  {
    id: 'c10',
    name: 'Brian Miller',
    email: 'brian.m@example.com',
    phone: '555-0111',
    role: 'Junior Frontend Developer',
    matchScore: 80,
    location: 'Chicago, IL',
    avatarUrl: 'https://picsum.photos/seed/brian/100',
    summary: '2+ years of frontend experience building responsive landing pages.',
    skills: [
        { name: 'HTML', years: 2 },
        { name: 'CSS', years: 2 },
        { name: 'JavaScript', years: 2 },
        { name: 'jQuery', years: 1 },
    ],
    experience: [
        {
          role: 'Junior Frontend Developer',
          company: 'Innovate Inc.',
          duration: '2021 - Present',
          description: ['Assisted in building responsive landing pages and email templates.', 'Fixed UI bugs across multiple web properties.'],
        },
    ],
    education: [
        {
          degree: 'Certificate in Web Development',
          institution: 'Code Academy',
          year: '2021',
        },
    ],
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
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
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
