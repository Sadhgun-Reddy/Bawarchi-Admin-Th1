import React from 'react';
import { motion } from 'framer-motion';
import { ModerationStatus } from './types';

interface ModerationTabsProps {
    activeTab: ModerationStatus | 'HISTORY';
    onTabChange: (tab: ModerationStatus | 'HISTORY') => void;
    counts: {
        pending: number;
        flagged: number;
    };
    isDark: boolean;
}

const TABS: Array<{ id: ModerationStatus | 'HISTORY'; label: string; countKey?: 'pending' | 'flagged' }> = [
    { id: 'PENDING', label: 'Pending Queue', countKey: 'pending' },
    { id: 'FLAGGED', label: 'Flagged Items', countKey: 'flagged' },
    { id: 'HISTORY', label: 'Review History' }
];

export const ModerationTabs: React.FC<ModerationTabsProps> = ({ activeTab, onTabChange, counts, isDark }) => {
    return (
        <div className={`flex flex-wrap items-center gap-4 md:gap-8 w-full ${isDark ? 'border-b border-white/10' : 'border-b border-slate-300'}`}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const count = tab.countKey ? counts[tab.countKey] : null;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative py-3 md:py-4 flex items-center gap-2 text-sm md:text-base font-medium transition-colors outline-none
              ${isActive
                                ? (isDark ? 'text-white' : 'text-slate-900 font-bold')
                                : (isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                            }
            `}
                    >
                        <span style={{ fontFamily: isActive && !isDark ? undefined : '"Space Grotesk", sans-serif' }}>
                            {tab.label}
                        </span>

                        {/* Notification Badge */}
                        {count !== null && count > 0 && (
                            <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-mono font-bold rounded-full
                ${isActive
                                    ? (isDark ? 'bg-[#ff5e00] text-white shadow-[0_0_10px_#ff5e00]' : `bg-[#8c2bee] text-white`)
                                    : (isDark ? 'bg-white/10 text-gray-300' : 'bg-slate-200 text-slate-600')
                                }
              `}>
                                {count}
                            </span>
                        )}

                        {/* Animated Active Indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="moderationTabUnderline"
                                className={`absolute left-0 right-0 bottom-0 z-10 
                  ${isDark
                                        ? 'h-[2px] bg-[#d006f9] shadow-[0_0_10px_#d006f9]'
                                        : 'h-[3px] bg-slate-900'
                                    }
                `}
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
