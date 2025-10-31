
import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../App';
import { MenuIcon, ChevronRightIcon } from './IconComponents';
import { getCachedProjectGuide, setCachedProjectGuide, getCachedProjectFeedback, setCachedProjectFeedback } from '../services/progressService';
import { generateProjectGuide, gradeProjectSubmission } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import { FeedbackDisplay } from './FeedbackDisplay';
import { AIFeedback } from '../types';


const ProjectViewer: React.FC = () => {
    const { selectedLanguage, selectedProject, toggleCourseNav } = useAppContext();
    const [projectGuide, setProjectGuide] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // State for project submission
    const [submissionCode, setSubmissionCode] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<AIFeedback | null>(null);


    const getDifficultyClass = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-success/20 text-success';
            case 'Intermediate': return 'bg-warning/20 text-warning';
            case 'Advanced': return 'bg-error/20 text-error';
            default: return 'bg-bg-tertiary text-text-secondary';
        }
    };

     const fetchProjectGuide = useCallback(async () => {
        if (!selectedProject) return;
        
        setIsLoading(true);
        setProjectGuide(null);
        setError(null);
        setFeedback(null); // Clear previous feedback
        setSubmissionCode(''); // Clear previous submission

        // Check for cached feedback first
        const cachedFeedback = getCachedProjectFeedback(selectedProject.id);
        if (cachedFeedback) {
            setFeedback(cachedFeedback);
        }

        try {
            const cachedGuide = getCachedProjectGuide(selectedProject.id);
            if (cachedGuide) {
                setProjectGuide(cachedGuide);
                return;
            }

            let languageDisplay: 'Python' | 'R' | 'SQL' | 'Scala';
            switch (selectedLanguage) {
                case 'python': languageDisplay = 'Python'; break;
                case 'r': languageDisplay = 'R'; break;
                case 'sql': languageDisplay = 'SQL'; break;
                case 'scala': languageDisplay = 'Scala'; break;
            }

            let fullText = '';
            setProjectGuide(''); // Start with an empty string for streaming
            
            const handleStream = (chunk: string) => {
                fullText += chunk;
                setProjectGuide(fullText);
            };

            await generateProjectGuide(selectedProject, languageDisplay, handleStream);

            if (!fullText.startsWith('Error:')) {
                setCachedProjectGuide(selectedProject.id, fullText);
            } else {
                setError(fullText);
            }

        } catch (e) {
            console.error("Failed to generate project guide:", e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to generate project guide. Please check your API key and network connection. Details: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [selectedProject, selectedLanguage]);

    useEffect(() => {
        if (selectedProject) {
            fetchProjectGuide();
        } else {
            setProjectGuide(null);
            setIsLoading(false);
            setError(null);
            setFeedback(null);
        }
    }, [selectedProject, fetchProjectGuide]);

    const handleSubmitForFeedback = async () => {
        if (!selectedProject || !submissionCode.trim()) return;

        setIsSubmitting(true);
        setFeedback(null);
        setError(null);

        try {
            let languageDisplay: 'Python' | 'R' | 'SQL' | 'Scala';
            switch (selectedLanguage) {
                case 'python': languageDisplay = 'Python'; break;
                case 'r': languageDisplay = 'R'; break;
                case 'sql': languageDisplay = 'SQL'; break;
                case 'scala': languageDisplay = 'Scala'; break;
            }
            const result = await gradeProjectSubmission(selectedProject, submissionCode, languageDisplay);
            setFeedback(result);
            setCachedProjectFeedback(selectedProject.id, result);
        } catch (e) {
             console.error("Failed to grade project:", e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to get feedback for your project. Details: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <main className="flex-grow bg-bg-content text-text-content-primary flex flex-col h-screen overflow-hidden">
            <header className="sticky top-0 z-10 flex items-center h-16 px-6 bg-bg-content border-b border-border-content text-text-content-primary">
                <button onClick={toggleCourseNav} className="mr-4 p-2 rounded-full hover:bg-border-content">
                    <MenuIcon className="w-6 h-6 text-text-content-secondary"/>
                </button>
                <div className="flex items-center text-sm font-medium">
                    <span className="text-text-content-secondary">Projects</span>
                     {selectedProject && (
                        <>
                            <ChevronRightIcon className="w-5 h-5 text-text-tertiary scale-50 -rotate-180" />
                            <span className="text-text-content-primary font-semibold">{selectedProject.title}</span>
                        </>
                    )}
                </div>
            </header>
            <div className="flex-grow overflow-y-auto">
                {!selectedProject && !isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center p-8">
                            <h2 className="text-2xl font-bold text-text-content-primary">Select a Project</h2>
                            <p className="text-text-content-secondary mt-2">Choose a project from the panel to see the details and get started.</p>
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
                            <h2 className="text-2xl font-bold text-text-content-primary mt-4">Generating Project Guide...</h2>
                            <p className="text-text-content-secondary mt-2">Please wait a moment while Genie prepares your project outline.</p>
                        </div>
                    </div>
                )}
                {!isLoading && selectedProject && (
                    <div className="max-w-4xl mx-auto p-8 lg:p-12">
                        {error && <div className="text-error bg-error/10 p-4 rounded-lg border border-error/20 mb-6">{error}</div>}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h1 className="text-4xl font-bold text-text-content-primary">{selectedProject.title}</h1>
                            <span className={`px-3 py-1 text-sm font-bold rounded-full shrink-0 ${getDifficultyClass(selectedProject.difficulty)}`}>
                                {selectedProject.difficulty}
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6 border-b border-border-content pb-6">
                            {selectedProject.tags.map(tag => (
                                <span key={tag} className="bg-bg-tertiary/50 text-text-content-secondary text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        {projectGuide && <MarkdownRenderer content={projectGuide} />}

                        {projectGuide && (
                             <div className="mt-12 pt-8 border-t-4 border-accent-primary rounded-lg bg-bg-secondary text-text-primary shadow-2xl">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-text-primary mb-2">Submit Your Project for Feedback</h3>
                                    <p className="text-text-secondary mb-4">Paste your final, complete code in the text area below to get a comprehensive review and score from our AI instructor.</p>
                                    
                                    <div className="bg-bg-primary rounded-md border border-border-primary">
                                    <textarea
                                        value={submissionCode}
                                        onChange={(e) => setSubmissionCode(e.target.value)}
                                        placeholder={`Paste your final ${selectedLanguage} project code here...`}
                                        className="w-full h-80 bg-transparent text-text-primary p-4 font-mono text-sm border-0 focus:ring-1 focus:ring-accent-primary rounded-md resize-y"
                                        spellCheck="false"
                                        aria-label="Project Code Submission"
                                    />
                                    </div>

                                    <div className="flex items-center gap-4 mt-4">
                                        <button
                                            onClick={handleSubmitForFeedback}
                                            disabled={isSubmitting || !submissionCode.trim()}
                                            className="px-4 py-2 bg-accent-primary text-text-on-accent font-semibold rounded-md hover:bg-accent-primary-hover disabled:bg-bg-tertiary disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'Analyzing...' : 'Submit for Feedback'}
                                        </button>
                                        <button onClick={() => { setSubmissionCode(''); setFeedback(null); if (selectedProject) setCachedProjectFeedback(selectedProject.id, null!)}} className="px-4 py-2 bg-bg-tertiary text-text-secondary font-semibold rounded-md hover:opacity-80 transition-colors">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                                
                                {isSubmitting || feedback ? (
                                    <div className="bg-black/20 p-6 rounded-b-lg border-t border-border-primary">
                                        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">AI Feedback</h4>
                                        {isSubmitting && (
                                            <div className="flex items-center justify-center h-48">
                                                <div className="text-center">
                                                    <svg className="animate-spin h-8 w-8 text-accent-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <p className="mt-3 text-text-secondary">Reviewing your project submission...</p>
                                                </div>
                                            </div>
                                        )}
                                        {feedback && <FeedbackDisplay feedback={feedback} language={selectedLanguage} />}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProjectViewer;
