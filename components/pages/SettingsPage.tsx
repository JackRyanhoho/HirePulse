import React, { useState } from 'react';
import { Icon } from '../ui/Icon';

type SettingsSection = 'profile' | 'notifications' | 'integrations' | 'apiKey';

const SettingsNavItem: React.FC<{ iconName: string; label: string; sectionName: SettingsSection; activeSection: SettingsSection; onClick: (section: SettingsSection) => void; }> = 
({ iconName, label, sectionName, activeSection, onClick }) => (
    <button
        onClick={() => onClick(sectionName)}
        className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
            activeSection === sectionName
            ? 'bg-primary-100 text-primary-700'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
    >
        <Icon name={iconName} className="w-5 h-5 mr-3" />
        <span>{label}</span>
    </button>
);

const ProfileSettings: React.FC = () => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800">Profile Information</h3>
        <p className="text-sm text-slate-500 mt-1">Update your personal details here.</p>
        <div className="mt-6 space-y-4">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" id="name" defaultValue="John Doe" className="mt-1 block w-full md:w-2/3 border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" id="email" defaultValue="john.doe@example.com" className="mt-1 block w-full md:w-2/3 border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
             <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                <input type="text" id="role" defaultValue="Recruiter" className="mt-1 block w-full md:w-2/3 border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
        </div>
    </div>
);

const PlaceholderContent: React.FC<{title: string; description: string}> = ({title, description}) => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
        <div className="mt-6 p-8 text-center bg-slate-50 rounded-lg">
            <p className="text-slate-500">This feature is under development.</p>
        </div>
    </div>
);


export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  const renderSection = () => {
    switch (activeSection) {
        case 'profile':
            return <ProfileSettings />;
        case 'notifications':
            return <PlaceholderContent title="Notifications" description="Manage your email and in-app notification preferences." />;
        case 'integrations':
            return <PlaceholderContent title="Integrations" description="Connect HirePulse with your favorite tools." />;
        case 'apiKey':
            return <PlaceholderContent title="API Keys" description="Manage API keys for custom integrations." />;
        default:
            return null;
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Settings</h2>
            <nav className="space-y-1">
                <SettingsNavItem iconName="profile" label="Profile" sectionName="profile" activeSection={activeSection} onClick={setActiveSection} />
                <SettingsNavItem iconName="notification" label="Notifications" sectionName="notifications" activeSection={activeSection} onClick={setActiveSection} />
                <SettingsNavItem iconName="integrations" label="Integrations" sectionName="integrations" activeSection={activeSection} onClick={setActiveSection} />
                <SettingsNavItem iconName="apiKey" label="API Keys" sectionName="apiKey" activeSection={activeSection} onClick={setActiveSection} />
            </nav>
        </div>
        <div className="md:col-span-3">
            <div className="border-l border-slate-200 pl-8">
                 {renderSection()}
                 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                    <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Save Changes
                    </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};