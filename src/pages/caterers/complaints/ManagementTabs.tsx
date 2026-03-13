import React from 'react';
import { motion } from 'framer-motion';

interface ManagementTabsProps {
    activeTab: 'COMPLAINTS' | 'PERFORMANCE' | 'REVIEWS';
    onTabChange: (tab: 'COMPLAINTS' | 'PERFORMANCE' | 'REVIEWS') => void;
    isDark: boolean;
}

const TABS = [
    { id: 'COMPLAINTS', label: 'Complaints' },
    { id: 'PERFORMANCE', label: 'Performance' },
    { id: 'REVIEWS', label: 'Reviews' }
] as const;

export const ManagementTabs: React.FC<ManagementTabsProps> = ({ activeTab, onTabChange, isDark }) => {
    return (
        <div className={`flex items-center gap-6 w-full ${isDark ? 'border-b border-white/10' : 'border-b border-slate-300'}`}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative py-3 flex items-center gap-2 text-sm font-medium transition-colors outline-none
              ${isActive
                                ? (isDark ? 'text-white' : 'text-slate-900 font-bold')
                                : (isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                            }
            `}
                    >
                        <span style={{ fontFamily: isActive && !isDark ? undefined : '"Space Grotesk", sans-serif' }}>
                            {tab.label}
                        </span>

                        {/* Animated Underline */}
                        {isActive && (
                            <motion.div
                                layoutId="managementTabUnderline"
                                className={`absolute left-0 right-0 bottom-0 z-10 
                  ${isDark
                                        ? 'h-[2px] bg-[#8f0df2] shadow-[0_0_10px_#8f0df2]'
                                        : 'h-[2px] bg-slate-900'
                                    }
                `}
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}

                        {/* Subtle Background Wash for Dark Mode */}
                        {isActive && isDark && (
                            <motion.div
                                layoutId="managementTabWash"
                                className="absolute inset-x-0 bottom-0 h-full bg-[#8f0df2]/10 -z-10 rounded-t-sm"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
