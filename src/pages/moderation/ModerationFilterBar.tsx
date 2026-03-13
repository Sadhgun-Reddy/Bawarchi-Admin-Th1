import React from 'react';
import { ModerationState } from './types';

interface ModerationFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    pagination: ModerationState['pagination'];
    isDark: boolean;
}

export const ModerationFilterBar: React.FC<ModerationFilterBarProps> = ({
    searchQuery,
    onSearchChange,
    pagination,
    isDark
}) => {
    const { currentPage, itemsPerPage, totalRecords } = pagination;
    const startIndex = totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalRecords);

    return (
        <div className={`p-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full transition-colors mt-4
      ${isDark
                ? 'glass-panel !border-[#d006f9]/30 bg-black/40'
                : 'bg-slate-50 border border-slate-200 sharp-corners'
            }
    `}>
            {/* Search Input */}
            <div className={`relative w-full md:w-96 flex items-center transition-all duration-300 ${isDark ? 'focus-within:glow-border' : ''}`}>
                <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
                <input
                    type="text"
                    placeholder="Filter by Menu ID, name or caterer..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-300
            ${isDark
                            ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-sm focus:bg-white/10 focus:border-[#d006f9]'
                            : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 sharp-corners focus:ring-1 focus:ring-[#8c2bee] focus:border-[#8c2bee]'
                        }
          `}
                />
            </div>

            {/* Results Indicator */}
            <div className={`text-xs font-mono font-bold tracking-widest uppercase
        ${isDark ? 'text-[#d006f9]' : 'text-slate-500'}
      `}>
                SHOWING {startIndex}-{endIndex} OF {totalRecords}
            </div>
        </div>
    );
};
