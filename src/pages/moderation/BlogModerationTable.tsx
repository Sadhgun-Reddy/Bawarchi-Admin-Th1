import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPostSubmission, BlogCategory, BlogStatus } from './types';
import { ReviewAction } from './ReviewAction';

interface BlogModerationTableProps {
    data: BlogPostSubmission[];
    activeTab: BlogStatus;
    onReviewPost: (postId: string) => void;
    isDark: boolean;
}

const getCategoryBadgeStyle = (category: BlogCategory, isDark: boolean) => {
    const styles: Record<BlogCategory, { dark: string; light: string }> = {
        TRENDS: { dark: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.2)]', light: 'bg-blue-50 text-blue-700 border border-blue-200' },
        SAFETY: { dark: 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.2)]', light: 'bg-red-50 text-red-700 border border-red-200' },
        RECIPES: { dark: 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)]', light: 'bg-orange-50 text-orange-700 border border-orange-200' },
        DIETARY: { dark: 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.2)]', light: 'bg-green-50 text-green-700 border border-green-200' },
        GUIDE: { dark: 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]', light: 'bg-purple-50 text-purple-700 border border-purple-200' },
        BUSINESS: { dark: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_8px_rgba(234,179,8,0.2)]', light: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
        SEASONAL: { dark: 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_8px_rgba(20,184,166,0.2)]', light: 'bg-teal-50 text-teal-700 border border-teal-200' }
    };
    return isDark ? styles[category].dark : styles[category].light;
};

export const BlogModerationTable: React.FC<BlogModerationTableProps> = ({
    data,
    activeTab,
    onReviewPost,
    isDark
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return { dateStr, timeStr };
    };

    return (
        <div className={`w-full overflow-x-auto rounded-sm mt-4
            ${isDark ? 'glass-panel !border-[#d006f9]/30' : 'bg-white border border-slate-200 sharp-corners shadow-sm'}
        `}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`${isDark ? 'bg-black/40 border-b border-white/10' : 'bg-slate-100 border-b border-slate-300'}`}>
                        {['Post ID', 'Post Title', 'Caterer', 'Category', 'Submitted', 'Action'].map((header, idx) => (
                            <th
                                key={header}
                                className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider
                                    ${isDark ? 'text-gray-400' : 'text-slate-700 font-bold'}
                                    ${!isDark && idx < 5 ? 'border-r border-slate-300' : ''}
                                `}
                                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <motion.tbody
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <AnimatePresence mode="popLayout">
                        {data.map((row) => {
                            const { dateStr, timeStr } = formatDate(row.submittedDate);
                            return (
                                <motion.tr
                                    key={row.id}
                                    layout
                                    variants={rowVariants}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className={`group transition-colors duration-200 border-b last:border-0
                                        ${isDark
                                            ? 'border-white/10 hover:bg-white/5'
                                            : 'border-slate-200 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {/* Post ID */}
                                    <td className={`py-4 px-4 whitespace-nowrap ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                        <span className={`font-mono text-xs ${isDark ? 'text-[#d006f9]/70' : 'text-slate-500'}`}>
                                            {row.id}
                                        </span>
                                    </td>

                                    {/* Post Title */}
                                    <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                        <div className="flex flex-col max-w-md">
                                            <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                {row.title}
                                            </span>
                                            <span className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                                {row.excerpt}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Caterer */}
                                    <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            {row.caterer.logoUrl ? (
                                                <img
                                                    src={row.caterer.logoUrl}
                                                    alt={row.caterer.name}
                                                    className="w-8 h-8 rounded-full object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                                                    ${isDark ? 'bg-white/10 text-gray-300' : 'bg-slate-200 text-slate-700'}
                                                `}>
                                                    {row.caterer.initials}
                                                </div>
                                            )}
                                            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                                                {row.caterer.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                        <div className={`inline-flex items-center px-2.5 py-1 text-[11px] font-mono whitespace-nowrap sharp-corners transition-all
                                            ${getCategoryBadgeStyle(row.category, isDark)}
                                        `}>
                                            {row.category}
                                        </div>
                                    </td>

                                    {/* Submitted Date */}
                                    <td className={`py-4 px-4 whitespace-nowrap ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                                                {dateStr}
                                            </span>
                                            <span className={`text-xs font-mono ${isDark ? 'text-white/20' : 'text-slate-400'}`}>
                                                {timeStr}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className="py-4 px-4 text-right">
                                        <ReviewAction
                                            postId={row.id}
                                            onReviewPost={onReviewPost}
                                            isDark={isDark}
                                        />
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </AnimatePresence>
                </motion.tbody>
            </table>

            {data.length === 0 && (
                <div className="p-16 text-center flex flex-col items-center">
                    <span className={`material-symbols-outlined text-5xl mb-4 ${isDark ? 'text-[#d006f9]/30' : 'text-slate-300'}`}>
                        article
                    </span>
                    <p className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        No submissions found in <span className="font-bold">{activeTab}</span> queue.
                    </p>
                </div>
            )}
        </div>
    );
};
