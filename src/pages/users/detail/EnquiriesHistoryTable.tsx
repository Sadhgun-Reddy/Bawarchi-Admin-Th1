import React from 'react';
import { motion } from 'framer-motion';
import { EnquiryRecord } from './types';

interface EnquiriesHistoryTableProps {
    records: EnquiryRecord[];
    isDark: boolean;
}

export const EnquiriesHistoryTable: React.FC<EnquiriesHistoryTableProps> = ({ records, isDark }) => {

    const renderStatus = (status: string) => {
        if (isDark) {
            switch (status) {
                case 'COMPLETED': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" /><span className="text-gray-400 text-xs tracking-wider">COMPLETED</span></div>;
                case 'PENDING': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_var(--color-warning)] animate-pulse" /><span className="text-gray-400 text-xs tracking-wider">PENDING</span></div>;
                case 'CANCELLED': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-danger opacity-80" /><span className="text-danger text-xs tracking-wider">CANCELLED</span></div>;
            }
        } else {
            switch (status) {
                case 'COMPLETED': return <span className="inline-block px-2 py-0.5 sharp-corners border border-green-200 bg-green-50 text-green-700 font-bold text-[10px] tracking-wider">COMPLETED</span>;
                case 'PENDING': return <span className="inline-block px-2 py-0.5 sharp-corners border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold text-[10px] tracking-wider">PENDING</span>;
                case 'CANCELLED': return <span className="inline-block px-2 py-0.5 sharp-corners border border-red-200 bg-red-50 text-red-700 font-bold text-[10px] tracking-wider">CANCELLED</span>;
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`flex flex-col h-full overflow-hidden transition-colors ${isDark ? 'glass-panel' : 'bg-white sharp-corners border border-black'}`}
        >
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${isDark ? 'text-primary' : 'text-black'}`}>history_edu</span>
                    <h2 className={`font-display font-medium ${isDark ? 'text-white' : 'text-black'}`}>Enquiries History</h2>
                </div>
            </div>

            <div className={`overflow-x-auto ${!isDark ? 'bg-slate-200' : ''}`}>
                <table className={`w-full text-left border-collapse min-w-[400px] ${!isDark ? 'border-spacing-[1px] border-separate' : ''}`}>
                    <thead>
                        <tr className={`text-xs uppercase tracking-wider ${isDark ? 'border-b border-white/10 text-text-secondary bg-black/20' : 'text-gray-500 bg-gray-50'}`}>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Event Name</th>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Date</th>
                            <th className={`p-3 font-semibold text-right ${!isDark ? 'bg-gray-50' : ''}`}>Budget</th>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr
                                key={record.id}
                                className={`group
                                    ${isDark ? 'border-b border-white/5 hover:bg-white/[0.02]' : 'hover:bg-slate-50'}
                                `}
                            >
                                <td className={`p-3 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-black'}`}>{record.event}</div>
                                    <div className={`font-mono text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{record.id}</div>
                                </td>
                                <td className={`p-3 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <div className={`font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {new Date(record.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </td>
                                <td className={`p-3 text-right ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <span className={`font-mono text-sm font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>{record.budget}</span>
                                </td>
                                <td className={`p-3 font-mono ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    {renderStatus(record.status)}
                                </td>
                            </tr>
                        ))}
                        {records.length === 0 && (
                            <tr>
                                <td colSpan={4} className={`p-8 text-center ${!isDark ? 'bg-white' : ''}`}>
                                    <span className="material-symbols-outlined text-4xl opacity-20 mb-2">inbox</span>
                                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No recent enquiries found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={`p-3 border-t flex justify-center items-center mt-auto ${isDark ? 'border-white/5 bg-black/40' : 'border-gray-200 bg-gray-50'}`}>
                <button className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-primary hover:text-white' : 'text-indigo-600 hover:text-black'}`}>
                    View All Enquiries
                </button>
            </div>
        </motion.div>
    );
};
