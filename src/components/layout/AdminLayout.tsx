import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminShell } from './AdminShell';

export const AdminLayout: React.FC = () => {
    const location = useLocation();

    return (
        <AdminShell currentPath={location.pathname}>
            <Outlet />
        </AdminShell>
    );
};
