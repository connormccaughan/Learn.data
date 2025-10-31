import React, { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { Course, Language, UserProgress, Module, Class, Lesson, Project, AppContextType } from './types';
import { COURSES_DATA, PROJECTS_DATA } from './constants';
import ContentViewer from './components/ContentViewer';
import Sidebar from './components/Sidebar';
import CourseNavPanel from './components/CourseNavPanel';
import { loadProgress, saveProgress } from './services/progressService';
import AdminPanel from './components/AdminPanel';
import ThemePanel from './components/ThemePanel';
import { THEMES, Theme } from './themes';
import Chatbot from './components/Chatbot';
import { SparklesIcon } from './components/IconComponents';
import ProjectsPanel from './components/ProjectsPanel';
import ProjectViewer from './components/ProjectViewer';
import Dashboard from './components/Dashboard';

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppProvider');
    return context;
};

// Main App Component
const App: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
    const [viewMode, setViewMode] = useState<'courses' | 'projects' | 'dashboard'>('dashboard');
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [progress, setProgress] = useState<UserProgress>({ courses: {}, activityLog: {} });
    const [isCourseNavVisible, setIsCourseNavVisible] = useState(true);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
    const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);


    useEffect(() => {
        setProgress(loadProgress());
         const savedThemeName = localStorage.getItem('learn-data-theme');
        const savedTheme = THEMES.find(t => t.name === savedThemeName) || THEMES[0];
        setCurrentTheme(savedTheme);
    }, []);

     useEffect(() => {
        const root = document.documentElement;
        for (const [key, value] of Object.entries(currentTheme.colors)) {
            root.style.setProperty(key, value);
        }
        localStorage.setItem('learn-data-theme', currentTheme.name);
    }, [currentTheme]);

    const handleToggleLessonCompletion = (courseId: string, lessonId: string) => {
        const newProgress = structuredClone(progress);
        if (!newProgress.courses[courseId]) {
            newProgress.courses[courseId] = { completedLessons: [] };
        }
        const completed = newProgress.courses[courseId].completedLessons;
        const lessonIndex = completed.indexOf(lessonId);
        
        if (lessonIndex > -1) {
            completed.splice(lessonIndex, 1);
        } else {
            completed.push(lessonId);
            // Log activity only when a lesson is marked as complete
            const today = new Date().toISOString().split('T')[0];
            if (!newProgress.activityLog) {
                newProgress.activityLog = {};
            }
            newProgress.activityLog[today] = (newProgress.activityLog[today] || 0) + 1;
        }

        setProgress(newProgress);
        saveProgress(newProgress);
    };

    const toggleCourseNav = () => setIsCourseNavVisible(prev => !prev);
    const toggleAdminPanel = () => setIsAdminPanelOpen(prev => !prev);
    const toggleThemePanel = () => setIsThemePanelOpen(prev => !prev);
    const toggleChat = () => setIsChatOpen(prev => !prev);


    // Reset selections when language or viewMode changes
    useEffect(() => {
        setSelectedCourseId(null);
        setSelectedModuleId(null);
        setSelectedLessonId(null);
        setSelectedProjectId(null);
    }, [selectedLanguage, viewMode]);

    const { selectedCourse, selectedModule, selectedClass, selectedLesson } = useMemo(() => {
        const course = COURSES_DATA[selectedLanguage].find(c => c.id === selectedCourseId) || null;
        if (!course) return { selectedCourse: null, selectedModule: null, selectedClass: null, selectedLesson: null };

        const module = course.modules.find(m => m.id === selectedModuleId) || null;
        if (!module || !selectedLessonId) return { selectedCourse: course, selectedModule: module, selectedClass: null, selectedLesson: null };
        
        const parts = selectedLessonId.split('-');
        if (parts.length < 6) return { selectedCourse: course, selectedModule: module, selectedClass: null, selectedLesson: null };

        const classId = `${parts[2]}-${parts[3]}`;
        const lessonId = `${parts[4]}-${parts[5]}`;

        const cls = module.classes.find(c => c.id === classId) || null;
        const lesson = cls?.lessons.find(l => l.id === lessonId) || null;

        return { selectedCourse: course, selectedModule: module, selectedClass: cls, selectedLesson: lesson };
    }, [selectedLanguage, selectedCourseId, selectedModuleId, selectedLessonId]);

    const selectedProject = useMemo(() => {
        if (viewMode !== 'projects' || !selectedProjectId) return null;
        return PROJECTS_DATA[selectedLanguage].find(p => p.id === selectedProjectId) || null;
    }, [selectedLanguage, selectedProjectId, viewMode]);
    
    // Create a flattened list of lessons for easy navigation
    const { flatLessons, totalLessonsInCourse } = useMemo(() => {
        if (!selectedCourse) return { flatLessons: [], totalLessonsInCourse: 0 };
        const lessons: { lessonId: string; moduleId: string; classId: string; }[] = [];
        selectedCourse.modules.forEach(module => {
            module.classes.forEach(cls => {
                cls.lessons.forEach(lesson => {
                    lessons.push({
                        lessonId: `${module.id}-${cls.id}-${lesson.id}`,
                        moduleId: module.id,
                        classId: cls.id,
                    });
                });
            });
        });
        return { flatLessons: lessons, totalLessonsInCourse: lessons.length };
    }, [selectedCourse]);

    const currentLessonIndex = useMemo(() => {
        if (!selectedLessonId) return -1;
        return flatLessons.findIndex(l => l.lessonId === selectedLessonId);
    }, [selectedLessonId, flatLessons]);

    const goToNextLesson = () => {
        if (currentLessonIndex < 0 || currentLessonIndex >= flatLessons.length - 1) return;
        const nextLesson = flatLessons[currentLessonIndex + 1];
        if (selectedModuleId !== nextLesson.moduleId) {
            setSelectedModuleId(nextLesson.moduleId);
        }
        setSelectedLessonId(nextLesson.lessonId);
    };

    const goToPreviousLesson = () => {
        if (currentLessonIndex <= 0) return;
        const prevLesson = flatLessons[currentLessonIndex - 1];
        if (selectedModuleId !== prevLesson.moduleId) {
            setSelectedModuleId(prevLesson.moduleId);
        }
        setSelectedLessonId(prevLesson.lessonId);
    };

    const contextValue = useMemo(() => ({
        selectedLanguage, setSelectedLanguage,
        viewMode, setViewMode,
        selectedCourseId, setSelectedCourseId,
        selectedModuleId, setSelectedModuleId,
        selectedLessonId, setSelectedLessonId,
        selectedProjectId, setSelectedProjectId,
        progress,
        toggleLessonCompletion: handleToggleLessonCompletion,
        isCourseNavVisible,
        toggleCourseNav,
        isAdminPanelOpen,
        toggleAdminPanel,
        currentTheme,
        setCurrentTheme,
        isThemePanelOpen,
        toggleThemePanel,
        isChatOpen,
        toggleChat,
        selectedCourse,
        selectedModule,
        selectedClass,
        selectedLesson,
        selectedProject,
        goToNextLesson,
        goToPreviousLesson,
        currentLessonIndex,
        totalLessonsInCourse,
    }), [selectedLanguage, viewMode, selectedCourseId, selectedModuleId, selectedLessonId, selectedProjectId, progress, isCourseNavVisible, isAdminPanelOpen, currentTheme, isThemePanelOpen, isChatOpen, selectedCourse, selectedModule, selectedClass, selectedLesson, selectedProject, currentLessonIndex, totalLessonsInCourse]);
    
    const renderMainContent = () => {
        switch(viewMode) {
            case 'dashboard':
                return <Dashboard />;
            case 'courses':
                return (
                     <>
                        <CourseNavPanel />
                        <ContentViewer 
                            selectedModule={selectedModule} 
                            selectedCourse={selectedCourse} 
                            selectedLanguage={selectedLanguage}
                            selectedLessonId={selectedLessonId}
                        />
                    </>
                );
            case 'projects':
                return (
                    <>
                        <ProjectsPanel />
                        <ProjectViewer />
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <AppContext.Provider value={contextValue}>
            <div className="flex h-screen bg-bg-primary text-text-primary">
                <Sidebar />
                {renderMainContent()}
                
                {isAdminPanelOpen && <AdminPanel onClose={toggleAdminPanel} />}
                {isThemePanelOpen && <ThemePanel onClose={toggleThemePanel} />}
                
                <button
                    onClick={toggleChat}
                    className="fixed bottom-6 right-6 bg-accent-primary text-text-on-accent w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-accent-primary-hover transition-transform transform hover:scale-110 z-40"
                    aria-label="Open Genie AI Assistant"
                >
                    <SparklesIcon className="w-8 h-8" />
                </button>

                {isChatOpen && <Chatbot onClose={toggleChat} />}
            </div>
        </AppContext.Provider>
    );
};

export default App;