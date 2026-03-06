import React from 'react';
import { motion } from 'framer-motion';
import { SupportTicket } from './types';

interface SupportTicketsTableProps {
    records: SupportTicket[];
    isDark: boolean;
}

export const SupportTicketsTable: React.FC<SupportTicketsTableProps> = ({ records, isDark }) => {

    const renderStatus = (status: string) => {
        if (isDark) {
            switch (status) {
                case 'OPEN': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-primary" /><span className="text-primary text-xs tracking-wider">OPEN</span></div>;
                case 'IN_PROGRESS': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_var(--color-warning)] animate-pulse" /><span className="text-warning text-xs tracking-wider">IN PROGRESS</span></div>;
                case 'RESOLVED':
                case 'CLOSED': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-gray-600" /><span className="text-gray-500 text-xs tracking-wider">{status}</span></div>;
            }
        } else {
            switch (status) {
                case 'OPEN': return <span className="inline-block px-2 py-0.5 sharp-corners border border-blue-200 bg-blue-50 text-blue-700 font-bold text-[10px] tracking-wider">OPEN</span>;
                case 'IN_PROGRESS': return <span className="inline-block px-2 py-0.5 sharp-corners border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold text-[10px] tracking-wider">IN PROGRESS</span>;
                case 'RESOLVED':
                case 'CLOSED': return <span className="inline-block px-2 py-0.5 sharp-corners border border-gray-300 bg-gray-100 text-gray-700 font-bold text-[10px] tracking-wider">{status}</span>;
            }
        }
    };

    const renderPriority = (priority: string) => {
        if (priority === 'HIGH') return <span className={`material-symbols-outlined text-[14px] ${isDark ? 'text-danger' : 'text-red-500'}`} title="High Priority">keyboard_double_arrow_up</span>;
        if (priority === 'MEDIUM') return <span className={`material-symbols-outlined text-[14px] ${isDark ? 'text-warning' : 'text-yellow-500'}`} title="Medium Priority">keyboard_arrow_up</span>;
        return <span className={`material-symbols-outlined text-[14px] ${isDark ? 'text-blue-400' : 'text-blue-500'}`} title="Low Priority">keyboard_arrow_down</span>;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`flex flex-col h-full overflow-hidden transition-colors ${isDark ? 'glass-panel' : 'bg-white sharp-corners border border-black'}`}
        >
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${isDark ? 'text-primary' : 'text-black'}`}>support_agent</span>
                    <h2 className={`font-display font-medium ${isDark ? 'text-white' : 'text-black'}`}>Support Tickets</h2>
                </div>
            </div>

            <div className={`overflow-x-auto ${!isDark ? 'bg-slate-200' : ''}`}>
                <table className={`w-full text-left border-collapse min-w-[400px] ${!isDark ? 'border-spacing-[1px] border-separate' : ''}`}>
                    <thead>
                        <tr className={`text-xs uppercase tracking-wider ${isDark ? 'border-b border-white/10 text-text-secondary bg-black/20' : 'text-gray-500 bg-gray-50'}`}>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Ticket ID</th>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Subject</th>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Priority/Date</th>
                            <th className={`p-3 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, i) => (
                            <tr
                                key={record.id}
                                className={`group
                                    ${isDark ? 'border-b border-white/5 hover:bg-white/[0.02]' : 'hover:bg-slate-50'}
                                `}
                            >
                                <td className={`p-3 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <span className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-600 font-medium'}`}>{record.id}</span>
                                </td>
                                <td className={`p-3 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <div className={`font-medium text-sm truncate max-w-[150px] ${isDark ? 'text-gray-200' : 'text-black'}`} title={record.subject}>{record.subject}</div>
                                </td>
                                <td className={`p-3 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                    <div className="flex items-center gap-1.5">
                                        {renderPriority(record.priority)}
                                        {record.date && (
                                            <div className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                {new Date(record.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
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
                                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No recent tickets found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={`p-3 border-t flex justify-center items-center mt-auto ${isDark ? 'border-white/5 bg-black/40' : 'border-gray-200 bg-gray-50'}`}>
                <button className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-primary hover:text-white' : 'text-indigo-600 hover:text-black'}`}>
                    View All Tickets
                </button>
            </div>
        </motion.div>
    );
};
