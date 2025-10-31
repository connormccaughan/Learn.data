import React from 'react';
import { THEMES } from '../themes';
import { useAppContext } from '../App';

interface ThemePanelProps {
  onClose: () => void;
}

const ThemeSwatch: React.FC<{ theme: typeof THEMES[0]; onClick: () => void; isSelected: boolean }> = ({ theme, onClick, isSelected }) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full text-left p-3 rounded-lg transition-all ${isSelected ? 'ring-2 ring-accent-primary shadow-lg' : 'hover:bg-bg-tertiary'}`}
        >
            <div className="flex items-center gap-3">
                <div className="grid grid-cols-2 grid-rows-2 w-10 h-10 rounded-md overflow-hidden shrink-0">
                    <div style={{ backgroundColor: theme.colors['--bg-secondary'] }}></div>
                    <div style={{ backgroundColor: theme.colors['--bg-accent-primary'] }}></div>
                    <div style={{ backgroundColor: theme.colors['--text-primary'] }}></div>
                    <div style={{ backgroundColor: theme.colors['--bg-content'] }}></div>
                </div>
                <div>
                    <p className="font-semibold text-text-primary text-sm">{theme.name}</p>
                </div>
            </div>
        </button>
    );
}

const ThemePanel: React.FC<ThemePanelProps> = ({ onClose }) => {
    const { currentTheme, setCurrentTheme } = useAppContext();
    return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-bg-primary text-text-primary w-full max-w-sm h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-border-primary flex justify-between items-center">
          <h2 className="text-xl font-bold">Select a Theme</h2>
          <button onClick={onClose} className="px-3 py-1 rounded-md hover:bg-bg-tertiary">&times;</button>
        </header>
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {THEMES.map(theme => (
                <ThemeSwatch
                    key={theme.name}
                    theme={theme}
                    isSelected={currentTheme.name === theme.name}
                    onClick={() => setCurrentTheme(theme)}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
