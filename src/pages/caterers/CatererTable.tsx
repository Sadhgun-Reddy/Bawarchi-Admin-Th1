import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Caterer, CatererStatus } from './types';

interface CatererTableProps {
    caterers: Caterer[];
    isDark: boolean;
    totalRows: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

// Fallback logic for avatars
const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string, isDark: boolean) => {
    const colors = isDark
        ? ['bg-indigo-900', 'bg-purple-900', 'bg-teal-900', 'bg-rose-900']
        : ['bg-indigo-100', 'bg-purple-100', 'bg-teal-100', 'bg-rose-100'];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
};

export const CatererTable: React.FC<CatererTableProps> = ({ caterers, isDark, totalRows, page, rowsPerPage, onPageChange }) => {
    const navigate = useNavigate();

    const renderStatus = (status: CatererStatus) => {
        if (isDark) {
            switch (status) {
                case 'ACTIVE': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" /><span className="text-gray-400 text-xs font-mono tracking-wider">{status}</span></div>;
                case 'PENDING': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_10px_var(--color-warning)] animate-pulse" /><span className="text-gray-400 text-xs font-mono tracking-wider">PENDING</span></div>;
                case 'REJECTED': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-danger opacity-80" /><span className="text-danger text-xs font-mono tracking-wider">{status}</span></div>;
                case 'ARCHIVED': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-gray-500 opacity-60" /><span className="text-gray-500 text-xs font-mono tracking-wider">{status}</span></div>;
            }
        } else {
            switch (status) {
                case 'ACTIVE': return <span className="inline-block px-2 py-0.5 sharp-corners border border-green-200 bg-green-50 text-green-700 font-bold text-[10px] tracking-wider">{status}</span>;
                case 'PENDING': return <span className="inline-block px-2 py-0.5 sharp-corners border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold text-[10px] tracking-wider">PENDING</span>;
                case 'REJECTED': return <span className="inline-block px-2 py-0.5 sharp-corners border border-red-200 bg-red-50 text-red-700 font-bold text-[10px] tracking-wider">{status}</span>;
                case 'ARCHIVED': return <span className="inline-block px-2 py-0.5 sharp-corners border border-gray-300 bg-gray-100 text-gray-600 font-bold text-[10px] tracking-wider">{status}</span>;
            }
        }
    };

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`flex flex-col flex-1 overflow-hidden transition-colors ${isDark ? 'glass-panel border-t-0' : 'bg-white sharp-corners border border-t-0 border-black'}`}
        >
            <div className={`overflow-x-auto flex-1 ${!isDark ? 'bg-slate-200' : ''}`}>
                <table className={`w-full text-left border-collapse min-w-[900px] ${!isDark ? 'border-spacing-[1px] border-separate' : ''}`}>
                    <thead>
                        <tr className={`text-xs uppercase tracking-wider ${isDark ? 'border-b border-white/10 text-text-secondary bg-black/40' : 'text-gray-500 bg-gray-50'}`}>
                            <th className={`p-4 font-semibold ${!isDark ? 'bg-gray-50' : ''}`}>Business Name</th>
                            <th className={`p-4 font-semibold w-48 ${!isDark ? 'bg-gray-50' : ''}`}>Location</th>
                            <th className={`p-4 font-semibold w-32 ${!isDark ? 'bg-gray-50' : ''}`}>Rating</th>
                            <th className={`p-4 font-semibold w-24 text-right ${!isDark ? 'bg-gray-50' : ''}`}>Enquiries</th>
                            <th className={`p-4 font-semibold w-24 text-right ${!isDark ? 'bg-gray-50' : ''}`}>Views</th>
                            <th className={`p-4 font-semibold w-32 ${!isDark ? 'bg-gray-50' : ''}`}>Status</th>
                            <th className={`p-4 font-semibold w-16 text-right ${!isDark ? 'bg-gray-50' : ''}`}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {caterers.map((caterer, i) => (
                                <motion.tr
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    key={caterer.id}
                                    onClick={() => navigate(`/admin/caterers/${caterer.id}`)}
                                    className={`group transition-colors cursor-pointer
                                        ${isDark ? 'border-b border-white/5 hover:bg-primary/5' : 'hover:bg-slate-50'}
                                    `}
                                >
                                    <td className={`p-4 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            {/* Logo logic */}
                                            {caterer.logoUrl ? (
                                                <img
                                                    src={caterer.logoUrl}
                                                    alt={caterer.businessName}
                                                    className={`w-10 h-10 object-cover 
                                                        ${isDark && caterer.status === 'ACTIVE' ? 'rounded-full ring-2 ring-primary ring-offset-2 ring-offset-black' : isDark ? 'rounded-full' : 'rounded-full border border-gray-300'}
                                                    `}
                                                />
                                            ) : (
                                                <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm tracking-wider
                                                    ${getAvatarColor(caterer.businessName, isDark)} 
                                                    ${isDark ? 'text-gray-300 rounded-full' : 'text-black border border-gray-300 rounded-full'}
                                                    ${isDark && caterer.status === 'ACTIVE' ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''}
                                                `}>
                                                    {getInitials(caterer.businessName)}
                                                </div>
                                            )}

                                            <div className="flex flex-col">
                                                <span className={`font-medium text-sm ${isDark ? 'text-gray-200 group-hover:text-primary transition-colors' : 'text-black font-bold'}`}>{caterer.businessName}</span>
                                                <span className={`text-xs mt-0.5 font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>ID: {caterer.id} • Since {caterer.sinceYear}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className={`p-4 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <span className="material-symbols-outlined text-[16px] opacity-70">location_on</span>
                                            {caterer.location}
                                        </div>
                                    </td>

                                    <td className={`p-4 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className={`font-mono text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>{caterer.rating.toFixed(1)}</span>
                                            <span className={`font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/ 5.0</span>
                                        </div>
                                    </td>

                                    <td className={`p-4 text-right ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-black'}`}>{caterer.enquiriesCount}</span>
                                    </td>

                                    <td className={`p-4 text-right ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-black'}`}>{caterer.viewCount}</span>
                                    </td>

                                    <td className={`p-4 ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        {renderStatus(caterer.status)}
                                    </td>

                                    <td className={`p-4 text-right ${!isDark ? 'bg-white group-hover:bg-slate-50' : ''}`}>
                                        <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/admin/caterers/${caterer.id}`); }}
                                                className={`p-1.5 transition-colors ${isDark ? 'hover:bg-white/10 rounded-sm text-gray-400 hover:text-white' : 'hover:bg-gray-200 hover:text-black sharp-corners text-gray-600'}`}
                                                title="View Profile"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>

                        {caterers.length === 0 && (
                            <tr>
                                <td colSpan={7} className={`p-16 text-center ${!isDark ? 'bg-white' : ''}`}>
                                    <span className={`material-symbols-outlined text-4xl mb-2 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>storefront</span>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No caterers found matching your filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Sticky Table Footer */}
            <div className={`p-4 border-t flex justify-between items-center text-xs mt-auto ${isDark ? 'border-white/5 bg-[#0a0a0a] text-gray-500' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                <div>
                    Showing <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{caterers.length > 0 ? ((page - 1) * rowsPerPage) + 1 : 0}</span> to <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{Math.min(page * rowsPerPage, totalRows)}</span> of <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{totalRows}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <button
                            disabled={page === 1}
                            onClick={() => onPageChange(page - 1)}
                            className={`p-1 flex items-center justify-center transition-colors
                                ${isDark
                                    ? 'hover:bg-white/10 rounded-sm disabled:opacity-30 disabled:hover:bg-transparent'
                                    : 'hover:bg-gray-200 sharp-corners disabled:opacity-30 disabled:hover:bg-transparent text-black'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button
                            disabled={page === totalPages || totalPages === 0}
                            onClick={() => onPageChange(page + 1)}
                            className={`p-1 flex items-center justify-center transition-colors
                                ${isDark
                                    ? 'hover:bg-white/10 rounded-sm disabled:opacity-30 disabled:hover:bg-transparent'
                                    : 'hover:bg-gray-200 sharp-corners disabled:opacity-30 disabled:hover:bg-transparent text-black'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
