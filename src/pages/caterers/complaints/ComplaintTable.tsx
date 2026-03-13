import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Complaint, ComplaintStatus, IssueType } from './types';

interface ComplaintTableProps {
    data: Complaint[];
    onInvestigate: (id: string) => void;
    isDark: boolean;
}

const getStatusConfigDark = (status: ComplaintStatus) => {
    switch (status) {
        case 'OPEN': return 'bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse';
        case 'INVESTIGATING': return 'bg-[#facc15] shadow-[0_0_8px_#facc15]';
        case 'ESCALATED': return 'bg-[#f97316] shadow-[0_0_8px_#f97316] animate-pulse';
        case 'RESOLVED': return 'bg-[#22c55e] shadow-[0_0_8px_#22c55e]';
        default: return 'bg-gray-500';
    }
};

const getStatusConfigLight = (status: ComplaintStatus) => {
    switch (status) {
        case 'OPEN': return 'bg-red-50 text-red-600 border border-red-200';
        case 'INVESTIGATING': return 'bg-blue-50 text-blue-600 border border-blue-200';
        case 'ESCALATED': return 'bg-amber-50 text-amber-600 border border-amber-200';
        case 'RESOLVED': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
        default: return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
};

const formatIssueType = (type: IssueType) => {
    return type.replace('_', ' ');
};

export const ComplaintTable: React.FC<ComplaintTableProps> = ({ data, onInvestigate, isDark }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={`w-full overflow-x-auto rounded-sm mt-4
      ${isDark ? 'glass-panel !border-[#8f0df2]/30' : 'bg-white border border-slate-200 sharp-corners shadow-sm'}
    `}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`${isDark ? 'bg-black/40 border-b border-white/10' : 'bg-slate-100 border-b border-slate-300'}`}>
                        {['Complaint ID', 'Caterer', 'Customer', 'Issue', 'Date', 'Status', 'Action'].map((header, idx) => (
                            <th
                                key={header}
                                className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider
                  ${isDark ? 'text-gray-400' : 'text-slate-700 font-bold'}
                  ${!isDark && idx < 6 ? 'border-r border-slate-300' : ''}
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
                    <AnimatePresence>
                        {data.map((row) => (
                            <motion.tr
                                key={row.id}
                                variants={rowVariants}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className={`group transition-colors duration-200 border-b last:border-0
                  ${isDark
                                        ? 'border-white/10 hover:bg-white/5'
                                        : 'border-slate-200 hover:bg-slate-50'
                                    }
                `}
                            >
                                {/* ID */}
                                <td className={`py-4 px-4 whitespace-nowrap ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <span className={`font-mono text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
                                        {row.id}
                                    </span>
                                </td>

                                {/* Caterer Name */}
                                <td className={`py-4 px-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'} ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    {row.catererName}
                                </td>

                                {/* Customer */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden shrink-0
                      ${isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}
                    `}>
                                            {row.customer.avatarUrl ? (
                                                <img src={row.customer.avatarUrl} alt={row.customer.name} className="w-full h-full object-cover" />
                                            ) : (
                                                row.customer.initials
                                            )}
                                        </div>
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{row.customer.name}</span>
                                    </div>
                                </td>

                                {/* Issue Badge */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    <div className={`inline-flex items-center px-2.5 py-1 text-[11px] font-mono whitespace-nowrap
                    ${isDark ? 'bg-white/10 text-gray-300 rounded-sm' : 'bg-gray-100 text-gray-600 border border-gray-300 sharp-corners'}
                  `}>
                                        {formatIssueType(row.issue.type)}
                                    </div>
                                </td>

                                {/* Date */}
                                <td className={`py-4 px-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'} ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    {row.date}
                                </td>

                                {/* Status Indicator */}
                                <td className={`py-4 px-4 ${!isDark ? 'border-r border-slate-200' : ''}`}>
                                    {isDark ? (
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${getStatusConfigDark(row.status)}`} />
                                            <span className="text-[11px] font-mono tracking-wider text-gray-300">{row.status}</span>
                                        </div>
                                    ) : (
                                        <div className={`inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase sharp-corners ${getStatusConfigLight(row.status)}`}>
                                            {row.status}
                                        </div>
                                    )}
                                </td>

                                {/* Action */}
                                <td className="py-4 px-4 text-right">
                                    <button
                                        onClick={() => onInvestigate(row.id)}
                                        className={`inline-flex items-center text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-none w-fit
                      ${isDark
                                                ? 'px-4 py-1.5 bg-[#8f0df2] hover:bg-[#a132f7] active:scale-95 text-white shadow-md hover:shadow-[0_0_15px_rgba(143,13,242,0.6)] rounded-sm'
                                                : 'px-4 py-1.5 bg-[#8a2ce2] hover:bg-[#6e23b5] text-white sharp-corners flex gap-1'
                                            }
                    `}
                                    >
                                        <span>Investigate</span>
                                        {!isDark && <span className="material-symbols-outlined text-[14px]">arrow_forward</span>}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>

            {data.length === 0 && (
                <div className="p-12 text-center text-sm text-gray-500 flex flex-col items-center">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-50">inbox</span>
                    <p>No complaints found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};
