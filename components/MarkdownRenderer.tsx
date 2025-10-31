import React, { useState } from 'react';
import { LightBulbIcon } from './IconComponents';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg-secondary text-text-primary rounded-lg my-4 relative">
      <div className="flex justify-between items-center px-4 py-2 bg-bg-tertiary/50 rounded-t-lg">
        <span className="text-sm font-sans text-text-secondary">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="text-sm font-sans text-text-secondary hover:text-text-primary transition-colors flex items-center"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

const ParagraphWrapper: React.FC<{ text: string; onExplain: (text: string) => void; }> = ({ text, onExplain }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Don't add the explain feature to very short paragraphs
    if (text.length < 100) {
        return <p className="my-4 leading-relaxed">{parseInline(text)}</p>;
    }

    return (
        <div 
            className="relative my-4 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p className="leading-relaxed">{parseInline(text)}</p>
            <button
                onClick={() => onExplain(text)}
                title="Explain it simply"
                className={`absolute top-0 right-0 p-1.5 bg-bg-accent-primary/10 text-accent-primary rounded-full transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100`}
                aria-label="Explain this paragraph simply"
            >
                <LightBulbIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

const parseMarkdown = (text: string, onExplain: (text: string) => void): React.ReactNode[] => {
    if (!text) return [];
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('```')) {
            const lang = line.substring(3).trim();
            let code = '';
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                code += lines[i] + '\n';
                i++;
            }
            elements.push(<CodeBlock key={`code-${i}`} language={lang} code={code.trim()} />);
            i++; // Skip closing ```
        } else if (line.startsWith('# ')) {
            elements.push(<h1 key={i} className="text-4xl font-bold mt-8 mb-4 pb-2 border-b border-border-content">{parseInline(line.substring(2))}</h1>);
            i++;
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={i} className="text-3xl font-bold mt-6 mb-3 pb-2 border-b border-border-content">{parseInline(line.substring(3))}</h2>);
            i++;
        } else if (line.startsWith('### ')) {
            elements.push(<h3 key={i} className="text-2xl font-bold mt-4 mb-2">{parseInline(line.substring(4))}</h3>);
            i++;
        } else if (line.match(/^(\s*)(-|\*)\s/)) {
            const listItems = [];
            while (i < lines.length && lines[i].match(/^(\s*)(-|\*)\s/)) {
                listItems.push(lines[i].replace(/^(\s*)(-|\*)\s/, ''));
                i++;
            }
            elements.push(
                <ul className="list-disc list-inside space-y-2 my-4 pl-4" key={`list-${i}`}>
                    {listItems.map((item, index) => (
                        <li key={index}>{parseInline(item)}</li>
                    ))}
                </ul>
            );
        } else if (line.trim() !== '') {
            const pLines = [];
            while (i < lines.length && lines[i].trim() !== '') {
                pLines.push(lines[i]);
                i++;
            }
            elements.push(<ParagraphWrapper text={pLines.join(' ')} onExplain={onExplain} key={`p-${i}`} />);
        } else {
            i++; // Skip empty lines
        }
    }

    return elements;
};

const parseInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index} className="bg-border-content text-text-content-primary rounded px-1.5 py-0.5 font-mono text-sm">{part.slice(1, -1)}</code>;
        }
        return part;
    });
};

const MarkdownRenderer: React.FC<{ content: string; onExplain?: (text: string) => void; }> = ({ content, onExplain }) => {
  const handleExplain = onExplain || (() => {});
  return <div className="prose max-w-none">{parseMarkdown(content, handleExplain)}</div>;
};

export default MarkdownRenderer;