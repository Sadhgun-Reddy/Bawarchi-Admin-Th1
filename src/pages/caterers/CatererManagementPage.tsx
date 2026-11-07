import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../components/ThemeProvider';
import { ManagementHeader } from './ManagementHeader';
import { StatusTabs } from './StatusTabs';
import { CatererStatsOverview } from './CatererStatsOverview';
import { CatererTable } from './CatererTable';
import {  CatererManagementState, CatererStatus, CatererStats } from './types';
import { useMockData } from '../../context/MockDataContext';

// Mock Data
const MOCK_STATS: CatererStats = {
    totalApproved: 142,
    avgNetworkRating: 4.8,
    totalEnquiriesVolume: 8430,
    globalProfileViews: '124.5k'
};

export const CatererManagementPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { caterers } = useMockData();
    const isDark = theme === 'dark';

    const [state, setState] = useState<CatererManagementState>({
        activeTab: 'ACTIVE',
        searchQuery: '',
        pagination: {
            currentPage: 1,
            totalRecords: caterers.length,
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
        const query = state.searchQuery.toLowerCase();
        return caterers.filter(caterer => {
            const matchesTab = state.activeTab === 'ALL' || caterer.status === state.activeTab;
            if (!matchesTab) return false;

            if (query === '') return true;

            return caterer.businessName.toLowerCase().includes(query) ||
                caterer.id.toLowerCase().includes(query) ||
                caterer.location.toLowerCase().includes(query);
        });
    }, [caterers, state.activeTab, state.searchQuery]);

    // Update total records after filtering for pagination
    const totalRecords = filteredCaterers.length;

    // Paginate
    const paginatedCaterers = useMemo(() => {
        const startIndex = (state.pagination.currentPage - 1) * state.pagination.rowsPerPage;
        return filteredCaterers.slice(startIndex, startIndex + state.pagination.rowsPerPage);
    }, [filteredCaterers, state.pagination.currentPage, state.pagination.rowsPerPage]);

    const statsCounts = useMemo(() => {
        const initialCounts: Record<CatererStatus, number> = {
            ACTIVE: 0,
            PENDING: 0,
            REJECTED: 0,
            ARCHIVED: 0
        };

        const counts = caterers.reduce((acc, caterer) => {
            acc[caterer.status]++;
            return acc;
        }, initialCounts);

        return {
            ALL: caterers.length,
            ...counts,
        };
    }, [caterers]);

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
