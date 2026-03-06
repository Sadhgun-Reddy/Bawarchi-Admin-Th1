import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../components/ThemeProvider';
import { DetailHeader } from './DetailHeader';
import { UserProfileCard } from './UserProfileCard';
import { EnquiriesHistoryTable } from './EnquiriesHistoryTable';
import { SupportTicketsTable } from './SupportTicketsTable';
import { UserAnalyticsFooter } from './UserAnalyticsFooter';
import { UserDetail, EnquiryRecord, SupportTicket, UserAnalytics } from './types';

// Mock Fetcher
const getMockUserData = (): { user: UserDetail, enquiries: EnquiryRecord[], tickets: SupportTicket[], analytics: UserAnalytics } => ({
    user: {
        id: '#USR-9021',
        name: 'Michael Ross',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        email: 'michael.ross@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        registeredDate: new Date(Date.now() - 31536000000).toISOString(),
        lastLogin: {
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            ip: '192.168.1.42'
        },
        preferences: ['Marketing Emails', 'SMS Alerts']
    },
    enquiries: [
        { id: 'ENQ-001', event: 'Corporate Retreat', date: new Date().toISOString(), budget: '$1,200', status: 'COMPLETED' },
        { id: 'ENQ-002', event: 'Wedding Catering', date: new Date(Date.now() - 86400000).toISOString(), budget: '$5,500', status: 'PENDING' }
    ],
    tickets: [
        { id: 'TCK-992', subject: 'Refund Request', priority: 'HIGH', status: 'OPEN', date: new Date().toISOString() },
        { id: 'TCK-991', subject: 'Menu Missing', priority: 'LOW', status: 'RESOLVED', date: new Date(Date.now() - 172800000).toISOString() }
    ],
    analytics: {
        avgResponseTime: '2h 15m',
        avgRating: 4.8,
        walletBalance: '$450.00',
        kycStatus: 'VERIFIED'
    }
});

export const UserDetailPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [data, setData] = useState<{ user: UserDetail, enquiries: EnquiryRecord[], tickets: SupportTicket[], analytics: UserAnalytics } | null>(null);

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            const mockData = getMockUserData();
            // Optionally override ID to match param if provided
            if (userId) {
                mockData.user.id = userId;
            }
            setData(mockData);
        }, 300);
    }, [userId]);

    if (!data) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <span className={`material-symbols-outlined animate-spin text-4xl ${isDark ? 'text-primary' : 'text-black'}`}>sync</span>
            </div>
        );
    }

    const { user, enquiries, tickets, analytics } = data;
    const isSuspended = user.status === 'SUSPENDED';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full"
        >
            <DetailHeader user={user} isDark={isDark} />

            {isSuspended && (
                <div className={`p-4 rounded-sm border ${isDark ? 'bg-danger/10 border-danger/30 text-danger' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">warning</span>
                        <span className="font-bold">Account Suspended</span>
                    </div>
                    <p className="text-sm mt-1">This user's account has been suspended. They cannot log in or perform any actions until their status is restored.</p>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <UserProfileCard user={user} isDark={isDark} />

                {/* History Split View */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <EnquiriesHistoryTable records={enquiries} isDark={isDark} />
                    <SupportTicketsTable records={tickets} isDark={isDark} />
                </div>

                <UserAnalyticsFooter analytics={analytics} isDark={isDark} />
            </div>
        </motion.div>
    );
};
