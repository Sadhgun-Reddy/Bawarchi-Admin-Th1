import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ModerationHeader } from './ModerationHeader';
import { ModerationTabs } from './ModerationTabs';
import { BlogModerationFilterBar } from './BlogModerationFilterBar';
import { BlogModerationTable } from './BlogModerationTable';
import { ModerationPagination } from './ModerationPagination';
import { BlogModerationState, ModerationStatus, BlogCategory, DateRange } from './types';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../../context/MockDataContext';

export const BlogModerationPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { blogPosts: MOCK_BLOG_POSTS } = useMockData();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    const [state, setState] = useState<BlogModerationState>({
        activeTab: 'PENDING',
        searchQuery: '',
        categoryFilter: null,
        dateRange: { start: null, end: null },
        pagination: {
            currentPage: 1,
            itemsPerPage: 5,
            totalRecords: 0
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 800);
    };

    const handleTabChange = (tab: ModerationStatus | 'HISTORY') => {
        setState(prev => ({
            ...prev,
            activeTab: tab,
            searchQuery: '',
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

    const handleCategoryChange = (category: BlogCategory | null) => {
        setState(prev => ({
            ...prev,
            categoryFilter: category,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handleDateRangeChange = (range: DateRange) => {
        setState(prev => ({
            ...prev,
            dateRange: range,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handlePageChange = (page: number) => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, currentPage: page }
        }));
    };

    const handleReviewPost = (id: string) => {
        navigate(`/admin/moderation/blog/${id}`);
    };

    const filteredData = useMemo(() => {
        const searchLower = state.searchQuery.toLowerCase();
        return MOCK_BLOG_POSTS.filter(post => {
            // ⚡ Bolt: Early returns to short-circuit expensive date and string operations
            if (state.activeTab === 'HISTORY') {
                if (post.status !== 'APPROVED' && post.status !== 'REJECTED') return false;
            } else if (post.status !== state.activeTab) {
                return false;
            }

            if (state.categoryFilter !== null && post.category !== state.categoryFilter) return false;

            if (state.dateRange.start || state.dateRange.end) {
                const postDate = new Date(post.submittedDate);
                if (state.dateRange.start && postDate < state.dateRange.start) return false;
                if (state.dateRange.end) {
                    // Set end date to end of day for inclusive filtering
                    const endOfDay = new Date(state.dateRange.end);
                    endOfDay.setHours(23, 59, 59, 999);
                    if (postDate > endOfDay) return false;
                }
            }

            if (searchLower === '') return true;

            return post.id.toLowerCase().includes(searchLower) ||
                post.title.toLowerCase().includes(searchLower) ||
                post.caterer.name.toLowerCase().includes(searchLower);
        });
    }, [state.activeTab, state.searchQuery, state.categoryFilter, state.dateRange]);

    const handleExportCSV = () => {
        const headers = ["Post ID", "Post Title", "Caterer Name", "Category", "Submitted Date", "Status"];
        const rows = filteredData.map(post => {
            const dateStr = new Date(post.submittedDate).toLocaleString();
            return [
                `"${post.id}"`,
                `"${post.title.replace(/"/g, '""')}"`,
                `"${post.caterer.name.replace(/"/g, '""')}"`,
                `"${post.category}"`,
                `"${dateStr}"`,
                `"${post.status}"`
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `blog-moderation-${dateStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const counts = useMemo(() => {
        return MOCK_BLOG_POSTS.reduce((acc, s) => {
            if (s.status === 'PENDING') acc.pending++;
            return acc;
        }, { pending: 0, flagged: 0 });
    }, []);

    useEffect(() => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, totalRecords: filteredData.length }
        }));
    }, [filteredData.length]);

    const paginatedData = useMemo(() => {
        const start = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        return filteredData.slice(start, start + state.pagination.itemsPerPage);
    }, [filteredData, state.pagination.currentPage, state.pagination.itemsPerPage]);

    return (
        <div className={`relative min-h-full w-full p-6 lg:p-8 transition-colors duration-300 ${isDark ? 'bg-[#050505]' : 'bg-[#E2E8F0]'}`}>
            {isDark && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-20 z-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(208, 6, 249, 0.15) 0%, transparent 70%)'
                    }}
                />
            )}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 h-full">
                <ModerationHeader
                    onRefresh={handleRefresh}
                    isDark={isDark}
                    title="Blog Moderation"
                    description="High-throughput queue for reviewing caterer-submitted blog posts."
                    onExportCSV={handleExportCSV}
                />
                <div className="flex flex-col gap-0 w-full mt-2">
                    <ModerationTabs activeTab={state.activeTab} onTabChange={handleTabChange} counts={counts} isDark={isDark} />
                    <div className="flex flex-col shrink-0 mt-2 relative">
                        {isLoading && (
                            <div className="absolute inset-0 z-50 bg-black/10 backdrop-blur-sm rounded-sm flex items-center justify-center">
                                <span className={`material-symbols-outlined text-4xl animate-spin ${isDark ? 'text-[#d006f9]' : 'text-[#8c2bee]'}`}>sync</span>
                            </div>
                        )}
                        <BlogModerationFilterBar
                            searchQuery={state.searchQuery}
                            onSearchChange={handleSearchChange}
                            categoryFilter={state.categoryFilter}
                            onCategoryChange={handleCategoryChange}
                            dateRange={state.dateRange}
                            onDateRangeChange={handleDateRangeChange}
                            pagination={state.pagination}
                            isDark={isDark} />
                        <BlogModerationTable data={paginatedData} activeTab={state.activeTab} onReviewPost={handleReviewPost} isDark={isDark} />
                        <ModerationPagination
                            currentPage={state.pagination.currentPage} itemsPerPage={state.pagination.itemsPerPage}
                            totalRecords={state.pagination.totalRecords} onPageChange={handlePageChange} isDark={isDark}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
