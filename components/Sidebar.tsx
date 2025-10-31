import React from 'react';
import { useAppContext } from '../App';
import { 
    LogoIconOnly, BookIcon,
    CogIcon, PaletteIcon, CodeBracketSquareIcon, ChartBarIcon
} from './IconComponents';

const Sidebar: React.FC = () => {
    const { 
        viewMode, setViewMode,
        toggleAdminPanel,
        toggleThemePanel,
    } = useAppContext();

    return (
        <nav className="w-20 bg-bg-primary flex flex-col items-center h-screen py-4 gap-6 shrink-0">
            <div className="flex flex-col items-center gap-6 flex-grow">
                <div className="text-accent-primary h-8 w-8 mb-4">
                    <LogoIconOnly />
                </div>
                
                <div className="w-full border-t border-border-primary my-2"></div>

                 {/* View Mode Toggles */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setViewMode('dashboard')}
                        aria-label="Switch to Dashboard"
                        title="Dashboard"
                        className={`p-3 rounded-lg transition-colors w-16 h-16 flex items-center justify-center ${viewMode === 'dashboard' ? 'bg-bg-tertiary text-text-primary' : 'text-text-secondary hover:bg-bg-tertiary'}`}
                    >
                        <ChartBarIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setViewMode('courses')}
                        aria-label="Switch to Courses"
                        title="Courses"
                        className={`p-3 rounded-lg transition-colors w-16 h-16 flex items-center justify-center ${viewMode === 'courses' ? 'bg-bg-tertiary text-text-primary' : 'text-text-secondary hover:bg-bg-tertiary'}`}
                    >
                        <BookIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setViewMode('projects')}
                        aria-label="Switch to Projects"
                        title="Projects"
                        className={`p-3 rounded-lg transition-colors w-16 h-16 flex items-center justify-center ${viewMode === 'projects' ? 'bg-bg-tertiary text-text-primary' : 'text-text-secondary hover:bg-bg-tertiary'}`}
                    >
                        <CodeBracketSquareIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Admin Panel Toggle */}
            <div className="flex flex-col items-center w-full">
                 <button
                    onClick={toggleThemePanel}
                    aria-label="Open Theme Panel"
                    title="Change Theme"
                    className="p-3 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                    <PaletteIcon className="w-6 h-6" />
                </button>
                 <button
                    onClick={toggleAdminPanel}
                    aria-label="Open Admin Panel"
                    title="Content Generation Admin"
                    className="p-3 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                    <CogIcon className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;