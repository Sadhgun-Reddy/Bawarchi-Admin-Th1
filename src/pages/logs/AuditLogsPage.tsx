import React, { useContext, useState, useMemo } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export interface AuditLog {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    target: string;
    status: 'SUCCESS' | 'FAILURE' | 'WARNING';
    ipAddress: string;
}

const MOCK_LOGS: AuditLog[] = Array.from({ length: 45 }).map((_, i) => ({
    id: `LOG-${9000 + i}`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    actor: ['SYSTEM_ADMIN', 'michael.ross@example.com', 'API_KEY_773', 'dbowman@discovery.com'][Math.floor(Math.random() * 4)],
    action: ['USER_LOGIN', 'DATA_EXPORT', 'PERMISSION_UPDATE', 'FAILED_LOGIN', 'CATERER_APPROVED', 'POST_REJECTED'][Math.floor(Math.random() * 6)],
    target: `Resource_${Math.floor(Math.random() * 100)}`,
    status: Math.random() > 0.8 ? 'FAILURE' : (Math.random() > 0.9 ? 'WARNING' : 'SUCCESS'),
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
} as AuditLog)).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const AuditLogsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredLogs = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return MOCK_LOGS.filter(log =>
            log.action.toLowerCase().includes(query) ||
            log.actor.toLowerCase().includes(query) ||
            log.target.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const paginatedLogs = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredLogs.slice(start, start + rowsPerPage);
    }, [filteredLogs, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredLogs.length / rowsPerPage) || 1;

    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                        Audit Logs
                    </h1>
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        System audit trail and historical logs.
                    </p>
                </div>

                <div className={`relative w-full md:w-96 flex items-center transition-all duration-300`}>
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Search logs by actor, action or target..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className={`w-full pl-9 pr-4 py-2 text-sm outline-none transition-all duration-300
                            ${isDark
                                ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-sm focus:border-[#8b5cf6]'
                                : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 sharp-corners focus:border-black'
                            }
                        `}
                    />
                </div>
            </div>

            <div className={`w-full overflow-hidden transition-colors ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white border border-slate-200 sharp-corners'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className={`text-xs uppercase tracking-widest ${isDark ? 'bg-white/5 text-gray-400 border-b border-white/10' : 'bg-slate-50 text-slate-500 border-b border-slate-200'}`}>
                            <tr>
                                <th className="px-6 py-4 font-bold">Timestamp</th>
                                <th className="px-6 py-4 font-bold">Actor</th>
                                <th className="px-6 py-4 font-bold">Action</th>
                                <th className="px-6 py-4 font-bold">Target</th>
                                <th className="px-6 py-4 font-bold">IP Address</th>
                                <th className="px-6 py-4 font-bold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {paginatedLogs.map((log) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={log.id}
                                        className={`group border-b last:border-b-0 transition-colors
                                            ${isDark ? 'border-white/5 hover:bg-white/5 text-gray-300' : 'border-slate-100 hover:bg-slate-50 text-slate-700'}
                                        `}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {log.actor}
                                        </td>
                                        <td className={`px-6 py-4 font-bold text-[11px] uppercase tracking-wider`}>
                                            {log.action}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {log.target}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs opacity-50">
                                            {log.ipAddress}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider
                                                ${log.status === 'SUCCESS' ? (isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-100 text-green-700 border border-green-200') : ''}
                                                ${log.status === 'WARNING' ? (isDark ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border border-yellow-200') : ''}
                                                ${log.status === 'FAILURE' ? (isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-100 text-red-700 border border-red-200') : ''}
                                            `}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {paginatedLogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className={`px-6 py-12 text-center text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                                        No audit logs found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                        PAGE {page} OF {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                ${isDark
                                    ? 'hover:bg-white/10 text-white'
                                    : 'hover:bg-slate-100 text-black sharp-corners'}
                            `}
                        >
                            PREV
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                ${isDark
                                    ? 'hover:bg-white/10 text-white'
                                    : 'hover:bg-slate-100 text-black sharp-corners'}
                            `}
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
