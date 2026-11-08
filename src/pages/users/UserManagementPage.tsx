import React, { useContext, useState, useMemo } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { UserStatsGrid } from './UserStatsGrid';
import { UserFilterBar } from './UserFilterBar';
import { UserTable } from './UserTable';
import { useMockData } from '../../context/MockDataContext';

export type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';
export type UserStatus = 'VERIFIED' | 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED';

export const UserManagementPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { users, setUsers } = useMockData();
    const isDark = theme === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const filteredUsers = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return users.filter(user => {
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            if (!matchesRole) return false;

            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            if (!matchesStatus) return false;

            if (lowerQuery === '') return true;

            const matchesSearch = user.name.toLowerCase().includes(lowerQuery) ||
                user.id.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery);

            return matchesSearch;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    const paginatedUsers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredUsers.slice(start, start + rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('');

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserEmail) return;
        setUsers(prev => [{
            id: `USR-${9000 + prev.length + 1}`,
            name: 'Pending User',
            email: newUserEmail,
            role: 'VENDOR',
            registrationDate: new Date().toISOString(),
            status: 'PENDING'
        }, ...prev]);
        setNewUserEmail('');
        setIsInviteModalOpen(false);
    };

    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full">
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className={`p-6 w-full max-w-md ${isDark ? 'bg-[#050505] border border-white/10' : 'bg-white border border-black'}`}>
                        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Invite New User</h2>
                        <form onSubmit={handleInvite}>
                            <input
                                type="email"
                                required
                                value={newUserEmail}
                                onChange={e => setNewUserEmail(e.target.value)}
                                placeholder="Email address"
                                className={`w-full p-2 mb-4 border ${isDark ? 'bg-black/50 border-white/20 text-white outline-none focus:border-[#d006f9]' : 'border-black outline-none focus:ring-1 focus:ring-black'}`}
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsInviteModalOpen(false)} className={`px-4 py-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Cancel</button>
                                <button type="submit" className={`px-4 py-2 ${isDark ? 'bg-[#d006f9] text-white font-bold' : 'bg-black text-white font-bold'}`}>Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDark ? 'text-white' : 'text-black'}`}>
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight">User Management</h1>
                    <p className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-muted'} mt-1`}>
                        Manage roles, statuses, and profiles across the system.
                    </p>
                </div>
                <button onClick={() => setIsInviteModalOpen(true)} className={`px-4 py-2 font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 ${isDark
                    ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white shadow-glow rounded-sm'
                    : 'bg-black text-white sharp-corners hover:bg-gray-800'
                    }`}>
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Invite User
                </button>
            </div>

            <UserStatsGrid isDark={isDark} />

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
