import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

const icons: { [key: string]: React.ReactNode } = {
  logo: (
    <g>
      <mask id="hirepulse-logo-mask">
        {/* White shape that will be visible */}
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="white" />
        {/* Black stroke that will be cut out */}
        <path d="M8 13.5h2l2-4 4 8 2-4h2" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </mask>
      {/* Apply the mask to a solid rectangle filled with the current color */}
      <rect width="24" height="24" fill="currentColor" mask="url(#hirepulse-logo-mask)" />
    </g>
  ),
  dashboard: (
    <path
      d="M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0zm4.5 4.5L12 12l-4.5-4.5m9 9L12 12l4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  candidates: (
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8a4 4 0 0 0 0 8zm8 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm-4-7a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  jobs: (
    <path
      d="M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM8 4h8v3H8V4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  calendar: (
    <path
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  reports: (
    <path
      d="M10 20h4M3 16h18M3 12h18M3 8h18M3 4h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  settings: (
    <path
      d="M12 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm0 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm0-9a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"
      transform="rotate(90 12 12)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  logout: (
    <path
      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-4-7h10m0 0-3-3m3 3-3 3M11 3H7a2 2 0 0 0-2 2v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  search: (
    <path
      d="M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  notification: (
    <path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrowUp: <path d="M12 5l-6 6h12l-6-6z" fill="currentColor" />,
  arrowDown: <path d="M12 19l6-6H6l6 6z" fill="currentColor" />,
  upload: (
    <path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  send: <path d="M22 2L11 13L2 9L22 2zM13 22L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  location: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  add: <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  sort: <path d="M3 7h18M6 12h12M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  sortUp: <path d="M3 7h18M6 12h12M9 17h6M12 4l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  sortDown: <path d="M3 7h18M6 12h12M9 17h6M12 20l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  profile: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  integrations: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" fill="currentColor" />,
  apiKey: <path d="M20.62 13.18l-3.24-3.24c-.78-.78-2.05-.78-2.83 0l-1.9 1.9-3.54-3.54 1.9-1.9c.78-.78.78-2.05 0-2.83l-3.24-3.24c-.78-.78-2.05-.78-2.83 0L3.38 7.38c-.78.78-.78 2.05 0 2.83l3.24 3.24c.78.78 2.05.78 2.83 0l1.9-1.9 3.54 3.54-1.9 1.9c-.78.78-.78 2.05 0 2.83l3.24 3.24c.78.78 2.05.78 2.83 0l1.59-1.59c.78-.78.78-2.05 0-2.83zM6.83 9.38l-1.59-1.59 4.24-4.24 1.59 1.59-4.24 4.24zm8.48 8.48l-1.59-1.59 4.24-4.24 1.59 1.59-4.24 4.24z" fill="currentColor" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  chevronRight: <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  google: <path d="M21.35 12.03c0-.79-.07-1.55-.2-2.29H12v4.3h5.24c-.22 1.41-.86 2.6-1.94 3.4v2.79h3.57c2.08-1.92 3.28-4.79 3.28-8.2z" fill="#4285F4" />,
  checkCircle: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  file: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z M16 18H8 M16 14H8 M10 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  processing: (
    <g>
      <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-bounce" />
      <circle cx="16" cy="12" r="1" fill="currentColor" className="animate-bounce" style={{animationDelay: '0.2s'}} />
      <circle cx="8" cy="12" r="1" fill="currentColor" className="animate-bounce" style={{animationDelay: '0.4s'}}/>
    </g>
  ),
  briefcase: <path d="M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  projects: <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M16 3H8a2 2 0 0 0-2 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  education: <path d="M22 10v6M2 10l10-7 10 7-10 7-10-7zM6 12v5a10 4 0 0 0 12 0v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  document: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      {icons[name]}
    </svg>
  );
};