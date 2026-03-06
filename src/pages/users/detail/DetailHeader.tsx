import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserDetail } from './types';

interface DetailHeaderProps {
    user: UserDetail;
    isDark: boolean;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ user, isDark }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Breadcrumb Info */}
            <div>
                <div className={`flex items-center gap-2 text-sm font-mono mb-1 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                    <NavLink to="/admin/users" className="hover:underline hover:text-primary transition-colors">Users</NavLink>
                    <span>/</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>{user.id}</span>
                </div>
                <h1 className={`font-display text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    {user.name} Profile
                </h1>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                <button className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 active:scale-95
                    ${isDark
                        ? 'bg-transparent text-gray-300 border border-white/20 hover:bg-white/10 hover:text-white rounded-sm'
                        : 'bg-white text-gray-700 border border-gray-300 sharp-corners hover:border-black hover:bg-gray-50'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                    Reset Password
                </button>

                <button className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 active:scale-95 group
                    ${isDark
                        ? user.status === 'SUSPENDED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)] rounded-sm'
                            : 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20 shadow-[0_0_10px_rgba(244,63,94,0.2)] hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] rounded-sm'
                        : user.status === 'SUSPENDED'
                            ? 'bg-green-100 text-green-700 border border-green-300 sharp-corners hover:bg-green-200'
                            : 'bg-red-50 text-red-600 border border-red-200 sharp-corners hover:bg-red-100 hover:border-red-300'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {user.status === 'SUSPENDED' ? 'how_to_reg' : 'block'}
                    </span>
                    {user.status === 'SUSPENDED' ? 'Activate User' : 'Suspend User'}
                </button>

                <button className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 active:scale-95 group
                    ${isDark
                        ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white shadow-glow rounded-sm'
                        : 'bg-black text-white sharp-corners hover:bg-gray-800 border border-black'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit Profile
                </button>

                <div className={`w-px h-6 mx-1 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}></div>

                {/* Dangerous Action */}
                <button className={`p-2 transition-all flex items-center justify-center active:scale-95
                    ${isDark
                        ? 'text-gray-400 hover:text-danger hover:bg-danger/10 rounded-sm'
                        : 'text-gray-500 hover:text-red-600 hover:bg-red-50 sharp-corners border border-transparent hover:border-red-200'
                    }`}
                    title="Delete Account"
                >
                    <span className="material-symbols-outlined">delete_forever</span>
                </button>
            </div>
        </div>
    );
};
