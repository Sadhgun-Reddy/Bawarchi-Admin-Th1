import React from 'react';
import { motion } from 'framer-motion';
import { ApprovalsTab } from './types';

interface LifecycleTabsProps {
    activeTab: ApprovalsTab;
    onTabChange: (tab: ApprovalsTab) => void;
    counts: Record<ApprovalsTab, number>;
    isDark: boolean;
}

const TABS: Array<{ id: ApprovalsTab; label: string }> = [
    { id: 'ALL', label: 'All' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'ONBOARDED', label: 'Onboarded' },
    { id: 'REJECTED', label: 'Rejected' }
];

export const LifecycleTabs: React.FC<LifecycleTabsProps> = ({
    activeTab,
    onTabChange,
    counts,
    isDark
}) => {
    return (
        <div className={`flex items-center gap-6 w-full ${isDark ? 'border-b border-white/10' : 'border-b border-gray-300'}`}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative py-3 flex items-center gap-2 text-sm font-medium transition-colors outline-none
                            ${isActive
                                ? (isDark ? 'text-[#a413ec]' : 'text-[#7f0df2]')
                                : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
                            }
                        `}
                        style={{ fontFamily: isActive && isDark ? undefined : '"Space Grotesk", sans-serif' }}
                    >
                        <span>{tab.label}</span>
                        {/* Count Badge */}
                        <div className={`px-2 py-0.5 text-xs font-bold font-mono transition-all duration-300
                            ${isDark
                                ? isActive
                                    ? 'bg-[#ff5e00]/10 text-[#ff5e00] shadow-[0_0_8px_#ff5e00] rounded-full'
                                    : 'bg-white/5 text-gray-400 rounded-full'
                                : isActive
                                    ? 'bg-[#7f0df2] text-white sharp-corners'
                                    : 'bg-gray-200 text-gray-600 sharp-corners'
                            }
                        `}>
                            {counts[tab.id]}
                        </div>

                        {/* Animated Underline */}
                        {isActive && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className={`absolute left-0 right-0 bottom-0 
                                    ${isDark
                                        ? 'h-[2px] bg-[#a413ec] shadow-[0_0_10px_#a413ec]'
                                        : 'h-[3px] bg-black'
                                    }
                                `}
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}

                        {/* Subtle Background Wash for Dark Mode */}
                        {isActive && isDark && (
                            <motion.div
                                layoutId="activeTabWash"
                                className="absolute inset-x-0 bottom-0 h-full bg-[#a413ec]/5 -z-10 rounded-t-sm"
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
