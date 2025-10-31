import React from 'react';
import { useAppContext } from '../App';
import { PROJECTS_DATA } from '../constants';
import { Project, ProjectDifficulty } from '../types';
import { LogoIcon } from './IconComponents';

const ProjectsPanel: React.FC = () => {
    const { 
        selectedLanguage, 
        selectedProjectId,
        setSelectedProjectId,
        isCourseNavVisible, // Using this to toggle visibility of this panel as well
    } = useAppContext();

    const projects = PROJECTS_DATA[selectedLanguage] || [];

    const groupedProjects = projects.reduce((acc, project) => {
        if (!acc[project.difficulty]) {
            acc[project.difficulty] = [];
        }
        acc[project.difficulty].push(project);
        return acc;
    }, {} as Record<ProjectDifficulty, Project[]>);
    
    const difficultyOrder: ProjectDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

    if (!isCourseNavVisible) {
        return null;
    }

    return (
        <aside className="w-96 bg-bg-secondary text-text-primary flex-shrink-0 flex flex-col h-screen transition-all duration-300">
             <div className="p-4 border-b border-border-primary">
                <div className="h-8 mb-4">
                  <LogoIcon className="h-full w-auto" />
                </div>
                <h2 className="text-lg font-bold truncate">Projects</h2>
                <p className="text-sm text-text-secondary mt-1">Apply your skills with hands-on projects.</p>
            </div>
            <div className="overflow-y-auto flex-grow">
                {difficultyOrder.map(difficulty => (
                    groupedProjects[difficulty] && (
                        <div key={difficulty} className="p-4">
                            <h3 className="text-sm font-bold uppercase text-text-tertiary tracking-wider mb-2">{difficulty}</h3>
                            <ul className="space-y-1">
                                {groupedProjects[difficulty].map(project => {
                                    const isSelected = selectedProjectId === project.id;
                                    return (
                                        <li key={project.id}>
                                            <button 
                                                onClick={() => setSelectedProjectId(project.id)}
                                                className={`w-full text-left p-2 rounded-md text-sm transition-colors border-l-4 ${isSelected ? 'bg-bg-tertiary border-accent-primary text-text-primary font-semibold' : 'border-transparent text-text-secondary hover:bg-bg-tertiary/50 hover:text-text-primary'}`}
                                            >
                                                {project.title}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </aside>
    );
}

export default ProjectsPanel;