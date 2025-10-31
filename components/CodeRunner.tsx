import React, { useState, useEffect, useRef } from 'react';
import { Assignment, AIFeedback, Language } from '../types';
import { checkCodeSubmission, debugCode } from '../services/geminiService';
import { WebR } from 'webr';
import { FeedbackDisplay } from './FeedbackDisplay';
import MarkdownRenderer from './MarkdownRenderer';
import { WrenchScrewdriverIcon, XMarkIcon } from './IconComponents';

declare global {
  interface Window {
    pyodide: any;
    loadPyodide: (config: any) => Promise<any>;
    initSqlJs: (config: any) => Promise<any>;
  }
}

type OutputItem = { type: 'table'; content: { columns: string[]; values: any[][] } } | { type: 'console'; content: string } | { type: 'error'; content: string } | { type: 'plot'; content: string };

const DebuggerModal: React.FC<{ code: string; error: string; assignment: Assignment; onClose: () => void }> = ({ code, error, assignment, onClose }) => {
    const [debugHelp, setDebugHelp] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getHelp = async () => {
            setIsLoading(true);
            const result = await debugCode(code, error, assignment.problemDescription);
            setDebugHelp(result);
            setIsLoading(false);
        };
        getHelp();
    }, [code, error, assignment]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-bg-secondary text-text-primary w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-border-primary flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <WrenchScrewdriverIcon className="w-6 h-6 text-accent-primary" />
                        <h2 className="text-xl font-bold">Genie Debugger</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-bg-tertiary">
                         <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-48"><svg className="animate-spin h-8 w-8 text-accent-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
                    ) : (
                        <MarkdownRenderer content={debugHelp} />
                    )}
                </div>
            </div>
        </div>
    );
};

const imageBitmapToDataURL = (bitmap: ImageBitmap): string => {
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(bitmap, 0, 0);
    return canvas.toDataURL();
};

const CodeRunner: React.FC<{ assignment: Assignment, language: Language }> = ({ assignment, language }) => {
  const [code, setCode] = useState(assignment.starterCode);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [output, setOutput] = useState<OutputItem[] | null>(null);
  const [showDebugger, setShowDebugger] = useState<boolean>(false);
  
  const pyodideRef = useRef<any>(null);
  const webRRef = useRef<any>(null);
  const sqlJSRef = useRef<any>(null);

  useEffect(() => {
    const initializeRuntimes = async () => {
        try {
            if (!pyodideRef.current) pyodideRef.current = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/" });
            if (!webRRef.current) {
                webRRef.current = new WebR();
                await webRRef.current.init();
            }
            if (!sqlJSRef.current) sqlJSRef.current = await window.initSqlJs({ locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/${file}` });
        } catch (error) {
            console.error("Failed to initialize runtimes:", error);
            setOutput([{ type: 'error', content: `Failed to initialize runtime environment. Please refresh. Error: ${error}` }]);
        } finally {
            setIsInitializing(false);
        }
    };
    initializeRuntimes();
  }, []);
  
  useEffect(() => {
    setCode(assignment.starterCode);
    setFeedback(null);
    setOutput(null);
  }, [assignment]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
        switch (language) {
            case 'python': {
                const pyodide = pyodideRef.current;
                
                const setup_code = `
                    import matplotlib
                    matplotlib.use('agg')
                    import matplotlib.pyplot as plt
                    import io
                    import base64
                    plots = []
                    def custom_show():
                        buf = io.BytesIO()
                        plt.savefig(buf, format='png')
                        buf.seek(0)
                        plots.append(base64.b64encode(buf.read()).decode('utf-8'))
                        plt.clf()
                    plt.show = custom_show
                `;
                
                await pyodide.runPythonAsync(setup_code);
                
                let capturedOutput = '';
                pyodide.setStdout({ batched: (msg: string) => capturedOutput += msg + '\n' });
                pyodide.setStderr({ batched: (msg: string) => capturedOutput += msg + '\n' });
                
                await pyodide.loadPackage(['micropip', 'pandas', 'numpy', 'scikit-learn', 'matplotlib']);
                
                const result = await pyodide.runPythonAsync(code);
                if (result !== undefined) {
                    capturedOutput += result.toString();
                }

                const capturedPlots = pyodide.globals.get('plots').toJs();
                
                const outputs: OutputItem[] = [];
                if (capturedOutput.trim()) {
                    outputs.push({ type: 'console', content: capturedOutput.trim() });
                }
                capturedPlots.forEach((plotData: string) => {
                    outputs.push({ type: 'plot', content: `data:image/png;base64,${plotData}` });
                });

                if (outputs.length === 0) {
                    setOutput([{ type: 'console', content: 'Code executed without output.' }]);
                } else {
                    setOutput(outputs);
                }
                break;
            }
            case 'sql': {
                const SQL = sqlJSRef.current;
                const db = new SQL.Database();
                if (assignment.databaseSetup) {
                    db.run(assignment.databaseSetup);
                }
                const results = db.exec(code);
                if (results.length > 0) {
                    setOutput([{ type: 'table', content: results[0] }]);
                } else {
                    setOutput([{ type: 'console', content: 'Query executed successfully, but returned no results.' }]);
                }
                db.close();
                break;
            }
            case 'r': {
                const webR = webRRef.current;
                const shelter = await new webR.Shelter();
                const outputs: OutputItem[] = [];
                try {
                    if (assignment.dataSetup) {
                        await shelter.evalR(assignment.dataSetup);
                    }
                    
                    const wrappedCode = `
                        webr::canvas(width=600, height=400)
                        capture.output({
                            ${code}
                        })
                    `;
                    const result = await shelter.evalR(wrappedCode, { withMessageHandler: true });
                    
                    for (const msg of result.msgs) {
                        if (msg.type === 'canvas' && msg.data.event === 'draw') {
                            const dataURL = imageBitmapToDataURL(msg.data.image);
                            if (dataURL) {
                                outputs.push({ type: 'plot', content: dataURL });
                            }
                        }
                    }

                    const capturedOutput = await result.output.toJs();
                    if (capturedOutput && capturedOutput.values && capturedOutput.values.length > 0) {
                       const consoleText = capturedOutput.values.join('\n').trim();
                       if (consoleText) {
                           outputs.push({ type: 'console', content: consoleText });
                       }
                    }

                    if (outputs.length === 0) {
                        outputs.push({ type: 'console', content: 'Code executed without output.' });
                    }
                    setOutput(outputs);
                } finally {
                    await shelter.purge();
                }
                break;
            }
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setOutput([{ type: 'error', content: errorMessage }]);
    } finally {
        setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const languageDisplay = language === 'python' ? 'Python' : language === 'r' ? 'R' : language === 'sql' ? 'SQL' : 'Scala';
      const result = await checkCodeSubmission(assignment, code, languageDisplay);
      setFeedback(result);
    } catch (err) {
      console.error("Submission failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setFeedback({
        score: 0,
        generalAssessment: "Failed to submit code for review.",
        strengths: [],
        issuesAndSuggestions: [{ issue: "Submission Error", suggestion: `Please try again. Details: ${errorMessage}` }],
        optimizedCode: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(assignment.starterCode);
    setFeedback(null);
    setOutput(null);
  };

  const handleShowSolution = () => {
    setCode(assignment.solution);
    setFeedback(null);
    setOutput(null);
  };

  const renderOutput = () => {
    if (language === 'scala') {
        return <p className="text-text-tertiary text-sm">Interactive code execution for Scala is not yet supported. You can still submit your code for AI feedback.</p>;
    }
    if (!output) return <p className="text-text-tertiary text-sm">Run your code to see the output here.</p>;
    
    return (
        <div className="space-y-4">
            {output.map((out, index) => {
                switch (out.type) {
                    case 'error': return (
                        <div key={index}>
                             <pre className="text-error text-sm whitespace-pre-wrap">{out.content}</pre>
                             <button 
                                onClick={() => setShowDebugger(true)}
                                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-text-on-accent bg-accent-primary rounded-md shadow-sm hover:bg-accent-primary-hover transition-colors"
                            >
                                <WrenchScrewdriverIcon className="w-4 h-4" />
                                Ask Genie for Help
                             </button>
                             {showDebugger && <DebuggerModal code={code} error={out.content} assignment={assignment} onClose={() => setShowDebugger(false)} />}
                        </div>
                    );
                    case 'console': return <pre key={index} className="text-text-primary text-sm whitespace-pre-wrap">{out.content}</pre>;
                    case 'table': return (
                        <div key={index} className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-text-secondary">
                                <thead className="text-xs text-text-secondary uppercase bg-bg-tertiary">
                                    <tr>{out.content.columns.map(col => <th key={col} className="px-4 py-2 font-semibold">{col}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {out.content.values.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="bg-bg-secondary border-b border-border-primary hover:bg-bg-tertiary/50">
                                            {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-2">{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                    case 'plot': return (
                         <div key={index} className="bg-white p-2 rounded-md inline-block">
                            <img src={out.content} alt="Generated plot from R code" className="max-w-full h-auto" />
                         </div>
                    );
                    default: return null;
                }
            })}
        </div>
    );
  };
  
  if (isInitializing) {
    return (
        <div className="flex flex-col items-center justify-center h-96 bg-bg-secondary text-text-primary rounded-lg">
            <svg className="animate-spin h-8 w-8 text-accent-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="mt-4 text-text-secondary">Preparing interactive environment...</p>
        </div>
    );
  }

  return (
    <div className="mt-12 border-t-4 border-accent-primary rounded-lg bg-bg-secondary text-text-primary shadow-2xl font-sans">
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">Coding Assignment</h3>
        <p className="text-text-secondary mb-4 prose prose-invert max-w-none">{assignment.problemDescription}</p>
        
        <div className="bg-bg-primary rounded-md border border-border-primary">
           <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-transparent text-text-primary p-4 font-mono text-sm border-0 focus:ring-1 focus:ring-accent-primary rounded-md resize-y"
            spellCheck="false"
            aria-label="Code Editor"
           />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting || language === 'scala'}
            className="px-4 py-2 bg-success text-white font-semibold rounded-md hover:bg-opacity-90 disabled:bg-bg-tertiary disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isRunning}
            className="px-4 py-2 bg-accent-primary text-text-on-accent font-semibold rounded-md hover:bg-accent-primary-hover disabled:bg-bg-tertiary disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Analyzing...' : 'Submit for Review'}
          </button>
          <div className="flex-grow"></div>
          <button onClick={handleReset} className="px-4 py-2 bg-bg-tertiary text-text-secondary font-semibold rounded-md hover:opacity-80 transition-colors">Reset</button>
          <button onClick={handleShowSolution} className="px-4 py-2 text-accent-primary font-semibold hover:bg-bg-tertiary rounded-md transition-colors">View Solution</button>
        </div>
      </div>
      
      <div className="bg-bg-primary/50 p-6 border-t border-border-primary min-h-[10rem]">
        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Output / Results</h4>
        {isRunning ? (
             <div className="flex items-center justify-center h-24"><div className="text-text-secondary">Executing code...</div></div>
        ) : renderOutput()}
      </div>

      <div className="bg-black/20 p-6 rounded-b-lg border-t border-border-primary">
        <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">AI Feedback</h4>
        {isSubmitting && (
            <div className="flex items-center justify-center h-48">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-accent-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-3 text-text-secondary">Getting feedback from your AI instructor...</p>
                </div>
            </div>
        )}
        {!isSubmitting && !feedback && (
             <div className="flex items-center justify-center h-48">
                 <p className="text-text-tertiary">Submit your code to receive feedback.</p>
             </div>
        )}
        {feedback && <FeedbackDisplay feedback={feedback} language={language} />}
      </div>
    </div>
  );
};

export default CodeRunner;