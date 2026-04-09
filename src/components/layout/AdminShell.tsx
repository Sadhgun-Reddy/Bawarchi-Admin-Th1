import React, { useState, useContext } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NavGroupType } from '../../types/navigation';
import { ThemeContext } from '../ThemeProvider';

// Navigation data matching available routes
const navGroups: NavGroupType[] = [
    {
        id: 'grp-ops',
        title: 'Operations',
        items: [
            { id: 'nav-dash', label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        ]
    },
    {
        id: 'grp-caterers',
        title: 'Caterer Management',
        items: [
            { id: 'nav-caterers', label: 'All Caterers', path: '/admin/caterers', icon: 'workspace_premium' },
            { id: 'nav-pending', label: 'Pending Approvals', path: '/admin/caterers/pending', icon: 'pending_actions', badge: { text: 'New', colorVariant: 'warning' } },
            { id: 'nav-complaints', label: 'Complaints', path: '/admin/caterers/complaints', icon: 'report_problem' },
        ]
    },
    {
        id: 'grp-moderation',
        title: 'Content Moderation',
        items: [
            { id: 'nav-menu-mod', label: 'Menu Moderation', path: '/admin/moderation/menu', icon: 'menu_book' },
            { id: 'nav-offers-mod', label: 'Offers Moderation', path: '/admin/moderation/offers', icon: 'local_offer' },
        ]
    },
    {
        id: 'grp-sys',
        title: 'System & Analytics',
        items: [
            { id: 'nav-users', label: 'User Management', path: '/admin/users', icon: 'manage_accounts' },
            { id: 'nav-reports', label: 'Reports', path: '/admin/reports', icon: 'lab_profile' },
            { id: 'nav-logs', label: 'Audit Logs', path: '/admin/audit-logs', icon: 'manage_search' },
        ]
    }
];

interface AdminShellProps {
    children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // Sidebar starts expanded on desktop, can be toggled
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className={`flex h-screen w-full overflow-hidden transition-colors duration-300 font-mono ${isDark ? 'bg-surface text-text-primary' : 'bg-white text-black'}`}>
            {/* Sidebar Navigation */}
            <Sidebar
                groups={navGroups}
                isCollapsed={isSidebarCollapsed}
            />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Header */}
                <TopBar
                    onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                {/* Scrollable Page Content Area */}
                <main className={`flex-1 overflow-y-auto relative ${isDark ? 'bg-surface' : ''}`}>
                    {isDark && (
                        <div className="absolute inset-0 z-0 pointer-events-none grid-bg-mask" />
                    )}
                    <div className="relative z-10 w-full h-full p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
