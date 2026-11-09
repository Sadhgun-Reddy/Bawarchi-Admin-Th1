import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useMemo } from 'react';

import { ThemeContext } from '../../../components/ThemeProvider';
import { ComplaintsHeader } from './ComplaintsHeader';
import { ComplaintsStatsGrid } from './ComplaintsStatsGrid';
import { ManagementTabs } from './ManagementTabs';
import { ComplaintFilterBar } from './ComplaintFilterBar';
import { ComplaintTable } from './ComplaintTable';
import { ComplaintPagination } from './ComplaintPagination';
import { ComplaintsState, ComplaintFilters } from './types';

// Mock Data


import { useMockData } from "../../../context/MockDataContext";
export const CatererComplaintsPage: React.FC = () => {
    const { complaints: MOCK_COMPLAINTS } = useMockData();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    // @ts-ignore
    void navigate;

    const isDark = theme === 'dark';

    const [activeTab, setActiveTab] = useState<'COMPLAINTS' | 'PERFORMANCE' | 'REVIEWS'>('COMPLAINTS');

    const [state, setState] = useState<ComplaintsState>({
        filters: {
            searchQuery: '',
            status: 'all',
            issueType: 'all'
        },
        isFilterBarVisible: false,
        pagination: {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0
        }
    });

    const handleToggleFilters = () => {
        setState(prev => ({ ...prev, isFilterBarVisible: !prev.isFilterBarVisible }));
    };

    const handleUpdateFilters = (updates: Partial<ComplaintFilters>) => {
        setState(prev => ({
            ...prev,
            filters: { ...prev.filters, ...updates },
            pagination: { ...prev.pagination, currentPage: 1 } // Reset to page 1 on filter
        }));
    };

    const handlePageChange = (page: number) => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, currentPage: page }
        }));
    };

    const handleInvestigate = (complaintId: string) => {
        console.log(`Investigating constraint ID: ${complaintId}`);
        // Future routing: navigate(`/admin/caterers/complaints/investigate/${complaintId}`)
    };

    // Derived State (Filtering logic)
    const filteredData = useMemo(() => {
        const searchLower = state.filters.searchQuery.toLowerCase();
        return MOCK_COMPLAINTS.filter(complaint => {
            if (state.filters.status !== 'all' && complaint.status !== state.filters.status) return false;
            if (state.filters.issueType !== 'all' && complaint.issue.type !== state.filters.issueType) return false;

            if (searchLower === '') return true;

            return complaint.id.toLowerCase().includes(searchLower) ||
                complaint.catererName.toLowerCase().includes(searchLower) ||
                complaint.issue.description.toLowerCase().includes(searchLower);
        });
    }, [state.filters]);

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
                    <div className="absolute inset-0 grid-pattern-violet" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 h-full">
                {/* Header */}
                <ComplaintsHeader
                    onToggleFilters={handleToggleFilters}
                    isFiltersOpen={state.isFilterBarVisible}
                    isDark={isDark}
                />

                {/* Stats */}
                <ComplaintsStatsGrid isDark={isDark} />

                {/* Main Workspace Area */}
                <div className="flex flex-col gap-0 w-full mt-2">
                    {/* Module Tabs */}
                    <ManagementTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        isDark={isDark}
                    />

                    {/* Conditional Workspaces depending on active tab */}
                    {activeTab === 'COMPLAINTS' && (
                        <div className="flex flex-col shrink-0 mt-4">
                            <ComplaintFilterBar
                                isVisible={state.isFilterBarVisible}
                                filters={state.filters}
                                onUpdateFilters={handleUpdateFilters}
                                isDark={isDark}
                            />

                            <ComplaintTable
                                data={paginatedData}
                                onInvestigate={handleInvestigate}
                                isDark={isDark}
                            />

                            <ComplaintPagination
                                currentPage={state.pagination.currentPage}
                                itemsPerPage={state.pagination.itemsPerPage}
                                totalItems={filteredData.length}
                                onPageChange={handlePageChange}
                                isDark={isDark}
                            />
                        </div>
                    )}

                    {activeTab === 'PERFORMANCE' && (
                        <div className="p-12 text-center text-sm text-gray-500">
                            Performance dashboard module pending...
                        </div>
                    )}

                    {activeTab === 'REVIEWS' && (
                        <div className="p-12 text-center text-sm text-gray-500">
                            Customer reviews module pending...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
