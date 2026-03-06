import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../components/ThemeProvider';
import { ManagementHeader } from './ManagementHeader';
import { StatusTabs } from './StatusTabs';
import { CatererStatsOverview } from './CatererStatsOverview';
import { CatererTable } from './CatererTable';
import { Caterer, CatererManagementState, CatererStatus, CatererStats } from './types';

// Mock Data
const MOCK_STATS: CatererStats = {
    totalApproved: 142,
    avgNetworkRating: 4.8,
    totalEnquiriesVolume: 8430,
    globalProfileViews: '124.5k'
};

const MOCK_CATERERS: Caterer[] = [
    { id: 'BW-0012', businessName: 'Gourmet Kitchen', sinceYear: '2015', location: 'New York, NY', rating: 4.9, enquiriesCount: 342, viewCount: '12k', status: 'ACTIVE' },
    { id: 'BW-0013', businessName: 'Pasta Palace', sinceYear: '2018', location: 'Chicago, IL', rating: 4.5, enquiriesCount: 120, viewCount: '5.2k', status: 'ACTIVE' },
    { id: 'BW-0014', businessName: 'Spicy Bites', sinceYear: '2021', location: 'Austin, TX', rating: 4.2, enquiriesCount: 85, viewCount: '3.1k', status: 'PENDING' },
    { id: 'BW-0015', businessName: 'Veggie Delights', sinceYear: '2019', location: 'Seattle, WA', rating: 4.7, enquiriesCount: 210, viewCount: '8.4k', status: 'ACTIVE' },
    { id: 'BW-0016', businessName: 'BBQ Nation', sinceYear: '2012', location: 'Dallas, TX', rating: 4.6, enquiriesCount: 450, viewCount: '15.3k', status: 'REJECTED' },
    { id: 'BW-0017', businessName: 'Sweet Tooth Bakery', sinceYear: '2020', location: 'Miami, FL', rating: 4.8, enquiriesCount: 195, viewCount: '6.7k', status: 'ARCHIVED' },
    { id: 'BW-0018', businessName: 'Sushi Master', logoUrl: 'https://i.pravatar.cc/150?u=sushi', sinceYear: '2016', location: 'San Francisco, CA', rating: 4.9, enquiriesCount: 512, viewCount: '18k', status: 'ACTIVE' },
    { id: 'BW-0019', businessName: 'Taco Fiesta', sinceYear: '2022', location: 'Los Angeles, CA', rating: 4.3, enquiriesCount: 45, viewCount: '1.2k', status: 'PENDING' },
];

export const CatererManagementPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [state, setState] = useState<CatererManagementState>({
        activeTab: 'ACTIVE',
        searchQuery: '',
        pagination: {
            currentPage: 1,
            totalRecords: MOCK_CATERERS.length,
            rowsPerPage: 5
        }
    });

    const handleSearch = (query: string) => {
        setState(prev => ({ ...prev, searchQuery: query, pagination: { ...prev.pagination, currentPage: 1 } }));
    };

    const handleTabChange = (tab: CatererStatus | 'ALL') => {
        setState(prev => ({ ...prev, activeTab: tab, pagination: { ...prev.pagination, currentPage: 1 } }));
    };

    const handlePageChange = (page: number) => {
        setState(prev => ({ ...prev, pagination: { ...prev.pagination, currentPage: page } }));
    };

    const filteredCaterers = useMemo(() => {
        return MOCK_CATERERS.filter(caterer => {
            const matchesTab = state.activeTab === 'ALL' || caterer.status === state.activeTab;
            const matchesSearch = state.searchQuery === '' ||
                caterer.businessName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                caterer.id.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                caterer.location.toLowerCase().includes(state.searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [state.activeTab, state.searchQuery]);

    // Update total records after filtering for pagination
    const totalRecords = filteredCaterers.length;

    // Paginate
    const paginatedCaterers = useMemo(() => {
        const startIndex = (state.pagination.currentPage - 1) * state.pagination.rowsPerPage;
        return filteredCaterers.slice(startIndex, startIndex + state.pagination.rowsPerPage);
    }, [filteredCaterers, state.pagination.currentPage, state.pagination.rowsPerPage]);

    const statsCounts = useMemo(() => {
        return {
            ALL: MOCK_CATERERS.length,
            ACTIVE: MOCK_CATERERS.filter(c => c.status === 'ACTIVE').length,
            PENDING: MOCK_CATERERS.filter(c => c.status === 'PENDING').length,
            REJECTED: MOCK_CATERERS.filter(c => c.status === 'REJECTED').length,
            ARCHIVED: MOCK_CATERERS.filter(c => c.status === 'ARCHIVED').length,
        };
    }, []);

    return (
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full min-h-full">
            <ManagementHeader
                isDark={isDark}
                searchQuery={state.searchQuery}
                onSearch={handleSearch}
            />

            {/* Stats Overview is featured in Dark theme */}
            <AnimatePresence>
                {isDark && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <CatererStatsOverview stats={MOCK_STATS} isDark={isDark} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-0 flex-1">
                <StatusTabs
                    activeTab={state.activeTab}
                    onTabChange={handleTabChange}
                    counts={statsCounts}
                    isDark={isDark}
                />

                <CatererTable
                    caterers={paginatedCaterers}
                    isDark={isDark}
                    totalRows={totalRecords}
                    page={state.pagination.currentPage}
                    rowsPerPage={state.pagination.rowsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
