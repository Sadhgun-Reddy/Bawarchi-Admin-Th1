import React, { useContext, useState, useMemo } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { UserStatsGrid } from './UserStatsGrid';
import { UserFilterBar } from './UserFilterBar';
import { UserTable } from './UserTable';

export type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';
export type UserStatus = 'VERIFIED' | 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED';

export interface User {
    id: string;
    avatarUrl?: string;
    name: string;
    email: string;
    role: UserRole;
    registrationDate: string;
    status: UserStatus;
}

// Mock Data
const MOCK_USERS: User[] = [
    { id: 'USR-9021', name: 'Michael Ross', email: 'michael.ross@example.com', role: 'ADMIN', registrationDate: new Date(Date.now() - 86400000 * 30).toISOString(), status: 'VERIFIED' },
    { id: 'USR-9022', name: 'Sarah Connor', email: 'sarah.c@techcorp.com', role: 'VENDOR', registrationDate: new Date(Date.now() - 86400000 * 15).toISOString(), status: 'ACTIVE' },
    { id: 'USR-9023', name: 'David Bowman', email: 'dbowman@discovery.com', role: 'CUSTOMER', registrationDate: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'PENDING' },
    { id: 'USR-9024', name: 'Ellen Ripley', email: 'eripley@weyland.com', role: 'VENDOR', registrationDate: new Date(Date.now() - 86400000 * 120).toISOString(), status: 'SUSPENDED' },
    { id: 'USR-9025', name: 'James Holden', email: 'jholden@rocinante.com', role: 'CUSTOMER', registrationDate: new Date().toISOString(), status: 'ACTIVE' },
    { id: 'USR-9026', name: 'Amos Burton', email: 'aburton@baltimore.com', role: 'CUSTOMER', registrationDate: new Date().toISOString(), status: 'INACTIVE' },
];

export const UserManagementPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [users] = useState<User[]>(MOCK_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');

    // Pagination (simplified for demo)
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    const paginatedUsers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredUsers.slice(start, start + rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full">
            {/* Page Header */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDark ? 'text-white' : 'text-black'}`}>
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight">User Management</h1>
                    <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-muted'} mt-1`}>
                        Manage roles, statuses, and profiles across the system.
                    </p>
                </div>
                <button className={`px-4 py-2 font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 ${isDark
                    ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white shadow-glow rounded-sm'
                    : 'bg-black text-white sharp-corners hover:bg-gray-800'
                    }`}>
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Invite User
                </button>
            </div>

            {/* Stats Grid */}
            <UserStatsGrid isDark={isDark} />

            {/* Main Data Container */}
            <div className="flex flex-col gap-4">
                <UserFilterBar
                    isDark={isDark}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    roleFilter={roleFilter}
                    onRoleChange={(r) => setRoleFilter(r as UserRole | 'all')}
                    statusFilter={statusFilter}
                    onStatusChange={(s) => setStatusFilter(s as UserStatus | 'all')}
                />

                <UserTable
                    users={paginatedUsers}
                    isDark={isDark}
                    totalRows={filteredUsers.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};
