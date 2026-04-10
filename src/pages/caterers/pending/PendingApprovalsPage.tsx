import React, { useState, useContext, useMemo } from 'react';
import { ThemeContext } from '../../../components/ThemeProvider';
import { ApprovalsHeader } from './ApprovalsHeader';
import { LifecycleTabs } from './LifecycleTabs';
import { ApprovalsTable } from './ApprovalsTable';
import { PaginationFooter } from './PaginationFooter';
import { ApprovalsState, PendingCaterer, ApprovalsTab } from './types';

// Mock Data for structural testing
const MOCK_APPLICATIONS: PendingCaterer[] = [
    { appId: 'APP-1092', businessName: 'Gourmet Spaces', ownerName: 'Alice Chen', location: 'San Francisco, CA', experienceYears: 5, submittedDate: '2026-10-14', status: 'PENDING' },
    { appId: 'APP-1093', businessName: 'Fire Grill BBQ', logoUrl: 'https://i.pravatar.cc/150?u=grill', ownerName: 'Marcus Johnson', location: 'Austin, TX', experienceYears: 8, submittedDate: '2026-10-14', status: 'UNDER_REVIEW' },
    { appId: 'APP-1094', businessName: 'Sushi Master', ownerName: 'Kenji Sato', location: 'New York, NY', experienceYears: 12, submittedDate: '2026-10-15', status: 'ONBOARDED' },
    { appId: 'APP-1095', businessName: 'Vegan Delights', logoUrl: 'https://i.pravatar.cc/150?u=vegan', ownerName: 'Sarah Smith', location: 'Portland, OR', experienceYears: 3, submittedDate: '2026-10-16', status: 'PENDING' },
    { appId: 'APP-1096', businessName: 'Steakhouse Elite', ownerName: 'David Brown', location: 'Chicago, IL', experienceYears: 15, submittedDate: '2026-10-16', status: 'REJECTED' },
    { appId: 'APP-1097', businessName: 'Pasta Palace', ownerName: 'Maria Garcia', location: 'Miami, FL', experienceYears: 6, submittedDate: '2026-10-17', status: 'PENDING' },
];

export const PendingApprovalsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [state, setState] = useState<ApprovalsState>({
        searchQuery: '',
        activeTab: 'PENDING',
        pagination: {
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: MOCK_APPLICATIONS.length
        }
    });

    const handleSearch = (query: string) => {
        setState(prev => ({
            ...prev,
            searchQuery: query,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handleTabChange = (tab: ApprovalsTab) => {
        setState(prev => ({
            ...prev,
            activeTab: tab,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handlePageChange = (page: number) => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, currentPage: page }
        }));
    };

    const handleExport = () => {
        // In a real implementation: triggers CSV generation
    };

    const handleReview = (appId: string) => {
        // Typically opens a review modal or navigates to details
        void appId;
    };

    // Filter Logic
    const filteredData = useMemo(() => {
        return MOCK_APPLICATIONS.filter(app => {
            // 1. Tab Filtering (UNDER_REVIEW belongs in PENDING tab for now, or just exact match)
            // Let's assume PENDING tab shows both PENDING and UNDER_REVIEW
            let matchesTab = false;
            if (state.activeTab === 'ALL') matchesTab = true;
            else if (state.activeTab === 'PENDING') matchesTab = ['PENDING', 'UNDER_REVIEW'].includes(app.status);
            else matchesTab = app.status === state.activeTab;

            // 2. Search fuzzy matching
            const matchesSearch = state.searchQuery === '' ||
                app.appId.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                app.businessName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                app.ownerName.toLowerCase().includes(state.searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [state.activeTab, state.searchQuery]);

    // Paginate Data
    const paginatedData = useMemo(() => {
        const startIndex = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        return filteredData.slice(startIndex, startIndex + state.pagination.itemsPerPage);
    }, [filteredData, state.pagination.currentPage, state.pagination.itemsPerPage]);

    // Derive Badge Counts from raw data
    const counts = useMemo(() => {
        return {
            ALL: MOCK_APPLICATIONS.length,
            PENDING: MOCK_APPLICATIONS.filter(a => ['PENDING', 'UNDER_REVIEW'].includes(a.status)).length,
            ONBOARDED: MOCK_APPLICATIONS.filter(a => a.status === 'ONBOARDED').length,
            REJECTED: MOCK_APPLICATIONS.filter(a => a.status === 'REJECTED').length,
        };
    }, []);

    // Update derived total items
    const currentPagination = {
        ...state.pagination,
        totalItems: filteredData.length
    };

    return (
        <div className={`flex flex-col h-full w-full p-6 lg:p-8 gap-8 transition-colors duration-300
            ${isDark ? 'bg-[#050505] tech-grid' : 'bg-[#E2E8F0]'}
        `}>
            {/* Dark Mode Grid Background Overlay via CSS Variable or arbitrary class */}
            {isDark && (
                <div className="absolute inset-0 pointer-events-none z-0 grid-bg-mask opacity-50" />
            )}

            <div className="relative z-10 flex flex-col gap-8 flex-1">
                {/* Header section */}
                <ApprovalsHeader
                    searchQuery={state.searchQuery}
                    onSearch={handleSearch}
                    onExport={handleExport}
                    isDark={isDark}
                />

                {/* Tabs */}
                <LifecycleTabs
                    activeTab={state.activeTab}
                    onTabChange={handleTabChange}
                    counts={counts}
                    isDark={isDark}
                />

                {/* Table & Footer block */}
                <div className="flex flex-col gap-0 flex-1">
                    <ApprovalsTable
                        data={paginatedData}
                        onReview={handleReview}
                        isDark={isDark}
                    />

                    <PaginationFooter
                        pagination={currentPagination}
                        onPageChange={handlePageChange}
                        isDark={isDark}
                    />
                </div>
            </div>
        </div>
    );
};
