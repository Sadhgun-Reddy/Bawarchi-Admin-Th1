import React, { useState, useContext } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NavGroupType } from '../../types/navigation';
import { ThemeContext } from '../ThemeProvider';

// Dummy navigation data conforming to Phase A structure
const navGroups: NavGroupType[] = [
    {
        id: 'grp-ops',
        title: 'Operations',
        items: [
            { id: 'nav-dash', label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
            { id: 'nav-orders', label: 'Live Orders', path: '/admin/orders', icon: 'receipt_long', badge: { text: '12', colorVariant: 'warning' } },
            { id: 'nav-kitchen', label: 'Kitchen Display', path: '/admin/kitchen', icon: 'restaurant' },
        ]
    },
    {
        id: 'grp-mgmt',
        title: 'Management',
        items: [
            { id: 'nav-caterers', label: 'Caterer Management', path: '/admin/caterers', icon: 'workspace_premium' },
            { id: 'nav-menu', label: 'Menu Items', path: '/admin/menu', icon: 'menu_book' },
            { id: 'nav-inventory', label: 'Inventory', path: '/admin/inventory', icon: 'inventory_2', badge: { text: 'Low', colorVariant: 'danger' } },
            { id: 'nav-staff', label: 'Staff & Shift', path: '/admin/staff', icon: 'group' },
        ]
    },
    {
        id: 'grp-sys',
        title: 'System',
        items: [
            { id: 'nav-users', label: 'User Management', path: '/admin/users', icon: 'manage_accounts' },
            { id: 'nav-settings', label: 'Configuration', path: '/admin/settings', icon: 'settings' },
            { id: 'nav-reports', label: 'Reports', path: '/admin/reports', icon: 'lab_profile' },
            { id: 'nav-logs', label: 'Audit Logs', path: '/admin/audit-logs', icon: 'manage_search' },
        ]
    }
];

interface AdminShellProps {
    children: React.ReactNode;
    currentPath?: string;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children, currentPath = '/dashboard' }) => {
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
