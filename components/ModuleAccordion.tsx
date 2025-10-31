import React, { useMemo } from 'react';
import { Module } from '../types';
import { ChevronDownIcon, CheckCircleIcon, DocumentTextIcon } from './IconComponents';
import { useAppContext } from '../App';

interface ModuleAccordionProps {
  module: Module;
  onSelectModule: (moduleId: string) => void;
  selectedModuleId: string | null;
  courseId: string;
}

const ModuleAccordion: React.FC<ModuleAccordionProps> = ({ module, onSelectModule, selectedModuleId, courseId }) => {
  const { progress, toggleLessonCompletion, selectedLessonId, setSelectedLessonId } = useAppContext();
  const isOpen = selectedModuleId === module.id;
  const completedLessons = progress.courses[courseId]?.completedLessons || [];

  const moduleTotalLessons = useMemo(() => {
    return module.classes.reduce((acc, cls) => acc + cls.lessons.length, 0);
  }, [module]);

  const moduleCompletedCount = useMemo(() => {
    let count = 0;
    for (const cls of module.classes) {
      for (const lesson of cls.lessons) {
        const uniqueLessonId = `${module.id}-${cls.id}-${lesson.id}`;
        if (completedLessons.includes(uniqueLessonId)) {
          count++;
        }
      }
    }
    return count;
  }, [module, completedLessons]);

  const moduleProgressPercentage = moduleTotalLessons > 0 ? (moduleCompletedCount / moduleTotalLessons) * 100 : 0;

  const handleLessonSelect = (lessonUniqueId: string) => {
    setSelectedLessonId(prev => prev === lessonUniqueId ? null : lessonUniqueId);
  }

  return (
    <div className="border-b border-border-primary">
      <button
        onClick={() => onSelectModule(module.id)}
        className="w-full text-left p-4 hover:bg-bg-tertiary transition-colors"
      >
        <div className="flex justify-between items-start">
          <span className="font-semibold text-text-primary pr-4">{module.title}</span>
          <ChevronDownIcon
            className={`w-5 h-5 text-text-secondary transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
        <div className="mt-2">
            <div className="flex justify-between items-center text-xs text-text-secondary mb-1">
                <span>{moduleCompletedCount} / {moduleTotalLessons} lessons</span>
                <span>{Math.round(moduleProgressPercentage)}%</span>
            </div>
            <div className="w-full bg-bg-primary rounded-full h-1.5">
                <div 
                    className="bg-accent-primary h-1.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${moduleProgressPercentage}%` }}
                ></div>
            </div>
        </div>
      </button>
      {isOpen && (
        <div className="bg-bg-primary/70 py-2">
          {module.classes.map((cls) => (
            <div key={cls.id} className="mb-2">
              <h4 className="font-semibold text-text-secondary text-sm mb-1 px-4">{cls.title}</h4>
              <ul className="space-y-1">
                {cls.lessons.map((lesson) => {
                  const uniqueLessonId = `${module.id}-${cls.id}-${lesson.id}`;
                  const isCompleted = completedLessons.includes(uniqueLessonId);
                  const isSelected = selectedLessonId === uniqueLessonId;

                  return (
                    <li key={lesson.id} className={`transition-colors border-l-4 ${isSelected ? 'bg-bg-tertiary border-accent-primary' : 'border-transparent hover:bg-bg-tertiary/50'}`}>
                      <div className="w-full text-left flex items-center gap-2 p-2 pl-3 text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompletion(courseId, uniqueLessonId);
                          }}
                          aria-label={`Mark ${lesson.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                          className="flex-shrink-0"
                        >
                          {isCompleted ? (
                            <CheckCircleIcon className="w-5 h-5 text-accent-primary" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-border-secondary rounded-md bg-bg-secondary"></div>
                          )}
                        </button>
                        <button onClick={() => handleLessonSelect(uniqueLessonId)} className="flex-grow text-left">
                           <span className={`${isCompleted ? 'line-through text-text-tertiary' : (isSelected ? 'text-text-primary font-semibold' : 'text-text-secondary')}`}>
                            {lesson.title}
                          </span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleAccordion;