import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, UserStatus } from './UserManagementPage';

interface UserTableProps {
    users: User[];
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

export const UserTable: React.FC<UserTableProps> = ({ users, isDark, totalRows, page, rowsPerPage, onPageChange }) => {
    const navigate = useNavigate();

    const renderRoleBadge = (role: UserRole) => {
        switch (role) {
            case 'ADMIN': return <span className={`px-2 py-0.5 text-[10px] tracking-wider font-bold ${isDark ? 'bg-primary/20 text-primary rounded-sm border border-primary/30' : 'bg-black text-white sharp-corners'}`}>ADMIN</span>;
            case 'VENDOR': return <span className={`px-2 py-0.5 text-[10px] tracking-wider font-bold ${isDark ? 'bg-blue-500/20 text-blue-400 rounded-sm' : 'bg-blue-100 text-blue-800 sharp-corners border border-blue-200'}`}>VENDOR</span>;
            case 'CUSTOMER': return <span className={`px-2 py-0.5 text-[10px] tracking-wider font-bold ${isDark ? 'bg-white/10 text-gray-300 rounded-sm' : 'bg-gray-100 text-gray-600 sharp-corners border border-gray-200'}`}>CUSTOMER</span>;
        }
    };

    const renderStatus = (status: UserStatus) => {
        if (isDark) {
            switch (status) {
                case 'VERIFIED':
                case 'ACTIVE': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" /><span className="text-gray-400 text-xs font-mono tracking-wider">{status}</span></div>;
                case 'PENDING': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_10px_var(--color-warning)] animate-pulse" /><span className="text-gray-400 text-xs font-mono tracking-wider">PENDING</span></div>;
                case 'SUSPENDED':
                case 'INACTIVE': return <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-danger opacity-70" /><span className="text-gray-500 text-xs font-mono tracking-wider">{status}</span></div>;
            }
        } else {
            switch (status) {
                case 'VERIFIED':
                case 'ACTIVE': return <span className="inline-block px-2 py-0.5 sharp-corners border border-green-200 bg-green-50 text-green-700 font-bold text-[10px] tracking-wider">{status}</span>;
                case 'PENDING': return <span className="inline-block px-2 py-0.5 sharp-corners border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold text-[10px] tracking-wider">PENDING</span>;
                case 'SUSPENDED':
                case 'INACTIVE': return <span className="inline-block px-2 py-0.5 sharp-corners border border-red-200 bg-red-50 text-red-700 font-bold text-[10px] tracking-wider">{status}</span>;
            }
        }
    };

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`flex flex-col flex-1 overflow-hidden transition-colors ${isDark ? 'glass-panel' : 'bg-white sharp-corners border border-black'}`}
        >
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className={`border-b text-xs uppercase tracking-wider ${isDark ? 'border-white/10 text-text-secondary bg-black/40' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>
                            <th className="p-4 font-semibold w-24">User ID</th>
                            <th className="p-4 font-semibold">User Details</th>
                            <th className="p-4 font-semibold w-32">Role</th>
                            <th className="p-4 font-semibold w-40">Joined</th>
                            <th className="p-4 font-semibold w-32">Status</th>
                            <th className="p-4 font-semibold w-20 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode='popLayout'>
                            {users.map((user, i) => (
                                <motion.tr
                                    layout
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    key={user.id}
                                    onClick={() => navigate(`/admin/users/${user.id}`)}
                                    className={`border-b group transition-colors cursor-pointer
                                        ${isDark ? 'border-white/5 hover:bg-primary/5' : 'border-gray-200 hover:bg-slate-50'}
                                    `}
                                >
                                    <td className="p-4">
                                        <span className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-600 font-medium'}`}>{user.id}</span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar logic */}
                                            {user.avatarUrl ? (
                                                <img src={user.avatarUrl} alt={user.name} className={`w-10 h-10 object-cover ${isDark && user.role === 'ADMIN' ? 'rounded-full ring-2 ring-primary ring-offset-2 ring-offset-black' : isDark ? 'rounded-full' : 'rounded-sm border border-gray-300'}`} />
                                            ) : (
                                                <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm tracking-wider
                                                    ${getAvatarColor(user.name, isDark)} 
                                                    ${isDark ? 'text-gray-300' : 'text-black border border-gray-300'}
                                                    ${isDark && user.role === 'ADMIN' ? 'rounded-full ring-2 ring-primary ring-offset-2 ring-offset-black' : isDark ? 'rounded-full' : 'rounded-sm'}
                                                `}>
                                                    {getInitials(user.name)}
                                                </div>
                                            )}

                                            <div className="flex flex-col">
                                                <span className={`font-medium text-sm ${isDark ? 'text-gray-200 group-hover:text-primary transition-colors' : 'text-black font-bold'}`}>{user.name}</span>
                                                <span className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{user.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        {renderRoleBadge(user.role)}
                                    </td>

                                    <td className="p-4">
                                        <div className={`font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {new Date(user.registrationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        {renderStatus(user.status)}
                                    </td>

                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${user.id}`); }}
                                                className={`p-1.5 transition-colors ${isDark ? 'hover:bg-white/10 rounded-sm text-gray-400 hover:text-white' : 'hover:bg-gray-200 hover:text-black sharp-corners text-gray-600'}`}
                                                title="View Details"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </button>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={`p-1.5 transition-colors ${isDark ? 'hover:bg-white/10 rounded-sm text-gray-400 hover:text-white' : 'hover:bg-gray-200 hover:text-black sharp-corners text-gray-600'}`}
                                                title="Edit User"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={`p-1.5 transition-colors ${isDark ? 'hover:bg-danger/20 hover:text-danger rounded-sm text-gray-400' : 'hover:bg-red-100 hover:text-red-600 sharp-corners text-gray-600'}`}
                                                title="Suspend"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">block</span>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>

                        {users.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-16 text-center">
                                    <span className={`material-symbols-outlined text-4xl mb-2 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>manage_accounts</span>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No users found matching your filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Sticky Table Footer */}
            <div className={`p-4 border-t flex justify-between items-center text-xs mt-auto ${isDark ? 'border-white/5 bg-black/40 text-gray-500' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                <div>
                    Showing <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{users.length > 0 ? ((page - 1) * rowsPerPage) + 1 : 0}</span> to <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{Math.min(page * rowsPerPage, totalRows)}</span> of <span className={`font-bold font-mono ${isDark ? 'text-gray-300' : 'text-black'}`}>{totalRows}</span> users
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        <span>Rows per page:</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{rowsPerPage}</span>
                    </div>

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
