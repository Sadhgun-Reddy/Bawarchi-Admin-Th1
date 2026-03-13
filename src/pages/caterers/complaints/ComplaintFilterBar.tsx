import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComplaintFilters, ComplaintStatus, IssueType } from './types';

interface ComplaintFilterBarProps {
    isVisible: boolean;
    filters: ComplaintFilters;
    onUpdateFilters: (updates: Partial<ComplaintFilters>) => void;
    isDark: boolean;
}

export const ComplaintFilterBar: React.FC<ComplaintFilterBarProps> = ({
    isVisible,
    filters,
    onUpdateFilters,
    isDark
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                >
                    <div className={`p-4 flex flex-col md:flex-row items-center gap-4 w-full transition-colors
            ${isDark
                            ? 'glass-panel !border-[#8f0df2]/30 bg-black/40'
                            : 'bg-slate-50 border border-slate-200 sharp-corners'
                        }
          `}>

                        {/* Search Input */}
                        <div className={`relative flex-1 flex items-center transition-all duration-300 ${isDark ? 'focus-within:glow-border' : ''}`}>
                            <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
                            <input
                                type="text"
                                placeholder="Search by ID, Caterer name, or Issue description..."
                                value={filters.searchQuery}
                                onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                                className={`w-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-300
                  ${isDark
                                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-sm focus:bg-white/10 focus:border-[#8f0df2]'
                                        : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 sharp-corners focus:ring-1 focus:ring-[#8a2ce2] focus:border-[#8a2ce2]'
                                    }`}
                            />
                        </div>

                        {/* Status Selector */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className={`text-xs font-bold uppercase ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Status:</span>
                            <select
                                value={filters.status}
                                onChange={(e) => onUpdateFilters({ status: e.target.value as ComplaintStatus | 'all' })}
                                className={`py-2 px-3 text-sm outline-none cursor-pointer flex-1
                  ${isDark
                                        ? 'bg-white/5 border border-white/10 text-white rounded-sm focus:border-[#8f0df2]'
                                        : 'bg-white border border-slate-300 text-slate-900 sharp-corners focus:ring-1 focus:ring-[#8a2ce2] focus:border-[#8a2ce2]'
                                    }
                `}
                            >
                                <option value="all">All Statuses</option>
                                <option value="OPEN">Open</option>
                                <option value="INVESTIGATING">Investigating</option>
                                <option value="ESCALATED">Escalated</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                        </div>

                        {/* Issue Type Selector */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className={`text-xs font-bold uppercase ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Issue:</span>
                            <select
                                value={filters.issueType}
                                onChange={(e) => onUpdateFilters({ issueType: e.target.value as IssueType | 'all' })}
                                className={`py-2 px-3 text-sm outline-none cursor-pointer flex-1
                  ${isDark
                                        ? 'bg-white/5 border border-white/10 text-white rounded-sm focus:border-[#8f0df2]'
                                        : 'bg-white border border-slate-300 text-slate-900 sharp-corners focus:ring-1 focus:ring-[#8a2ce2] focus:border-[#8a2ce2]'
                                    }
                `}
                            >
                                <option value="all">All Issues</option>
                                <option value="LATE_DELIVERY">Late Delivery</option>
                                <option value="FOOD_QUALITY">Food Quality</option>
                                <option value="MISSING_ITEM">Missing Item</option>
                                <option value="STAFF_BEHAVIOR">Staff Behavior</option>
                                <option value="HYGIENE">Hygiene</option>
                            </select>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
