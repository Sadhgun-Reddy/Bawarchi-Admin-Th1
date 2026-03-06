import React from 'react';
import { motion } from 'framer-motion';
import { UserDetail } from './types';

interface UserProfileCardProps {
    user: UserDetail;
    isDark: boolean;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, isDark }) => {
    const isSuspended = user.status === 'SUSPENDED';

    // Status rendering logic
    const renderStatusMarker = () => {
        if (isDark) {
            if (user.status === 'ACTIVE') return <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#050505] shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />;
            if (user.status === 'PENDING') return <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-warning border-2 border-[#050505] shadow-[0_0_10px_var(--color-warning)] animate-pulse" />;
            return <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-danger border-2 border-[#050505]" />;
        } else {
            if (user.status === 'ACTIVE') return <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center"><span className="material-symbols-outlined text-[12px] text-white">check</span></div>;
            if (user.status === 'PENDING') return <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 border-2 border-white" />;
            return <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center"><span className="material-symbols-outlined text-[12px] text-white">close</span></div>;
        }
    };

    const renderRoleBadge = () => {
        switch (user.role) {
            case 'ADMIN': return <span className={`px-2 py-0.5 text-xs tracking-widest font-bold ${isDark ? 'bg-primary/20 text-primary rounded-sm border border-primary/30' : 'bg-black text-white sharp-corners'}`}>ADMIN</span>;
            case 'VENDOR': return <span className={`px-2 py-0.5 text-xs tracking-widest font-bold ${isDark ? 'bg-blue-500/20 text-blue-400 rounded-sm' : 'bg-blue-100 text-blue-800 sharp-corners border border-blue-200'}`}>VENDOR</span>;
            case 'CUSTOMER': return <span className={`px-2 py-0.5 text-xs tracking-widest font-bold ${isDark ? 'bg-white/10 text-gray-300 rounded-sm' : 'bg-gray-100 text-gray-600 sharp-corners border border-gray-200'}`}>CUSTOMER</span>;
        }
    };

    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col md:flex-row gap-8 p-6 lg:p-8 transition-colors
                ${isDark ? 'glass-panel hover:shadow-glow' : 'bg-white sharp-corners border border-black'}
            `}
        >
            {/* Core Identity Area */}
            <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left min-w-[200px] border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-8 border-dashed border-gray-300 dark:border-white/10">
                <div className="relative mb-4 group cursor-pointer">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className={`w-28 h-28 object-cover transition-all
                                ${isDark
                                    ? `rounded-full ring-2 ring-primary ring-offset-4 ring-offset-[#050505] shadow-[0_0_15px_var(--color-primary)] ${isSuspended ? 'grayscale opacity-70' : ''}`
                                    : `rounded-sm border-2 border-black ${isSuspended ? 'grayscale opacity-70' : ''}`
                                }
                            `}
                        />
                    ) : (
                        <div className={`w-28 h-28 flex items-center justify-center font-bold text-3xl tracking-wider transition-all
                            ${isDark
                                ? `bg-indigo-900/50 text-indigo-300 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-[#050505] shadow-[0_0_15px_var(--color-primary)] ${isSuspended ? 'grayscale opacity-70' : ''}`
                                : `bg-indigo-50 text-indigo-700 border-2 border-black rounded-sm ${isSuspended ? 'grayscale opacity-70' : ''}`
                            }
                        `}>
                            {getInitials(user.name)}
                        </div>
                    )}

                    {/* Hover Camera Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                        ${isDark ? 'bg-black/60 rounded-full' : 'bg-white/80 rounded-sm'}
                    `}>
                        <span className={`material-symbols-outlined text-3xl ${isDark ? 'text-white' : 'text-black'}`}>photo_camera</span>
                    </div>

                    {renderStatusMarker()}
                </div>

                <h2 className={`font-display text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{user.name}</h2>
                <div className="flex flex-col gap-2 items-center md:items-start">
                    {renderRoleBadge()}
                    <span className={`font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.id}</span>
                </div>
            </div>

            {/* Attribute Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">

                {/* Attrs */}
                {[
                    { label: 'Email Address', value: user.email, icon: 'mail' },
                    { label: 'Phone Number', value: user.phone, icon: 'call' },
                    { label: 'Location', value: user.location || 'Not Specified', icon: 'location_on' },
                    { label: 'Registered On', value: new Date(user.registeredDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }), icon: 'calendar_today', mono: true },
                    { label: 'Last Login', value: new Date(user.lastLogin.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), icon: 'login', mono: true },
                    { label: 'Last Known IP', value: user.lastLogin.ip || 'Unknown', icon: 'router', mono: true },
                ].map((attr, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                        <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                            <span className="material-symbols-outlined text-[16px]">{attr.icon}</span>
                            <span>{attr.label}</span>
                        </div>
                        <div className={`text-sm ${attr.mono ? 'font-mono' : ''} ${isDark ? 'text-gray-200' : 'text-black font-medium'}`}>
                            {attr.value}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
