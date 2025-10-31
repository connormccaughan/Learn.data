import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Course, Language, Module, LessonData } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import CodeRunner from './CodeRunner';
import { getCachedLessonData, setCachedLessonData, getCachedModuleIntro, setCachedModuleIntro } from '../services/progressService';
import { useAppContext } from '../App';
import { MenuIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, GenieLampIcon, XMarkIcon } from './IconComponents';
import { generateLessonContent, generateModuleIntro, explainTextSimply } from '../services/geminiService';

const ExplainSimplyModal: React.FC<{ text: string, onClose: () => void }> = ({ text, onClose }) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExplanation = async () => {
            setIsLoading(true);
            const result = await explainTextSimply(text);
            setExplanation(result);
            setIsLoading(false);
        };
        fetchExplanation();
    }, [text]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-bg-content text-text-content-primary w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-border-content flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <GenieLampIcon className="w-6 h-6 text-accent-primary" />
                        <h2 className="text-xl font-bold">Genie Explains</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-border-content">
                         <XMarkIcon className="w-6 h-6 text-text-content-secondary" />
                    </button>
                </header>
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <svg className="animate-spin h-8 w-8 text-accent-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </div>
                    ) : (
                        <MarkdownRenderer content={explanation} />
                    )}
                </div>
            </div>
        </div>
    );
};


interface ContentViewerProps {
  selectedModule: Module | null;
  selectedCourse: Course | null;
  selectedLanguage: Language;
  selectedLessonId: string | null;
}

const ContentHeader: React.FC<{
  courseTitle: string;
  moduleTitle: string | null;
  lessonTitle: string | null;
  viewMode: 'introduction' | 'assignment' | null;
}> = ({ courseTitle, moduleTitle, lessonTitle, viewMode }) => {
    const { toggleCourseNav } = useAppContext();
    return (
        <header className="sticky top-0 z-10 flex items-center h-16 px-6 bg-bg-content border-b border-border-content text-text-content-primary">
            <button onClick={toggleCourseNav} className="mr-4 p-2 rounded-full hover:bg-border-content">
                <MenuIcon className="w-6 h-6 text-text-content-secondary"/>
            </button>
            <div className="flex items-center text-sm font-medium">
                <span className="text-text-content-secondary">{courseTitle}</span>
                {moduleTitle && (
                    <>
                        <ChevronRightIcon className="w-5 h-5 text-text-tertiary scale-50 -rotate-180" />
                        <span>{moduleTitle}</span>
                    </>
                )}
                {lessonTitle && (
                     <>
                        <ChevronRightIcon className="w-5 h-5 text-text-tertiary scale-50 -rotate-180" />
                        <span className="text-text-content-primary font-semibold">{lessonTitle}</span>
                         {viewMode === 'assignment' && (
                            <span className="ml-3 text-xs font-bold uppercase bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded-full">
                                Assignment
                            </span>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

const ContentViewer: React.FC<ContentViewerProps> = ({ selectedModule, selectedCourse, selectedLanguage, selectedLessonId }) => {
  const [currentLessonData, setCurrentLessonData] = useState<LessonData | null>(null);
  const [moduleIntroContent, setModuleIntroContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lessonViewMode, setLessonViewMode] = useState<'introduction' | 'assignment'>('introduction');
  const [textToExplain, setTextToExplain] = useState<string | null>(null);

  const {
      selectedClass,
      selectedLesson,
      goToNextLesson,
      goToPreviousLesson,
      currentLessonIndex,
      totalLessonsInCourse
  } = useAppContext();

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setCurrentLessonData(null);
    setModuleIntroContent(null);
    setError(null);

    try {
        let languageDisplay: 'Python' | 'R' | 'SQL' | 'Scala';
        switch (selectedLanguage) {
            case 'python': languageDisplay = 'Python'; break;
            case 'r': languageDisplay = 'R'; break;
            case 'sql': languageDisplay = 'SQL'; break;
            case 'scala': languageDisplay = 'Scala'; break;
        }

        if (selectedLessonId && selectedCourse && selectedModule && selectedClass && selectedLesson) {
            const cachedData = getCachedLessonData(selectedLessonId);
            if (cachedData) {
                setCurrentLessonData(cachedData);
            } else {
                const lessonData = await generateLessonContent(
                    selectedCourse.title,
                    selectedModule.title,
                    selectedClass.title,
                    selectedLesson.title,
                    languageDisplay
                );
                if (lessonData.lessonContent.includes('## Generation Error')) {
                    setError(`We're sorry, but there was an error generating the lesson content. Details: ${lessonData.lessonContent}`);
                } else {
                    setCurrentLessonData(lessonData);
                    setCachedLessonData(selectedLessonId, lessonData);
                }
            }
        } else if (selectedModule?.id && selectedCourse) {
            const cachedData = getCachedModuleIntro(selectedModule.id);
            if (cachedData) {
                setModuleIntroContent(cachedData);
            } else {
                let fullText = '';
                setModuleIntroContent('');
                const handleStream = (chunk: string) => {
                    fullText += chunk;
                    setModuleIntroContent(fullText);
                };
                await generateModuleIntro(
                    selectedCourse.title,
                    selectedModule.title,
                    languageDisplay,
                    handleStream
                );
                if (!fullText.startsWith('Error:')) {
                    setCachedModuleIntro(selectedModule.id, fullText);
                } else {
                    setError(fullText);
                }
            }
        }
    } catch (e) {
        console.error("Failed to generate content:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(`Failed to generate content on-demand. Please check your API key and network connection. Details: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  }, [selectedCourse, selectedModule, selectedClass, selectedLesson, selectedLanguage, selectedLessonId]);

  useEffect(() => {
    setLessonViewMode('introduction'); // Reset to introduction view whenever a new lesson is selected
    if (selectedCourse && (selectedModule || selectedLessonId)) {
      fetchContent();
    } else {
      setCurrentLessonData(null);
      setModuleIntroContent(null);
      setError(null);
      setIsLoading(false);
    }
  }, [fetchContent, selectedCourse, selectedModule, selectedLessonId]);

  if (!selectedCourse) {
     return (
        <div className="flex-grow bg-bg-content text-text-content-primary flex items-center justify-center h-full">
            <p>Select a course to begin.</p>
        </div>
     )
  }
  
  return (
    <main className="flex-grow bg-bg-content text-text-content-primary flex flex-col h-screen overflow-hidden">
        {textToExplain && <ExplainSimplyModal text={textToExplain} onClose={() => setTextToExplain(null)} />}
        <ContentHeader 
            courseTitle={selectedCourse.title}
            moduleTitle={selectedModule?.title || null}
            lessonTitle={selectedLesson?.title || null}
            viewMode={selectedLessonId ? lessonViewMode : null}
        />
        <div className="flex-grow overflow-y-auto">
            {!selectedModule && !isLoading && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold text-text-content-primary">Welcome to {selectedCourse.title}</h2>
                        <p className="text-text-content-secondary mt-2">Select a module from the list to begin your learning journey.</p>
                    </div>
                </div>
            )}
            {isLoading && (
                 <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                        <svg className="animate-spin h-10 w-10 text-accent-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <h2 className="text-2xl font-bold text-text-content-primary mt-4">Generating Content...</h2>
                        <p className="text-text-content-secondary mt-2">Please wait a moment while we prepare your lesson with Gemini.</p>
                    </div>
                </div>
            )}
            
            {!isLoading && (
              <div className="max-w-4xl mx-auto p-8 lg:p-12">
                  {error && <div className="text-error bg-error/10 p-4 rounded-lg border border-error/20">{error}</div>}
                  
                  {moduleIntroContent && !selectedLessonId && (
                    <MarkdownRenderer content={moduleIntroContent} onExplain={setTextToExplain} />
                  )}

                  {currentLessonData && selectedLessonId && (
                    <>
                      {lessonViewMode === 'introduction' ? (
                        <>
                          <MarkdownRenderer content={currentLessonData.lessonContent} onExplain={setTextToExplain} />
                          <div className="mt-12 pt-8 border-t border-border-content flex justify-end">
                            <button
                              onClick={() => setLessonViewMode('assignment')}
                              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-text-on-accent bg-accent-primary rounded-lg shadow-md hover:bg-accent-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary transition-all"
                            >
                              Start Assignment &rarr;
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="mb-6">
                            <button
                              onClick={() => setLessonViewMode('introduction')}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-primary-hover hover:underline"
                            >
                              &larr; Back to Lesson
                            </button>
                          </div>

                          {currentLessonData.assignment && (
                            <CodeRunner 
                                assignment={currentLessonData.assignment} 
                                language={selectedLanguage}
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
              </div>
            )}
        </div>
        {selectedLessonId && currentLessonData && !isLoading && totalLessonsInCourse > 1 && (
            <div className="shrink-0 border-t border-border-content p-4 bg-bg-content">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <button
                        onClick={goToPreviousLesson}
                        disabled={currentLessonIndex <= 0}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-border-content/50 hover:bg-border-content text-text-content-secondary"
                        aria-label="Go to previous lesson"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Previous
                    </button>

                    <span className="text-sm text-text-content-secondary">
                        Lesson {currentLessonIndex + 1} of {totalLessonsInCourse}
                    </span>

                    <button
                        onClick={goToNextLesson}
                        disabled={currentLessonIndex >= totalLessonsInCourse - 1}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-border-content/50 hover:bg-border-content text-text-content-secondary"
                        aria-label="Go to next lesson"
                    >
                        Next
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
      )}
    </main>
  );
};

export default ContentViewer;