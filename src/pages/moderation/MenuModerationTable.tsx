import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuSubmission, MenuCategory, ModerationStatus } from './types';

interface MenuModerationTableProps {
    data: MenuSubmission[];
    activeTab: ModerationStatus | 'HISTORY';
    onReviewMenu: (id: string, status: ModerationStatus) => void;
    isDark: boolean;
}

const getCategoryBadgeStyle = (category: MenuCategory, isDark: boolean) => {
    const styles: Record<MenuCategory, { dark: string; light: string }> = {
        WEDDING: { dark: 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]', light: 'bg-purple-50 text-purple-700 border border-purple-200' },
        CORPORATE: { dark: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.2)]', light: 'bg-sky-50 text-sky-700 border border-sky-200' },
        EVENTS: { dark: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]', light: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        KIDS: { dark: 'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_8px_rgba(236,72,153,0.2)]', light: 'bg-pink-50 text-pink-700 border border-pink-200' },
        FESTIVAL: { dark: 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_8px_rgba(249,115,22,0.2)]', light: 'bg-orange-50 text-orange-700 border border-orange-200' },
        GALA: { dark: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_8px_rgba(234,179,8,0.2)]', light: 'bg-amber-50 text-amber-700 border border-amber-200' }
    };
    return isDark ? styles[category].dark : styles[category].light;
};

export const MenuModerationTable: React.FC<MenuModerationTableProps> = ({
    data,
    activeTab,
    onReviewMenu,
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

    const renderActionLabel = (status: ModerationStatus) => {
        switch (status) {
            case 'PENDING': return 'Review Menu';
            case 'FLAGGED': return 'Resolve Flag';
            default: return 'View Log';
        }
    };

    return (
        <div className={`w-full overflow-x-auto rounded-sm mt-4
      ${isDark ? 'glass-panel !border-[#d006f9]/30' : 'bg-white border border-slate-200 sharp-corners shadow-sm'}
    `}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`${isDark ? 'bg-black/40 border-b border-white/10' : 'bg-slate-100 border-b border-slate-300'}`}>
                        {['Menu Asset', 'Caterer', 'Category', 'Items', 'Submitted', 'Action'].map((header, idx) => (
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
                        {data.map((row) => (
                            <motion.tr
                                key={row.id}
                                layout
                                variants={rowVariants}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className={`group transition-colors duration-200 border-b last:border-0
                  ${isDark
                                        ? 'border-white/10 hover:bg-[#d006f9]/5'
                                        : 'border-slate-200 hover:bg-slate-50'
                                    }
                `}
                            >
                                {/* Menu Asset */}
                                <td className={`py-4 px-4 whitespace-nowrap ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <div className="flex flex-col">
                                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {row.menuName}
                                        </span>
                                        <span className={`font-mono text-xs mt-0.5 ${isDark ? 'text-[#d006f9]/70' : 'text-slate-500'}`}>
                                            {row.id}
                                        </span>
                                    </div>
                                </td>

                                {/* Caterer */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        {/* Mission Control UI overlay indicator */}
                                        <div className={`w-2 h-2 rounded-full shrink-0
                      ${isDark ? (row.caterer.indicatorColor || 'bg-gray-500') : 'hidden'}
                    `} />

                                        {/* Console UI initial overlay */}
                                        {!isDark && row.caterer.initial && (
                                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                                                {row.caterer.initial}
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

                                {/* Items Count */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] opacity-50">restaurant_menu</span>
                                        <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                                            {row.itemsCount}
                                        </span>
                                    </div>
                                </td>

                                {/* Date */}
                                <td className={`py-4 px-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'} ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    {row.submittedAt}
                                </td>

                                {/* Action */}
                                <td className="py-4 px-4 text-right">
                                    <button
                                        onClick={() => onReviewMenu(row.id, row.status)}
                                        className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 outline-none w-fit
                      ${isDark
                                                ? 'px-4 py-2 bg-[#d006f9]/20 text-[#d006f9] border border-[#d006f9] hover:bg-[#d006f9] hover:text-white hover:shadow-[0_0_15px_rgba(208,6,249,0.6)] rounded-sm'
                                                : 'px-4 py-1.5 bg-[#8c2bee] hover:bg-[#7220c4] active:translate-y-[1px] text-white sharp-corners shadow-sm'
                                            }
                    `}
                                    >
                                        {renderActionLabel(row.status)}
                                        {!isDark && <span className="material-symbols-outlined text-[14px] ml-1">chevron_right</span>}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>

            {data.length === 0 && (
                <div className="p-16 text-center flex flex-col items-center">
                    <span className={`material-symbols-outlined text-5xl mb-4 ${isDark ? 'text-[#d006f9]/30' : 'text-slate-300'}`}>
                        dns
                    </span>
                    <p className={`text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        No submissions found in <span className="font-bold">{activeTab}</span> queue.
                    </p>
                </div>
            )}
        </div>
    );
};
