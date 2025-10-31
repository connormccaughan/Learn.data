import React, { useState, useCallback, useEffect } from 'react';
import { COURSES_DATA } from '../constants';
import { Course, Language } from '../types';
import { getCachedLessonData, setCachedLessonData, getCachedModuleIntro, setCachedModuleIntro } from '../services/progressService';
import { generateLessonContent, generateModuleIntro } from '../services/geminiService';

interface AdminPanelProps {
  onClose: () => void;
}

type Status = 'idle' | 'running' | 'done' | 'error';
interface GenerationStatus {
  [key: string]: { // courseId
    status: Status;
    message: string;
    progress: number;
    total: number;
  };
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [statuses, setStatuses] = useState<GenerationStatus>({});
  const [cachedKeys, setCachedKeys] = useState<Set<string>>(new Set());

  const refreshCachedKeys = useCallback(() => {
    const keys = new Set<string>();
    Object.values(COURSES_DATA).flat().forEach(course => {
        course.modules.forEach(module => {
            if (getCachedModuleIntro(module.id)) keys.add(module.id);
            module.classes.forEach(cls => {
                cls.lessons.forEach(lesson => {
                    const uniqueId = `${module.id}-${cls.id}-${lesson.id}`;
                    if (getCachedLessonData(uniqueId)) keys.add(uniqueId);
                });
            });
        });
    });
    setCachedKeys(keys);
  }, []);

  useEffect(() => {
    refreshCachedKeys();
  }, [refreshCachedKeys]);
  
  const generateContent = async (course: Course, language: Language, force: boolean) => {
    let languageDisplay: 'Python' | 'R' | 'SQL' | 'Scala';
    switch (language) {
        case 'python': languageDisplay = 'Python'; break;
        case 'r': languageDisplay = 'R'; break;
        case 'sql': languageDisplay = 'SQL'; break;
        case 'scala': languageDisplay = 'Scala'; break;
    }

    const contentItems: { key: string, type: 'module' | 'lesson', data: any }[] = [];
    course.modules.forEach(module => {
      contentItems.push({ key: module.id, type: 'module', data: { module } });
      module.classes.forEach(cls => {
        cls.lessons.forEach(lesson => {
          const key = `${module.id}-${cls.id}-${lesson.id}`;
          contentItems.push({ key, type: 'lesson', data: { module, class: cls, lesson } });
        });
      });
    });

    setStatuses(prev => ({
      ...prev,
      [course.id]: { status: 'running', message: 'Starting...', progress: 0, total: contentItems.length }
    }));

    for (let i = 0; i < contentItems.length; i++) {
      const item = contentItems[i];
      const { key, type, data } = item;

      setStatuses(prev => ({
        ...prev,
        [course.id]: { ...prev[course.id], message: `Processing ${type}: ${data.lesson?.title || data.module.title}`, progress: i + 1 }
      }));

      if (!force && cachedKeys.has(key)) {
        continue; // Skip if already cached and not forcing
      }

      try {
        if (type === 'module') {
            let fullText = '';
            await generateModuleIntro(
                course.title, data.module.title, languageDisplay, (chunk) => { fullText += chunk; }
            );
            setCachedModuleIntro(key, fullText);
        } else if (type === 'lesson') {
            const content = await generateLessonContent(
                course.title, data.module.title, data.class.title, data.lesson.title, languageDisplay
            );
            setCachedLessonData(key, content);
        }
      } catch (error) {
        console.error(`Failed to generate content for ${key}:`, error);
        setStatuses(prev => ({
          ...prev,
          [course.id]: { ...prev[course.id], status: 'error', message: `Error on: ${data.lesson?.title || data.module.title}` }
        }));
        return; // Stop on error
      }
    }

    setStatuses(prev => ({
        ...prev,
        [course.id]: { ...prev[course.id], status: 'done', message: 'All content generated successfully!' }
    }));
    refreshCachedKeys();
  };

  const renderCourseSection = (course: Course, language: Language) => {
    const status = statuses[course.id];
    const isRunning = status?.status === 'running';

    return (
      <div key={course.id} className="bg-bg-secondary p-4 rounded-lg">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <button
                onClick={() => generateContent(course, language, false)}
                disabled={isRunning}
                className="bg-accent-primary text-text-on-accent px-3 py-1 rounded-md text-sm font-semibold hover:bg-accent-primary-hover disabled:bg-bg-tertiary"
            >
                {isRunning ? 'Generating...' : 'Pre-generate Missing'}
            </button>
        </div>
        {status && (
            <div className="mt-3">
                <p className="text-sm text-text-secondary">{status.message}</p>
                {isRunning && (
                    <div className="w-full bg-bg-tertiary rounded-full h-2 mt-1">
                        <div className="bg-accent-primary h-2 rounded-full" style={{ width: `${(status.progress / status.total) * 100}%`}}></div>
                    </div>
                )}
            </div>
        )}
        <div className="mt-4 text-xs text-text-secondary space-y-1">
            {course.modules.map(module => (
                <div key={module.id} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cachedKeys.has(module.id) ? 'bg-success' : 'bg-bg-tertiary'}`}></span>
                    <span>{module.title} (Intro)</span>
                </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-bg-primary text-text-primary w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col">
        <header className="p-4 border-b border-border-primary flex justify-between items-center">
          <h2 className="text-2xl font-bold">Content Generation Admin</h2>
          <button onClick={onClose} className="px-3 py-1 rounded-md hover:bg-bg-tertiary">&times;</button>
        </header>
        <div className="flex-grow p-4 overflow-y-auto space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-3 border-b border-border-primary pb-2">Python Courses</h2>
                <div className="space-y-4">
                    {COURSES_DATA.python.map(course => renderCourseSection(course, 'python'))}
                </div>
            </div>
             <div>
                <h2 className="text-xl font-semibold mb-3 border-b border-border-primary pb-2">R Courses</h2>
                <div className="space-y-4">
                    {COURSES_DATA.r.map(course => renderCourseSection(course, 'r'))}
                </div>
            </div>
             <div>
                <h2 className="text-xl font-semibold mb-3 border-b border-border-primary pb-2">SQL Courses</h2>
                <div className="space-y-4">
                    {COURSES_DATA.sql.map(course => renderCourseSection(course, 'sql'))}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-3 border-b border-border-primary pb-2">Scala Courses</h2>
                <div className="space-y-4">
                    {COURSES_DATA.scala.map(course => renderCourseSection(course, 'scala'))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;