import React from 'react';
import { motion } from 'framer-motion';
import { UserRole, UserStatus } from './UserManagementPage';

interface UserFilterBarProps {
    isDark: boolean;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    roleFilter: UserRole | 'all';
    onRoleChange: (val: string) => void;
    statusFilter: UserStatus | 'all';
    onStatusChange: (val: string) => void;
}

export const UserFilterBar: React.FC<UserFilterBarProps> = ({
    isDark, searchQuery, onSearchChange, roleFilter, onRoleChange, statusFilter, onStatusChange
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors
                ${isDark ? 'glass-panel text-white' : 'bg-white text-black sharp-corners border border-black'}
            `}
        >
            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] transition-colors
                    ${isDark ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-500 group-focus-within:text-black'}
                `}>search</span>
                <input
                    type="text"
                    placeholder="Search name, ID, or email..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 outline-none transition-all
                        ${isDark
                            ? 'bg-black/40 border border-white/10 text-white focus:border-primary rounded-sm placeholder-gray-500 focus:shadow-[0_0_8px_var(--color-primary)]'
                            : 'bg-transparent border border-gray-300 text-black sharp-corners focus:border-black placeholder-gray-500 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                        }
                    `}
                />
            </div>

            {/* Filters & Actions */}
            <div className="flex w-full md:w-auto flex-wrap items-center gap-3">

                {/* Role Dropdown */}
                <div className="relative flex-1 md:flex-none min-w-[140px]">
                    <select
                        value={roleFilter}
                        onChange={(e) => onRoleChange(e.target.value)}
                        className={`w-full appearance-none pl-3 pr-8 py-2 outline-none text-sm transition-colors cursor-pointer
                            ${isDark
                                ? 'bg-black/40 border border-white/10 text-white focus:border-primary hover:bg-white/5 rounded-sm'
                                : 'bg-transparent border border-gray-300 text-black sharp-corners focus:border-black hover:bg-gray-50'
                            }
                        `}
                    >
                        <option value="all" className="text-black">All Roles</option>
                        <option value="ADMIN" className="text-black">Admin</option>
                        <option value="VENDOR" className="text-black">Vendor</option>
                        <option value="CUSTOMER" className="text-black">Customer</option>
                    </select>
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-[18px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        filter_list
                    </span>
                </div>

                {/* Status Dropdown */}
                <div className="relative flex-1 md:flex-none min-w-[140px]">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className={`w-full appearance-none pl-3 pr-8 py-2 outline-none text-sm transition-colors cursor-pointer
                            ${isDark
                                ? 'bg-black/40 border border-white/10 text-white focus:border-primary hover:bg-white/5 rounded-sm'
                                : 'bg-transparent border border-gray-300 text-black sharp-corners focus:border-black hover:bg-gray-50'
                            }
                        `}
                    >
                        <option value="all" className="text-black">All Statuses</option>
                        <option value="VERIFIED" className="text-black">Verified</option>
                        <option value="ACTIVE" className="text-black">Active</option>
                        <option value="PENDING" className="text-black">Pending</option>
                        <option value="SUSPENDED" className="text-black">Suspended</option>
                    </select>
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-[18px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        tune
                    </span>
                </div>

                {/* Export Action */}
                <button className={`flex-1 md:flex-none px-4 py-2 font-bold transition-all flex items-center justify-center gap-2 active:scale-95 text-sm
                    ${isDark
                        ? 'bg-transparent text-gray-300 border border-white/20 hover:bg-white/10 hover:text-white rounded-sm'
                        : 'bg-gray-100 text-black border border-gray-300 sharp-corners hover:border-black hover:bg-gray-200'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                </button>
            </div>
        </motion.div>
    );
};
