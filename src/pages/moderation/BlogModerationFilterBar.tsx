import React from 'react';
import { BlogCategory, DateRange } from './types';

interface BlogModerationFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categoryFilter: BlogCategory | null;
    onCategoryChange: (category: BlogCategory | null) => void;
    dateRange: DateRange;
    onDateRangeChange: (range: DateRange) => void;
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalRecords: number;
    };
    isDark: boolean;
}

export const BlogModerationFilterBar: React.FC<BlogModerationFilterBarProps> = ({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryChange,
    dateRange,
    onDateRangeChange,
    pagination,
    isDark
}) => {
    const { currentPage, itemsPerPage, totalRecords } = pagination;
    const startIndex = totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalRecords);

    const categories: BlogCategory[] = ['TRENDS', 'SAFETY', 'RECIPES', 'DIETARY', 'GUIDE', 'BUSINESS', 'SEASONAL'];

    return (
        <div className={`p-4 flex flex-col gap-4 w-full transition-colors mt-4
            ${isDark
                ? 'glass-panel !border-[#d006f9]/30 bg-black/40'
                : 'bg-slate-50 border border-slate-200 sharp-corners'
            }
        `}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className={`relative w-full md:w-96 flex items-center transition-all duration-300 ${isDark ? 'focus-within:glow-border' : ''}`}>
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Filter by Post ID, title or caterer..."
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

                {/* Category Filter */}
                <select
                    value={categoryFilter || ''}
                    onChange={(e) => onCategoryChange(e.target.value ? e.target.value as BlogCategory : null)}
                    className={`px-4 py-2 text-sm outline-none transition-all duration-300
                        ${isDark
                            ? 'bg-white/5 border border-white/10 text-white rounded-sm focus:bg-white/10 focus:border-[#d006f9]'
                            : 'bg-white border border-slate-300 text-slate-900 sharp-corners focus:ring-1 focus:ring-[#8c2bee]'
                        }
                    `}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Date Range Picker */}
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={dateRange.start ? dateRange.start.toISOString().split('T')[0] : ''}
                        onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value ? new Date(e.target.value) : null })}
                        className={`px-3 py-2 text-sm outline-none transition-all
                            ${isDark
                                ? 'bg-white/5 border border-white/10 text-white rounded-sm focus:border-[#d006f9]'
                                : 'bg-white border border-slate-300 text-slate-900 sharp-corners focus:ring-1 focus:ring-[#8c2bee]'
                            }
                        `}
                    />
                    <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>to</span>
                    <input
                        type="date"
                        value={dateRange.end ? dateRange.end.toISOString().split('T')[0] : ''}
                        onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value ? new Date(e.target.value) : null })}
                        className={`px-3 py-2 text-sm outline-none transition-all
                            ${isDark
                                ? 'bg-white/5 border border-white/10 text-white rounded-sm focus:border-[#d006f9]'
                                : 'bg-white border border-slate-300 text-slate-900 sharp-corners focus:ring-1 focus:ring-[#8c2bee]'
                            }
                        `}
                    />
                </div>

                {/* Results Indicator */}
                <div className={`text-xs font-mono font-bold tracking-widest uppercase whitespace-nowrap
                    ${isDark ? 'text-[#d006f9]' : 'text-slate-500'}
                `}>
                    SHOWING {startIndex}-{endIndex} OF {totalRecords}
                </div>
            </div>
        </div>
    );
};
