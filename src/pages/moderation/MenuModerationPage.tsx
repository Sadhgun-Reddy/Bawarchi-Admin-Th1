import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ModerationHeader } from './ModerationHeader';
import { ModerationTabs } from './ModerationTabs';
import { ModerationFilterBar } from './ModerationFilterBar';
import { MenuModerationTable } from './MenuModerationTable';
import { ModerationPagination } from './ModerationPagination';
import { MenuSubmission, ModerationState, ModerationStatus } from './types';

// Mock Data Source
const MOCK_SUBMISSIONS: MenuSubmission[] = [
    {
        id: '#MN-2049',
        menuName: 'Signature Continental Buffet',
        caterer: { name: 'Gourmet Spaces Catering', initial: 'G', indicatorColor: 'bg-emerald-400' },
        category: 'CORPORATE',
        itemsCount: 42,
        submittedAt: '2025-10-15T09:30:00Z',
        status: 'PENDING'
    },
    {
        id: '#MN-2050',
        menuName: 'Artisan Vegan Selection',
        caterer: { name: 'Green Leaf Co.', initial: 'G', indicatorColor: 'bg-emerald-400' },
        category: 'WEDDING',
        itemsCount: 28,
        submittedAt: '2025-10-14T14:15:00Z',
        status: 'PENDING'
    },
    {
        id: '#MN-2045',
        menuName: 'Kids Birthday Special',
        caterer: { name: 'Joyful Bites', initial: 'J', indicatorColor: 'bg-amber-400' },
        category: 'KIDS',
        itemsCount: 15,
        submittedAt: '2025-10-14T10:00:00Z',
        status: 'FLAGGED'
    },
    {
        id: '#MN-2040',
        menuName: 'Diwali Grand Feast',
        caterer: { name: 'Spice Route Services', initial: 'S', indicatorColor: 'bg-emerald-400' },
        category: 'FESTIVAL',
        itemsCount: 55,
        submittedAt: '2025-10-12T16:45:00Z',
        status: 'APPROVED'
    },
    {
        id: '#MN-2038',
        menuName: 'Executive Box Lunches',
        caterer: { name: 'QuickServe Meals', initial: 'Q', indicatorColor: 'bg-rose-400' },
        category: 'CORPORATE',
        itemsCount: 8,
        submittedAt: '2025-10-10T09:00:00Z',
        status: 'REJECTED'
    }
];

export const MenuModerationPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
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
        return MOCK_SUBMISSIONS.filter(sub => {
            // 1. Tab Status Match
            let matchTab = false;
            if (state.activeTab === 'HISTORY') {
                matchTab = sub.status === 'APPROVED' || sub.status === 'REJECTED';
            } else {
                matchTab = sub.status === state.activeTab;
            }

            // 2. Fuzzy Search Match
            const searchLower = state.searchQuery.toLowerCase();
            const matchSearch = searchLower === '' ||
                sub.id.toLowerCase().includes(searchLower) ||
                sub.menuName.toLowerCase().includes(searchLower) ||
                sub.caterer.name.toLowerCase().includes(searchLower);

            return matchTab && matchSearch;
        });
    }, [state.activeTab, state.searchQuery]);

    // Derived Counts for Tabs
    const counts = useMemo(() => {
        return {
            pending: MOCK_SUBMISSIONS.filter(s => s.status === 'PENDING').length,
            flagged: MOCK_SUBMISSIONS.filter(s => s.status === 'FLAGGED').length
        };
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
