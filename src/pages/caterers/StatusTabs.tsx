import React from 'react';
import { motion } from 'framer-motion';
import { CatererStatus } from './types';

interface StatusTabsProps {
    activeTab: CatererStatus | 'ALL';
    onTabChange: (tab: CatererStatus | 'ALL') => void;
    counts: Record<string, number>;
    isDark: boolean;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({ activeTab, onTabChange, counts, isDark }) => {

    const tabs: { id: CatererStatus | 'ALL', label: string }[] = [
        { id: 'ALL', label: 'All Caterers' },
        { id: 'ACTIVE', label: 'Active Roster' },
        { id: 'PENDING', label: 'Pending Requests' },
        { id: 'REJECTED', label: 'Rejected' },
        { id: 'ARCHIVED', label: 'Archived' }
    ];

    return (
        <div className={`flex items-center gap-1 border-b overflow-x-auto no-scrollbar
            ${isDark ? 'border-primary/20' : 'border-gray-300'}
        `}>
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2
                            ${isActive
                                ? isDark ? 'text-primary' : 'text-[#7d11d4]'
                                : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                            }
                        `}
                    >
                        <span>{tab.label}</span>
                        <span className={`px-1.5 py-0.5 text-xs font-mono rounded-sm transition-colors
                            ${isActive
                                ? isDark ? 'bg-primary/20 text-primary' : 'bg-[#7d11d4]/10 text-[#7d11d4]'
                                : isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-500'
                            }
                        `}>
                            {counts[tab.id]}
                        </span>

                        {isActive && (
                            <motion.div
                                layoutId="activeTabIndicatorCaterer"
                                className={`absolute bottom-0 left-0 right-0
                                    ${isDark
                                        ? 'h-[2px] bg-primary shadow-[0_0_10px_var(--color-primary)]'
                                        : 'h-[3px] bg-[#7d11d4]'
                                    }
                                `}
                            />
                        )}
                        {isActive && isDark && (
                            <motion.div
                                layoutId="activeTabGradientCaterer"
                                className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
