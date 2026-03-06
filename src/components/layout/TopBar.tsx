import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../ThemeProvider';

interface TopBarProps {
    onToggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <header
            className={`h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 relative z-10 transition-colors duration-200 ${isDark ? 'glass-panel neon-border-b' : 'sharp-corners border-b border-black bg-white'
                }`}
        >
            {/* Left: Hamburger & Breadcrumb placeholders */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className={`p-2 rounded-sm transition-colors ${isDark ? 'hover:bg-white/10 text-text-primary' : 'hover:bg-gray-200 text-black sharp-corners'}`}
                >
                    <span className="material-symbols-outlined text-[24px]">
                        {isSidebarCollapsed ? 'menu_open' : 'menu'}
                    </span>
                </button>

                {/* Placeholder Breadcrumb - could be dynamic later */}
                <div className={`hidden md:flex items-center text-sm font-medium uppercase tracking-wider ${isDark ? 'text-text-secondary' : 'text-text-muted'}`}>
                    <span>Dashboard</span>
                    <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
                    <span className={`${isDark ? 'text-primary' : 'text-black'}`}>Overview</span>
                </div>
            </div>

            {/* Center/Right: Search, Theme Toggle, Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Animated Search Bar */}
                <div className="relative hidden sm:block">
                    <motion.div
                        className={`flex items-center px-3 py-1.5 transition-colors overflow-hidden ${isDark
                                ? 'bg-black/30 text-white'
                                : 'bg-transparent text-black sharp-corners border border-black'
                            }`}
                        animate={{
                            width: isSearchFocused ? 280 : 200,
                            borderColor: isDark
                                ? (isSearchFocused ? '#8b5cf6' : 'rgba(255,255,255,0.1)')
                                : (isSearchFocused ? '#000000' : '#000000'),
                            borderWidth: isDark ? 1 : (isSearchFocused ? 2 : 1),
                            boxShadow: isDark && isSearchFocused ? '0 0 10px rgba(139,92,246,0.2)' : 'none'
                        }}
                        style={isDark ? { borderStyle: 'solid', borderRadius: '4px' } : {}}
                    >
                        <span className={`material-symbols-outlined text-[18px] mr-2 ${isSearchFocused ? (isDark ? 'text-primary' : 'text-black') : 'text-gray-500'}`}>
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 font-mono"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {/* Command shortcut hint */}
                        <span className={`text-[10px] ml-2 px-1 rounded-sm border ${isDark ? 'border-white/20 text-gray-400 bg-white/5' : 'border-gray-300 text-gray-500 sharp-corners'}`}>
                            ⌘K
                        </span>
                    </motion.div>
                </div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    title="Toggle Theme"
                    className={`p-2 rounded-sm transition-all focus:outline-none flex items-center justify-center ${isDark ? 'text-gray-400 hover:text-primary hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-100 sharp-corners'
                        }`}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {isDark ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                {/* Notifications */}
                <button className={`relative p-2 rounded-sm transition-colors focus:outline-none flex items-center justify-center ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-100 sharp-corners'
                    }`}>
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger border border-surface"></span>
                </button>

                {/* User Profile Block */}
                <div className={`ml-2 flex items-center gap-2 px-2 py-1 cursor-pointer transition-colors ${isDark ? 'hover:bg-white/5 rounded-sm' : 'hover:bg-gray-100 sharp-corners'
                    }`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-gray-300">
                        <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className={`text-xs font-bold leading-tight ${isDark ? 'text-text-primary' : 'text-black'}`}>SYSTEM_ADMIN</span>
                        <span className={`text-[10px] uppercase tracking-wider leading-tight ${isDark ? 'text-primary' : 'text-gray-600 font-bold'}`}>
                            Superuser
                        </span>
                    </div>
                    <span className={`material-symbols-outlined text-[16px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        arrow_drop_down
                    </span>
                </div>

            </div>
        </header>
    );
};
