import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        // Initialise from localStorage or system preference
        () => {
            const stored = localStorage.getItem('theme');
            if (stored === 'dark' || stored === 'light') return stored as 'dark' | 'light';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
    );

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // Apply data-theme attribute and persist selection
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
