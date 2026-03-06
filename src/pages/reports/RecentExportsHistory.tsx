import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExportRecord } from './ReportsPage';

interface RecentExportsHistoryProps {
    records: ExportRecord[];
    isDark: boolean;
}

export const RecentExportsHistory: React.FC<RecentExportsHistoryProps> = ({ records, isDark }) => {

    const renderStatus = (status: string) => {
        switch (status) {
            case 'READY':
                return isDark
                    ? <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" /><span className="text-emerald-400 text-xs tracking-wider">READY</span></div>
                    : <div className="flex items-center gap-1"><span className="material-symbols-outlined text-green-600 text-[16px]">check_circle</span><span className="text-green-700 font-bold text-xs">COMPLETED</span></div>;
            case 'PROCESSING':
                return isDark
                    ? <div className="flex items-center gap-2"><span className="material-symbols-outlined text-warning text-[14px] animate-spin">sync</span><span className="text-warning text-xs tracking-wider">PROCESSING</span></div>
                    : <div className="flex items-center gap-1"><span className="material-symbols-outlined text-black text-[16px] animate-spin">sync</span><span className="text-black text-xs font-bold">PROCESSING</span></div>;
            case 'FAILED':
                return isDark
                    ? <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_var(--color-danger)] animate-pulse" /><span className="text-danger text-xs tracking-wider">FAILED</span></div>
                    : <div className="flex items-center gap-1"><span className="material-symbols-outlined text-red-600 text-[16px]">error</span><span className="text-red-600 font-bold text-xs">FAILED</span></div>;
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-col h-full ${isDark ? 'glass-panel' : 'bg-white sharp-corners border border-black'} transition-colors`}>

            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${isDark ? 'text-primary' : 'text-black'}`}>history</span>
                    <h2 className={`font-display font-medium ${isDark ? 'text-white' : 'text-black'}`}>Recent Exports</h2>
                </div>
                <button className={`p-1 rounded-sm transition-colors flex items-center ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-gray-100 sharp-corners'}`}>
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className={`border-b text-xs uppercase tracking-wider ${isDark ? 'border-white/10 text-text-secondary bg-black/20' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>
                            <th className="p-4 font-semibold w-24">Report ID</th>
                            <th className="p-4 font-semibold">Name & Category</th>
                            <th className="p-4 font-semibold">Generated</th>
                            <th className="p-4 font-semibold w-20">Format</th>
                            <th className="p-4 font-semibold w-32">Status</th>
                            <th className="p-4 font-semibold w-24 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {records.map((record, i) => (
                                <motion.tr
                                    key={record.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className={`border-b border-dashed transition-colors group
                                        ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-200 hover:bg-slate-50'}
                                    `}
                                >
                                    <td className="p-4">
                                        <span className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-600 font-medium'}`}>{record.id}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-black'}`}>{record.name}</div>
                                        <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{record.category}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className={`font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {new Date(record.generatedAt).toLocaleString(undefined, {
                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider font-mono
                                            ${isDark ? 'bg-white/10 text-gray-300 rounded-sm' : 'bg-gray-200 text-black sharp-corners'}
                                        `}>
                                            {record.format}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono">
                                        {renderStatus(record.status)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {record.status === 'READY' && (
                                                <button className={`p-1.5 transition-colors ${isDark ? 'hover:bg-primary/20 hover:text-primary rounded-sm text-gray-400' : 'hover:bg-gray-200 hover:text-black sharp-corners text-gray-600'}`} title="Download">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                </button>
                                            )}
                                            {record.status === 'FAILED' && (
                                                <button className={`p-1.5 transition-colors ${isDark ? 'hover:bg-white/10 rounded-sm text-gray-400' : 'hover:bg-gray-200 hover:text-black sharp-corners text-gray-600'}`} title="Retry">
                                                    <span className="material-symbols-outlined text-[18px]">replay</span>
                                                </button>
                                            )}

                                            <button className={`p-1.5 transition-colors ${isDark ? 'hover:bg-danger/20 hover:text-danger rounded-sm text-gray-400' : 'hover:bg-red-100 hover:text-red-600 sharp-corners text-gray-600'}`} title="Delete">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {records.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-12 text-center">
                                    <span className="material-symbols-outlined text-4xl opacity-20 mb-2">inbox</span>
                                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No recent exports found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className={`p-4 border-t flex justify-between items-center text-xs mt-auto ${isDark ? 'border-white/5 text-gray-500' : 'border-gray-200 text-gray-600'}`}>
                <span>Showing 1-{Math.min(records.length, 10)} of {records.length} exports</span>
                <div className="flex gap-1">
                    <button className={`px-2 py-1 ${isDark ? 'hover:bg-white/10 rounded-sm' : 'hover:bg-gray-100 sharp-corners'}`} disabled>Prev</button>
                    <button className={`px-2 py-1 ${isDark ? 'hover:bg-white/10 rounded-sm' : 'hover:bg-gray-100 sharp-corners'}`}>Next</button>
                </div>
            </div>

        </div>
    );
};
