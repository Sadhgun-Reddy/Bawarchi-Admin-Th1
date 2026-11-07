import React, { useState, useContext, useMemo } from 'react';
import { ThemeContext } from '../../../components/ThemeProvider';
import { ApprovalsHeader } from './ApprovalsHeader';
import { LifecycleTabs } from './LifecycleTabs';
import { ApprovalsTable } from './ApprovalsTable';
import { PaginationFooter } from './PaginationFooter';
import { PendingCaterer, ApprovalsState, ApprovalsTab } from './types';

// Mock Data for structural testing


import { useMockData } from "../../../context/MockDataContext";
export const PendingApprovalsPage: React.FC = () => {
    const { catererApplications: MOCK_APPLICATIONS } = useMockData();
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
        const searchLower = state.searchQuery.toLowerCase();
        return MOCK_APPLICATIONS.filter((app: PendingCaterer) => {
            // 1. Tab Filtering (UNDER_REVIEW belongs in PENDING tab for now, or just exact match)
            // Let's assume PENDING tab shows both PENDING and UNDER_REVIEW
            let matchesTab = false;
            if (state.activeTab === 'ALL') matchesTab = true;
            else if (state.activeTab === 'PENDING') matchesTab = ['PENDING', 'UNDER_REVIEW'].includes(app.status);
            else matchesTab = app.status === state.activeTab;

            if (!matchesTab) return false;

            if (searchLower === '') return true;

            // 2. Search fuzzy matching
            return app.appId.toLowerCase().includes(searchLower) ||
                app.businessName.toLowerCase().includes(searchLower) ||
                app.ownerName.toLowerCase().includes(searchLower);
        });
    }, [state.activeTab, state.searchQuery]);

    // Paginate Data
    const paginatedData = useMemo(() => {
        const startIndex = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        return filteredData.slice(startIndex, startIndex + state.pagination.itemsPerPage);
    }, [filteredData, state.pagination.currentPage, state.pagination.itemsPerPage]);

    // Derive Badge Counts from raw data
    const counts = useMemo(() => {
        return MOCK_APPLICATIONS.reduce((acc: Record<string, number>, a: PendingCaterer) => {
            acc.ALL++;
            if (a.status === 'PENDING' || a.status === 'UNDER_REVIEW') {
                acc.PENDING++;
            } else if (a.status === 'ONBOARDED') {
                acc.ONBOARDED++;
            } else if (a.status === 'REJECTED') {
                acc.REJECTED++;
            }
            return acc;
        }, {
            ALL: 0,
            PENDING: 0,
            ONBOARDED: 0,
            REJECTED: 0,
        });
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
