import React from 'react';
import { OfferStatus } from './types';
import { motion } from 'framer-motion';

interface OffersModerationTabsProps {
    activeTab: OfferStatus;
    onTabChange: (tab: OfferStatus) => void;
    pendingCount: number;
    isDark: boolean;
}

export const OffersModerationTabs: React.FC<OffersModerationTabsProps> = ({
    activeTab, onTabChange, pendingCount, isDark
}) => {
    const tabs: { id: OfferStatus; label: string }[] = [
        { id: 'PENDING', label: 'Pending Offers' },
        { id: 'APPROVED', label: 'Approved History' },
        { id: 'REJECTED', label: 'Rejected Archive' }
    ];

    return (
        <div className={`flex w-full mb-6 relative ${isDark ? 'border-b border-white/10' : 'border-b border-slate-300'}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative px-6 py-4 flex items-center justify-center gap-2 outline-none font-space font-medium tracking-wide transition-colors ${isActive
                                ? (isDark ? 'text-[#7f0df2]' : 'text-slate-900')
                                : (isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                            }`}
                    >
                        {tab.label}

                        {/* Pending Badge Logic */}
                        {tab.id === 'PENDING' && pendingCount > 0 && (
                            <span className={`flex items-center justify-center text-xs font-mono px-2 py-0.5 rounded-full ${isActive
                                    ? (isDark
                                        ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.6)] animate-pulse'
                                        : 'bg-[#8c2bee] text-white')
                                    : (isDark
                                        ? 'bg-white/10 text-gray-300'
                                        : 'bg-slate-200 text-slate-700')
                                }`}>
                                {pendingCount}
                            </span>
                        )}

                        {/* Tab Indicator Animation */}
                        {isActive && (
                            <motion.div
                                layoutId="offers-active-tab-indicator"
                                className={`absolute bottom-[-1px] left-0 right-0 ${isDark
                                        ? 'h-[2px] bg-[#7f0df2] shadow-[0_0_8px_#7f0df2]'
                                        : 'h-[2px] bg-[#140d1b]'
                                    }`}
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
