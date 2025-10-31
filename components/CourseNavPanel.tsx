import React, { useMemo } from 'react';
import { useAppContext } from '../App';
import { COURSES_DATA } from '../constants';
import ModuleAccordion from './ModuleAccordion';
import { Course, Language } from '../types';
import { PythonIcon, RIcon, SQLIcon, ScalaIcon, ArrowLeftIcon, DataScienceIcon, MachineLearningIcon, DataAnalysisIcon, ArtificialIntelligenceIcon, BookIcon, CheckCircleIcon } from './IconComponents';

const LanguageButton: React.FC<{
    lang: Language;
    currentLang: Language;
    onClick: (lang: Language) => void;
    children: React.ReactNode;
}> = ({ lang, currentLang, onClick, children }) => (
    <button
        onClick={() => onClick(lang)}
        className={`flex-1 p-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
            currentLang === lang 
                ? 'border-accent-primary text-text-primary' 
                : 'border-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
        }`}
    >
        {children}
    </button>
);

const getCourseIcon = (courseId: string) => {
    if (courseId.startsWith('ds-')) return <DataScienceIcon className="w-6 h-6 text-text-secondary group-hover:text-text-primary" />;
    if (courseId.startsWith('ml-')) return <MachineLearningIcon className="w-6 h-6 text-text-secondary group-hover:text-text-primary" />;
    if (courseId.startsWith('da-')) return <DataAnalysisIcon className="w-6 h-6 text-text-secondary group-hover:text-text-primary" />;
    if (courseId.startsWith('ai-')) return <ArtificialIntelligenceIcon className="w-6 h-6 text-text-secondary group-hover:text-text-primary" />;
    return <BookIcon className="w-6 h-6 text-text-secondary group-hover:text-text-primary" />; // Fallback
};

const CourseNavPanel: React.FC = () => {
    const { 
        selectedLanguage, 
        setSelectedLanguage,
        selectedCourseId, 
        setSelectedCourseId,
        selectedModuleId, 
        setSelectedModuleId, 
        setSelectedLessonId,
        isCourseNavVisible,
        progress,
    } = useAppContext();

    const selectedCourse = COURSES_DATA[selectedLanguage].find(c => c.id === selectedCourseId);

    const totalLessons = useMemo(() => {
        if (!selectedCourse) return 0;
        return selectedCourse.modules.reduce((total, module) => 
            total + module.classes.reduce((subTotal, cls) => subTotal + cls.lessons.length, 0),
        0);
    }, [selectedCourse]);

    const completedLessonsCount = (selectedCourseId && progress.courses[selectedCourseId]?.completedLessons.length) || 0;

    const courseProgressPercentage = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

    const handleSelectModule = (moduleId: string) => {
        if (selectedModuleId === moduleId) {
            setSelectedModuleId(null);
            setSelectedLessonId(null);
        } else {
            setSelectedModuleId(moduleId);
            setSelectedLessonId(null);
        }
    };
    
    if (!isCourseNavVisible) {
        return null;
    }

    if (selectedCourse) {
        return (
            <aside className="w-96 bg-bg-secondary text-text-primary flex-shrink-0 flex flex-col h-screen transition-all duration-300">
                <div className="p-4 border-b border-border-primary">
                    <button onClick={() => setSelectedCourseId(null)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to All Courses
                    </button>
                    <h2 className="text-lg font-bold truncate">{selectedCourse.title}</h2>
                    <div className="mt-3">
                        <div className="flex justify-between items-center text-xs text-text-secondary mb-1">
                            <span>Overall Progress</span>
                            <span className="font-medium">{completedLessonsCount} / {totalLessons}</span>
                        </div>
                        <div className="w-full bg-bg-tertiary rounded-full h-2">
                            <div 
                                className="bg-accent-primary h-2 rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${courseProgressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto flex-grow">
                    {selectedCourse.modules.map(module => (
                        <ModuleAccordion 
                            key={module.id} 
                            module={module}
                            onSelectModule={handleSelectModule}
                            selectedModuleId={selectedModuleId}
                            courseId={selectedCourse.id}
                        />
                    ))}
                </div>
            </aside>
        );
    }

    // Course Selection View
    return (
         <aside className="w-96 bg-bg-secondary text-text-primary flex-shrink-0 flex flex-col h-screen transition-all duration-300">
             <div className="p-4 border-b border-border-primary">
                <h2 className="text-lg font-bold">Courses</h2>
                <p className="text-sm text-text-secondary mt-1">Select a language to begin your learning journey.</p>
            </div>
            <div className="flex border-b border-border-primary">
                <LanguageButton lang="python" currentLang={selectedLanguage} onClick={setSelectedLanguage}><PythonIcon className="w-5 h-5"/> Python</LanguageButton>
                <LanguageButton lang="r" currentLang={selectedLanguage} onClick={setSelectedLanguage}><RIcon className="w-5 h-5"/> R</LanguageButton>
                <LanguageButton lang="sql" currentLang={selectedLanguage} onClick={setSelectedLanguage}><SQLIcon className="w-5 h-5"/> SQL</LanguageButton>
                <LanguageButton lang="scala" currentLang={selectedLanguage} onClick={setSelectedLanguage}><ScalaIcon className="w-5 h-5"/> Scala</LanguageButton>
            </div>
            <div className="overflow-y-auto flex-grow p-4 space-y-3">
                {COURSES_DATA[selectedLanguage].map(course => {
                    const courseProgress = progress.courses[course.id];
                    const completedCount = courseProgress?.completedLessons?.length || 0;
                    const totalLessons = course.modules.reduce((total, module) => total + module.classes.reduce((subTotal, cls) => subTotal + cls.lessons.length, 0), 0);
                    const percentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
                    const isCompleted = totalLessons > 0 && completedCount === totalLessons;

                    return (
                        <button 
                            key={course.id} 
                            onClick={() => setSelectedCourseId(course.id)}
                            className="w-full text-left p-4 rounded-lg bg-bg-primary hover:bg-bg-tertiary transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    {getCourseIcon(course.id)}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-text-primary">{course.title}</h3>
                                        {/* FIX: Wrapped CheckCircleIcon in a span to apply the title attribute for the tooltip, resolving a TypeScript error. */}
                                        {isCompleted && <span className="flex-shrink-0" title="Course Completed!"><CheckCircleIcon className="w-5 h-5 text-accent-primary" /></span>}
                                    </div>
                                    <p className="text-sm text-text-secondary mt-1">{course.description}</p>
                                    
                                    {totalLessons > 0 && (
                                        <div className="mt-3">
                                            <div className="flex justify-between items-center text-xs text-text-secondary mb-1">
                                                <span>Progress</span>
                                                <span className="font-medium">{completedCount} / {totalLessons}</span>
                                            </div>
                                            <div className="w-full bg-bg-tertiary rounded-full h-1.5">
                                                <div 
                                                    className="bg-accent-primary h-1.5 rounded-full transition-all duration-500 ease-out" 
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </aside>
    );
}

export default CourseNavPanel;