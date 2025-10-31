import React, { useState, useEffect, useRef, FormEvent, useMemo } from 'react';
import { Chat } from '@google/genai';
import { useAppContext } from '../App';
import { ChatMessage } from '../types';
import { ai } from '../services/geminiService';
import { SparklesIcon, XMarkIcon, PaperAirplaneIcon } from './IconComponents';
import MarkdownRenderer from './MarkdownRenderer';


const Message: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex ${isModel ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-prose p-3 rounded-lg ${isModel ? 'bg-bg-primary text-text-primary' : 'bg-accent-primary text-text-on-accent'}`}>
                {isModel ? <MarkdownRenderer content={message.content} /> : <p>{message.content}</p>}
            </div>
        </div>
    );
};

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { viewMode, selectedLanguage, selectedCourse, selectedModule, selectedClass, selectedLesson, selectedProject } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const systemInstruction = useMemo(() => {
        let instruction = "You are 'Genie', an expert AI tutor for the 'Learn.data' platform. Your tone must be encouraging, helpful, and professional. Provide clear, concise explanations and well-annotated code examples when asked. Use Markdown for formatting.";

        const languageDisplay = selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
        let context = `The user is working with ${languageDisplay}. `;

        if (viewMode === 'courses' && selectedCourse) {
            context += `They are in the '${selectedCourse.title}' course.`;
            if (selectedModule) {
                context += ` They are in the module '${selectedModule.title}'.`;
            }
            if (selectedClass && selectedLesson) {
                context += ` They are viewing the lesson '${selectedLesson.title}' from the class '${selectedClass.title}'.`;
            }
        } else if (viewMode === 'projects' && selectedProject) {
            context += `They are looking at the project '${selectedProject.title}'. This is a ${selectedProject.difficulty}-level project.`;
        }
        
        instruction += `\n\nCURRENT CONTEXT: ${context} Tailor your answers to this context if relevant, but the user may ask about other topics.`;

        return instruction;
    }, [viewMode, selectedLanguage, selectedCourse, selectedModule, selectedClass, selectedLesson, selectedProject]);
    
    useEffect(() => {
        // Initialize or re-initialize chat session when context changes
        chatSessionRef.current = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction: systemInstruction,
            },
        });
        setMessages([
            { role: 'model', content: "Hello there! It's great to see you.\n\nHow can I help you with your data science journey today? Whether you have a question about a concept, a course, or a project, I'm here to guide you." }
        ]);
        setError(null);
    }, [systemInstruction]);

    useEffect(() => {
        // Scroll to the bottom of the messages list
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatSessionRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatSessionRef.current.sendMessageStream({ message: userMessage.content });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelResponse;
                    return newMessages;
                });
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(`Sorry, I couldn't get a response. Please try again. Error: ${errorMessage}`);
            // Remove the empty model message on error
            setMessages(prev => prev.filter(msg => msg.role !== 'model' || msg.content !== ''));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
            <div 
                className="bg-bg-secondary text-text-primary w-full max-w-lg h-full shadow-2xl flex flex-col" 
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-border-primary flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="w-6 h-6 text-accent-primary" />
                        <h2 className="text-xl font-bold">Genie</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-bg-tertiary">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => <Message key={index} message={msg} />)}
                    {isLoading && messages[messages.length - 1]?.role !== 'model' && (
                        <div className="flex justify-start mb-4">
                            <div className="max-w-prose p-3 rounded-lg bg-bg-primary text-text-primary">
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    {error && <div className="text-error bg-error/10 p-3 rounded-lg text-sm">{error}</div>}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t border-border-primary shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            disabled={isLoading}
                            className="w-full bg-bg-primary border border-border-primary rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            aria-label="Chat input"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="bg-accent-primary text-text-on-accent p-3 rounded-lg disabled:bg-bg-tertiary disabled:cursor-not-allowed hover:bg-accent-primary-hover transition-colors"
                            aria-label="Send message"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;