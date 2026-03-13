import React from 'react';
import { ModerationStats } from './types';
import { motion } from 'framer-motion';

interface OffersModerationHeaderProps {
    stats: ModerationStats;
    isDark: boolean;
}

export const OffersModerationHeader: React.FC<OffersModerationHeaderProps> = ({ stats, isDark }) => {
    return (
        <div className={`w-full flex flex-col gap-4 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {/* Top Row: Breadcrumbs & Metrics */}
            <div className="flex items-start justify-between w-full">

                {/* Breadcrumbs & Title */}
                <div className="flex flex-col gap-1">
                    <div className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                        <span>Moderation</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-slate-700'} font-bold`}>Offers Queue</span>
                    </div>
                    <h1 className="text-2xl font-space font-bold tracking-wide flex items-center gap-3">
                        Promotional Offers
                        {isDark && (
                            <div className="relative flex items-center justify-center w-6 h-6">
                                <span className="material-symbols-outlined text-[20px] text-gray-400">notifications</span>
                                {stats.totalQueueCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
                                )}
                            </div>
                        )}
                        {!isDark && (
                            <div className="relative flex items-center justify-center w-6 h-6">
                                <span className="material-symbols-outlined text-[20px] text-slate-400">notifications</span>
                                {stats.totalQueueCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 sharp-corners bg-[#8c2bee]" />
                                )}
                            </div>
                        )}
                    </h1>
                </div>

                {/* Queue Metrics (Mission Control Exclusive - But applied dynamically based on isDark logic to fit both if needed, or exclusively dark) */}
                {isDark ? (
                    <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-3 rounded-lg backdrop-blur-md">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-space tracking-widest uppercase text-gray-500">Total Queue</span>
                            <span className="font-mono text-xl text-[#7f0df2] shadow-glow-violet-text">{stats.totalQueueCount}</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-space tracking-widest uppercase text-gray-500">Avg. Review Time</span>
                            <span className="font-mono text-xl text-[#7f0df2] shadow-glow-violet-text">{stats.avgReviewTimeMinutes}m</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-6 bg-slate-50 border border-slate-200 px-6 py-3 sharp-corners">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-space tracking-widest uppercase text-slate-500">Total Queue</span>
                            <span className="font-mono text-xl text-[#8c2bee] font-bold">{stats.totalQueueCount}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-300" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-space tracking-widest uppercase text-slate-500">Avg. Review Time</span>
                            <span className="font-mono text-xl text-[#8c2bee] font-bold">{stats.avgReviewTimeMinutes}m</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Row: Action Panel */}
            <div className={`flex items-center gap-3 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-300'}`}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-space font-bold tracking-widest uppercase transition-colors outline-none
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 sharp-corners'
                        }
                    `}
                >
                    <span className="material-symbols-outlined text-[16px]">filter_list</span>
                    Filter
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-space font-bold tracking-widest uppercase transition-colors outline-none
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 sharp-corners'
                        }
                    `}
                >
                    <span className="material-symbols-outlined text-[16px]">sort</span>
                    Sort
                </motion.button>

                <div className="flex-grow" />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-space font-bold tracking-widest uppercase transition-colors outline-none
                        ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 sharp-corners'
                        }
                    `}
                >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Export
                </motion.button>
            </div>
        </div>
    );
};
