import React, { useState, useContext, useMemo } from 'react';

import { ThemeContext } from '../../../components/ThemeProvider';
import { ComplaintsHeader } from './ComplaintsHeader';
import { ComplaintsStatsGrid } from './ComplaintsStatsGrid';
import { ManagementTabs } from './ManagementTabs';
import { ComplaintFilterBar } from './ComplaintFilterBar';
import { ComplaintTable } from './ComplaintTable';
import { ComplaintPagination } from './ComplaintPagination';
import { Complaint, ComplaintsState, ComplaintFilters } from './types';

// Mock Data
const MOCK_COMPLAINTS: Complaint[] = [
    {
        id: '#CMP-9021',
        catererName: 'Gourmet Spaces Catering',
        customer: { name: 'Sarah Jenkins', initials: 'SJ', avatarUrl: 'https://i.pravatar.cc/150?u=sarah' },
        issue: { type: 'LATE_DELIVERY', description: 'Order arrived 45 mins late' },
        date: '2025-10-15T14:30:00Z',
        status: 'OPEN'
    },
    {
        id: '#CMP-9022',
        catererName: 'Elite Banquets',
        customer: { name: 'Michael Chen', initials: 'MC' },
        issue: { type: 'FOOD_QUALITY', description: 'Cold appetizers' },
        date: '2025-10-15T09:15:00Z',
        status: 'INVESTIGATING'
    },
    {
        id: '#CMP-9023',
        catererName: 'Spice Route Services',
        customer: { name: 'Anita Desai', initials: 'AD', avatarUrl: 'https://i.pravatar.cc/150?u=anita' },
        issue: { type: 'HYGIENE', description: 'Foreign object in main course' },
        date: '2025-10-14T19:45:00Z',
        status: 'ESCALATED'
    },
    {
        id: '#CMP-9024',
        catererName: 'Fresh Bites Corp',
        customer: { name: 'David Smith', initials: 'DS' },
        issue: { type: 'MISSING_ITEM', description: 'Beverages not delivered' },
        date: '2025-10-13T12:00:00Z',
        status: 'RESOLVED'
    },
    {
        id: '#CMP-9025',
        catererName: 'Gourmet Spaces Catering',
        customer: { name: 'Linda Rodriguez', initials: 'LR' },
        issue: { type: 'STAFF_BEHAVIOR', description: 'Rude serving staff' },
        date: '2025-10-12T18:20:00Z',
        status: 'OPEN'
    }
];

export const CatererComplaintsPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
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
        return MOCK_COMPLAINTS.filter(complaint => {
            const matchStatus = state.filters.status === 'all' || complaint.status === state.filters.status;
            const matchIssue = state.filters.issueType === 'all' || complaint.issue.type === state.filters.issueType;

            const searchLower = state.filters.searchQuery.toLowerCase();
            const matchSearch = searchLower === '' ||
                complaint.id.toLowerCase().includes(searchLower) ||
                complaint.catererName.toLowerCase().includes(searchLower) ||
                complaint.issue.description.toLowerCase().includes(searchLower);

            return matchStatus && matchIssue && matchSearch;
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
