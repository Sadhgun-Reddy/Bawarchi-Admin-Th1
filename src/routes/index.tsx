// React routing
import { Navigate, RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { AuditLogsPage } from '../pages/logs/AuditLogsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { UserManagementPage } from '../pages/users/UserManagementPage';
import { UserDetailPage } from '../pages/users/detail/UserDetailPage';
import { CatererManagementPage } from '../pages/caterers/CatererManagementPage';
import { PendingApprovalsPage } from '../pages/caterers/pending/PendingApprovalsPage';
import { CatererReviewPage } from '../pages/caterers/review/CatererReviewPage';
import { CatererComplaintsPage } from '../pages/caterers/complaints/CatererComplaintsPage';
import { MenuModerationPage } from '../pages/moderation/MenuModerationPage';
import { OffersModerationPage } from '../pages/moderation/OffersModerationPage';
import { BlogModerationPage } from '../pages/moderation/BlogModerationPage';
import { BlogReviewPage } from '../pages/moderation/blog/BlogReviewPage';
import { AdminLayout } from '../components/layout/AdminLayout';

// We map out the requested paths:
// /admin/dashboard -> DashboardOverview
// /admin/audit-logs -> AuditLogsPage
// /admin/reports -> ReportsPage
// * -> Redirect to /admin/dashboard

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/admin/dashboard" replace />
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="dashboard" replace />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'audit-logs',
                element: <AuditLogsPage />
            },
            {
                path: 'reports',
                element: <ReportsPage />
            },
            {
                path: 'users',
                element: <UserManagementPage />
            },
            {
                path: 'users/:userId',
                element: <UserDetailPage />
            },
            {
                path: 'caterers',
                element: <CatererManagementPage />
            },
            {
                path: 'caterers/pending',
                element: <PendingApprovalsPage />
            },
            {
                path: 'caterers/review/:appId',
                element: <CatererReviewPage />
            },
            {
                path: 'caterers/complaints',
                element: <CatererComplaintsPage />
            },
            {
                path: 'moderation/menu',
                element: <MenuModerationPage />
            },
            {
                path: 'moderation/offers',
                element: <OffersModerationPage />
            },
            {
                path: 'moderation/blog',
                element: <BlogModerationPage />
            },
            {
                path: 'moderation/blog/:postId',
                element: <BlogReviewPage />
            },
            // Add showcase or other routes here later
            {
                path: '*',
                element: <Navigate to="dashboard" replace />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/admin/dashboard" replace />
    }
];
