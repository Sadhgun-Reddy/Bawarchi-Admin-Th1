import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ModerationHeader } from './ModerationHeader';
import { ModerationTabs } from './ModerationTabs';
import { ModerationFilterBar } from './ModerationFilterBar';
import { MenuModerationTable } from './MenuModerationTable';
import { ModerationPagination } from './ModerationPagination';
import {  ModerationState, ModerationStatus } from './types';

// Mock Data Source


import { useMockData } from "../../context/MockDataContext";
export const MenuModerationPage: React.FC = () => {
    const { menuSubmissions: MOCK_SUBMISSIONS } = useMockData();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    // @ts-ignore
    void navigate;

    const isDark = theme === 'dark';

    const [state, setState] = useState<ModerationState>({
        activeTab: 'PENDING',
        searchQuery: '',
        pagination: {
            currentPage: 1,
            itemsPerPage: 8,
            totalRecords: 0
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => setIsLoading(false), 800);
    };

    const handleTabChange = (tab: ModerationStatus | 'HISTORY') => {
        setState(prev => ({
            ...prev,
            activeTab: tab,
            searchQuery: '', // Clear search on tab switch
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handleSearchChange = (query: string) => {
        setState(prev => ({
            ...prev,
            searchQuery: query,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handlePageChange = (page: number) => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, currentPage: page }
        }));
    };

    const handleReviewMenu = (id: string, status: ModerationStatus) => {
        console.log(`Action requested on ${id} (Status: ${status})`);
        // Example: navigate(`/admin/moderation/menu/${id}`)
    };

    // Derived State (Filtering logic)
    const filteredData = useMemo(() => {
        // ⚡ Bolt: Implemented early return short-circuiting.
        // Simple enum match exits early, avoiding expensive string matching if possible.
        const searchLower = state.searchQuery.toLowerCase();
        return MOCK_SUBMISSIONS.filter(sub => {
            // 1. Tab Status Match
            if (state.activeTab === 'HISTORY') {
                if (sub.status !== 'APPROVED' && sub.status !== 'REJECTED') return false;
            } else {
                if (sub.status !== state.activeTab) return false;
            }

            // 2. Fuzzy Search Match
            if (searchLower === '') return true;

            return sub.id.toLowerCase().includes(searchLower) ||
                sub.menuName.toLowerCase().includes(searchLower) ||
                sub.caterer.name.toLowerCase().includes(searchLower);
        });
    }, [state.activeTab, state.searchQuery]);

    // Derived Counts for Tabs
    const counts = useMemo(() => {
        return MOCK_SUBMISSIONS.reduce((acc, s) => {
            if (s.status === 'PENDING') acc.pending++;
            else if (s.status === 'FLAGGED') acc.flagged++;
            return acc;
        }, { pending: 0, flagged: 0 });
    }, []);

    // Sync Pagination totalRecords
    useEffect(() => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, totalRecords: filteredData.length }
        }));
    }, [filteredData.length]);

    // Paginated View
    const paginatedData = useMemo(() => {
        const start = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        return filteredData.slice(start, start + state.pagination.itemsPerPage);
    }, [filteredData, state.pagination.currentPage, state.pagination.itemsPerPage]);

    return (
        <div className={`relative min-h-full w-full p-6 lg:p-8 transition-colors duration-300
      ${isDark ? 'bg-[#050505]' : 'bg-[#E2E8F0]'}
    `}>
            {/* Dark Mode Ambient Overlay */}
            {isDark && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(208,6,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(208,6,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 h-full">
                {/* Header */}
                <ModerationHeader onRefresh={handleRefresh} isDark={isDark} />

                {/* Main Workspace Area */}
                <div className="flex flex-col gap-0 w-full mt-2">

                    <ModerationTabs
                        activeTab={state.activeTab}
                        onTabChange={handleTabChange}
                        counts={counts}
                        isDark={isDark}
                    />

                    <div className="flex flex-col shrink-0 mt-2 relative">
                        {/* Loading Overlay Shimmer */}
                        {isLoading && (
                            <div className="absolute inset-0 z-50 bg-black/10 backdrop-blur-sm rounded-sm flex items-center justify-center">
                                <span className={`material-symbols-outlined text-4xl animate-spin ${isDark ? 'text-[#d006f9]' : 'text-[#8c2bee]'}`}>
                                    sync
                                </span>
                            </div>
                        )}

                        <ModerationFilterBar
                            searchQuery={state.searchQuery}
                            onSearchChange={handleSearchChange}
                            pagination={state.pagination}
                            isDark={isDark}
                        />

                        <MenuModerationTable
                            data={paginatedData}
                            activeTab={state.activeTab}
                            onReviewMenu={handleReviewMenu}
                            isDark={isDark}
                        />

                        <ModerationPagination
                            currentPage={state.pagination.currentPage}
                            itemsPerPage={state.pagination.itemsPerPage}
                            totalRecords={state.pagination.totalRecords}
                            onPageChange={handlePageChange}
                            isDark={isDark}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
