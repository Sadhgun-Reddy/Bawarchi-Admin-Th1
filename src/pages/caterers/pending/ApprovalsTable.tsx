import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PendingCaterer } from './types';

interface ApprovalsTableProps {
    data: PendingCaterer[];
    onReview: (appId: string) => void;
    isDark: boolean;
}

export const ApprovalsTable: React.FC<ApprovalsTableProps> = ({ data, onReview, isDark }) => {

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={`w-full overflow-x-auto rounded-sm ${isDark ? 'glass-panel' : 'bg-white border border-[#0f172a] shadow-sm sharp-corners'}`}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`${isDark ? 'bg-white/5 border-b border-white/10' : 'bg-[#E2E8F0] border-b border-[#0f172a]'}`}>
                        {['App ID', 'Business Details', 'Owner', 'Location', 'Experience', 'Submitted', 'Action'].map((header, idx) => (
                            <th
                                key={header}
                                className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider
                                    ${isDark ? 'text-gray-400' : 'text-[#0f172a] font-bold'}
                                    ${!isDark && idx < 6 ? 'border-r border-[#0f172a]' : ''}
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
                    className="group-table"
                >
                    <AnimatePresence>
                        {data.map((row) => (
                            <motion.tr
                                key={row.appId}
                                variants={rowVariants}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className={`group transition-colors duration-200 border-b last:border-0
                                    ${isDark
                                        ? 'border-white/10 hover:bg-[#a413ec]/5'
                                        : 'border-[#0f172a] hover:bg-gray-50'
                                    }
                                `}
                            >
                                {/* App ID */}
                                <td className={`py-4 px-4 whitespace-nowrap ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    <span className={`font-mono text-sm transition-all duration-300
                                        ${isDark
                                            ? 'text-[#a413ec] group-hover:drop-shadow-[0_0_8px_#a413ec]'
                                            : 'text-[#7f0df2] font-semibold'
                                        }
                                    `}>
                                        {row.appId}
                                    </span>
                                </td>

                                {/* Business Name & Logo */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        {/* Avatar Logic */}
                                        {isDark && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#a413ec]/20 flex items-center justify-center text-[#a413ec] text-xs font-bold ring-1 ring-[#a413ec]/30">
                                                {row.logoUrl ? (
                                                    <img src={row.logoUrl} alt={row.businessName} className="w-full h-full object-cover" />
                                                ) : (
                                                    row.businessName.substring(0, 2).toUpperCase()
                                                )}
                                            </div>
                                        )}
                                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate max-w-[180px]`}>
                                            {row.businessName}
                                        </span>
                                    </div>
                                </td>

                                {/* Owner Name */}
                                <td className={`py-4 px-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'} ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    {row.ownerName}
                                </td>

                                {/* Location */}
                                <td className={`py-4 px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    {row.location}
                                </td>

                                {/* Experience */}
                                <td className={`py-4 px-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-300' : 'text-black'} ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    {row.experienceYears} <span className="text-xs text-gray-500">Yrs</span>
                                </td>

                                {/* Submitted Date */}
                                <td className={`py-4 px-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-700'} ${!isDark ? 'border-r border-[#0f172a]' : ''}`}>
                                    {row.submittedDate}
                                </td>

                                {/* Action */}
                                <td className="py-4 px-4 text-right">
                                    <button
                                        onClick={() => onReview(row.appId)}
                                        className={`relative inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-white transition-all duration-200 outline-none
                                            ${isDark
                                                ? 'bg-[#a413ec] shadow-lg shadow-[#a413ec]/20 rounded-sm hover:bg-[#b52df3] active:scale-95'
                                                : 'bg-[#7f0df2] hover:bg-[#6c0bce] sharp-corners group/btn'
                                            }
                                        `}
                                    >
                                        <span>Review</span>
                                        {!isDark && (
                                            <span className="material-symbols-outlined text-[16px] opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-200">
                                                arrow_forward
                                            </span>
                                        )}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="p-12 text-center text-sm text-gray-500 flex flex-col items-center">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-50">inbox</span>
                    <p>No applications found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};
