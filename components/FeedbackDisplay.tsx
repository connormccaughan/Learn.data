
import React, { useState } from 'react';
import { AIFeedback, Language } from '../types';
import { CheckIcon, LightBulbIcon } from './IconComponents';

const CodeBlock: React.FC<{ language: string; code: string; }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-bg-primary text-text-primary rounded-lg my-4 relative border border-border-primary">
      <div className="flex justify-between items-center px-4 py-2 bg-bg-tertiary/50 rounded-t-lg">
        <span className="text-sm font-sans text-text-secondary">{language || 'code'}</span>
        <button onClick={handleCopy} className="text-sm font-sans text-text-secondary hover:text-text-primary transition-colors flex items-center">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm"><code className={`language-${language}`}>{code}</code></pre>
    </div>
  );
};

export const FeedbackDisplay: React.FC<{ feedback: AIFeedback, language: Language }> = ({ feedback, language }) => {
    const scoreColor = feedback.score >= 80 ? 'text-text-success' : feedback.score >= 50 ? 'text-text-warning' : 'text-text-error';
    return (
        <div className="space-y-8 mt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center bg-bg-primary/50 p-6 rounded-lg border border-border-primary">
                <div className="flex-shrink-0 text-center">
                     <p className="text-sm font-semibold text-text-secondary">SCORE</p>
                     <p className={`text-6xl font-bold ${scoreColor}`}>{feedback.score}</p>
                     <p className="text-sm text-text-tertiary">/ 100</p>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">General Assessment</h4>
                    <p className="text-text-secondary leading-relaxed">{feedback.generalAssessment}</p>
                </div>
            </div>
            {feedback.strengths.length > 0 && (
                <div>
                    <h4 className="text-lg font-bold text-text-primary mb-3">Strengths</h4>
                    <ul className="space-y-2">
                        {feedback.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3 bg-bg-secondary/50 p-3 rounded-md">
                                <CheckIcon className="w-5 h-5 text-text-success mt-0.5 flex-shrink-0" />
                                <span className="text-text-secondary">{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {feedback.issuesAndSuggestions.length > 0 && (
                 <div>
                    <h4 className="text-lg font-bold text-text-primary mb-3">Areas for Improvement</h4>
                    <div className="space-y-4">
                        {feedback.issuesAndSuggestions.map((item, index) => (
                            <div key={index} className="bg-bg-secondary/50 p-4 rounded-md border-l-4 border-warning">
                                <p className="font-semibold text-text-primary mb-1">{item.issue}</p>
                                <div className="flex items-start gap-2 text-warning">
                                    <LightBulbIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <p className="flex-grow"><span className="font-semibold">Suggestion:</span> {item.suggestion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {feedback.optimizedCode && feedback.optimizedCode.trim() !== '' && !feedback.optimizedCode.includes("Could not generate") && (
                 <div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">Optimized Code</h4>
                    <p className="text-sm text-text-secondary mb-3">Here's a version of your code with the suggestions applied, for your reference.</p>
                    <CodeBlock language={language} code={feedback.optimizedCode} />
                </div>
            )}
        </div>
    )
}
