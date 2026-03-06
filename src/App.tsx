import React, { useContext, useState } from 'react';
import { useRoutes, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { ThemeContext } from './components/ThemeProvider';
import { routes } from './routes';

const App: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for easy testing

    // Process our route dictionary mapping
    const routing = useRoutes(routes);

    // Floating Dev Tools/Theme Toggle Always Visible globally
    const floatingControls = (
        <header className="absolute right-4 top-4 border-none bg-transparent shadow-none w-fit z-50 pointer-events-auto">
            <button
                onClick={toggleTheme}
                className={`px-4 py-2 border rounded-theme-sm transition-colors flex items-center gap-2 ${theme === 'dark'
                    ? 'border-gray-700 text-gray-300 hover:bg-white/10'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white shadow-sm'
                    }`}
            >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
        </header>
    );

    // If not logged in, enforce the login layout
    if (!isAuthenticated) {
        return (
            <div className="relative min-h-screen pointer-events-none">
                {floatingControls}
                <div className="pointer-events-auto h-full">
                    <Routes>
                        <Route path="/login" element={
                            <LoginPage onLoginSuccess={(token) => {
                                console.log('Logged in with token:', token);
                                setIsAuthenticated(true);
                            }} />
                        } />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </div>
        );
    }

    // Authenticated user gets passed directly into the useRoutes layout
    return (
        <div className="relative min-h-screen overflow-hidden">
            {routing}
        </div>
    );
};

export default App;
