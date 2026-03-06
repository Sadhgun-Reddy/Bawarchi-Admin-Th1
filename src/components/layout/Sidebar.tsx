import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { NavGroupType, NavItemType } from '../../types/navigation';
import { ThemeContext } from '../ThemeProvider';

interface SidebarProps {
    groups: NavGroupType[];
    isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ groups, isCollapsed }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`h-screen flex flex-col overflow-hidden z-20 ${isDark ? 'glass-panel neon-border-r' : 'sharp-corners border-r border-black bg-white'
                }`}
        >
            {/* Brand Header */}
            <div className={`h-16 shrink-0 flex items-center justify-center border-b ${isDark ? 'border-white/10' : 'border-black'}`}>
                {isCollapsed ? (
                    <span className="material-symbols-outlined font-bold text-2xl text-primary">rocket_launch</span>
                ) : (
                    <h1 className="font-bold text-lg tracking-widest uppercase truncate px-4 w-full">
                        {isDark ? 'Mission Control' : 'Sys Console'}
                    </h1>
                )}
            </div>

            {/* Navigation Scroll Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
                {groups.map((group) => (
                    <div key={group.id} className="mb-6">
                        {!isCollapsed && (
                            <h2 className={`px-6 mb-2 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                {group.title}
                            </h2>
                        )}
                        <ul className="space-y-1">
                            {group.items.map((item) => (
                                <NavItemComponent key={item.id} item={item} isCollapsed={isCollapsed} isDark={isDark} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer Area */}
            <div className={`p-4 shrink-0 border-t ${isDark ? 'border-white/10' : 'border-black'} flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {/* Server Status Indicator */}
                <div className="flex items-center gap-2" title="System Online">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 bg-success ${isDark ? '' : 'sharp-corners'}`}></span>
                    </span>
                    {!isCollapsed && <span className="text-xs tracking-widest uppercase font-semibold text-text-primary">System Online</span>}
                </div>
            </div>
        </motion.aside>
    );
};

// Subcomponent for NavItem
const NavItemComponent: React.FC<{ item: NavItemType, isCollapsed: boolean, isDark: boolean }> = ({ item, isCollapsed, isDark }) => {
    return (
        <li>
            <NavLink
                to={item.path}
                title={item.label}
                className={({ isActive }) => `relative flex items-center py-2.5 px-6 transition-colors duration-200 group ${isDark ? (isActive ? 'text-primary bg-primary/10 shadow-glow' : 'text-text-secondary hover:bg-white/5 hover:text-white')
                    : (isActive ? 'bg-black text-white sharp-corners' : 'text-black hover:bg-gray-100 sharp-corners')
                    }`}
            >
                {({ isActive }) => (
                    <>
                        {/* Active state indicator line */}
                        {isActive && (
                            <motion.div
                                layoutId="activeNavIndicator"
                                className={`absolute left-0 top-0 bottom-0 w-[4px] ${isDark ? 'bg-primary shadow-[0_0_10px_var(--color-primary)]' : 'bg-black'}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}

                        <span className={`material-symbols-outlined text-[20px] ${isCollapsed ? 'mx-auto' : 'mr-4'}`}>
                            {item.icon}
                        </span>

                        {!isCollapsed && (
                            <span className="text-sm tracking-wide uppercase font-medium truncate flex-1">
                                {item.label}
                            </span>
                        )}

                        {/* Badge Rendering */}
                        {!isCollapsed && item.badge && (
                            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 ${isDark ? 'bg-primary/20 text-primary rounded-sm' : 'bg-black text-white sharp-corners'
                                }`}>
                                {item.badge.text}
                            </span>
                        )}
                    </>
                )}
            </NavLink>
        </li>
    );
};
