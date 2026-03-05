import React, { useContext } from 'react';
import { LoginPage } from './pages/auth/LoginPage';
import { ThemeContext } from './components/ThemeProvider';

const App: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen bg-surface transition-colors duration-300">
            <header className="p-4 border-b border-border flex flex-col justify-between items-center max-w-4xl mx-auto absolute right-4 top-4 border-none bg-transparent shadow-none w-fit z-50">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 border border-border-active rounded-theme-sm text-text-primary hover:bg-surface-raised transition-colors flex items-center gap-2"
                >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </header>

            <main className="">
                <LoginPage />
            </main>
        </div>
    );
};

export default App;
