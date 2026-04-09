import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ModerationHeader } from './ModerationHeader';
import { ModerationTabs } from './ModerationTabs';
import { BlogModerationFilterBar } from './BlogModerationFilterBar';
import { BlogModerationTable } from './BlogModerationTable';
import { ModerationPagination } from './ModerationPagination';
import { BlogPostSubmission, BlogModerationState } from './types';
import { useNavigate } from 'react-router-dom';

// Mock Data Source
const MOCK_BLOG_POSTS: BlogPostSubmission[] = [
    {
        id: 'BLG-001',
        title: 'Top 10 Catering Trends for 2026',
        excerpt: 'Discover the latest trends shaping the catering industry this year...',
        caterer: { name: 'Gourmet Spaces Catering', logoUrl: 'https://i.pravatar.cc/150?u=gourmet', initials: 'GS' },
        category: 'TRENDS',
        submittedDate: '2026-03-10T09:30:00Z',
        status: 'PENDING'
    },
    {
        id: 'BLG-002',
        title: 'Food Safety Guidelines for Large Events',
        excerpt: 'Essential safety protocols every caterer should follow...',
        caterer: { name: 'Safe Serve Co.', initials: 'SS' },
        category: 'SAFETY',
        submittedDate: '2026-03-11T14:15:00Z',
        status: 'PENDING'
    },
    {
        id: 'BLG-003',
        title: 'Signature Vegan Recipes',
        excerpt: 'Plant-based dishes that wow your guests...',
        caterer: { name: 'Green Leaf Catering', logoUrl: 'https://i.pravatar.cc/150?u=green', initials: 'GL' },
        category: 'RECIPES',
        submittedDate: '2026-03-09T10:00:00Z',
        status: 'APPROVED'
    },
    {
        id: 'BLG-004',
        title: 'Gluten-Free Menu Planning',
        excerpt: 'How to create delicious gluten-free options...',
        caterer: { name: 'Healthy Bites', initials: 'HB' },
        category: 'DIETARY',
        submittedDate: '2026-03-08T16:45:00Z',
        status: 'APPROVED'
    },
    {
        id: 'BLG-005',
        title: 'Starting Your Catering Business',
        excerpt: 'A comprehensive guide for new caterers...',
        caterer: { name: 'Business Pro Catering', logoUrl: 'https://i.pravatar.cc/150?u=business', initials: 'BP' },
        category: 'BUSINESS',
        submittedDate: '2026-03-07T09:00:00Z',
        status: 'REJECTED'
    }
];

export const BlogModerationPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
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

    const handleTabChange = (tab: any) => {
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

    const handleCategoryChange = (category: any) => {
        setState(prev => ({
            ...prev,
            categoryFilter: category,
            pagination: { ...prev.pagination, currentPage: 1 }
        }));
    };

    const handleDateRangeChange = (range: any) => {
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
        return MOCK_BLOG_POSTS.filter(post => {
            const matchTab = post.status === state.activeTab;

            const searchLower = state.searchQuery.toLowerCase();
            const matchSearch = searchLower === '' ||
                post.id.toLowerCase().includes(searchLower) ||
                post.title.toLowerCase().includes(searchLower) ||
                post.caterer.name.toLowerCase().includes(searchLower);

            const matchCategory = state.categoryFilter === null || post.category === state.categoryFilter;

            return matchTab && matchSearch && matchCategory;
        });
    }, [state.activeTab, state.searchQuery, state.categoryFilter]);

    const counts = useMemo(() => {
        return {
            pending: MOCK_BLOG_POSTS.filter(s => s.status === 'PENDING').length,
            flagged: 0
        };
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
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 h-full">
                <ModerationHeader onRefresh={handleRefresh} isDark={isDark} />
                <div className="flex flex-col gap-0 w-full mt-2">
                    <ModerationTabs activeTab={state.activeTab as any} onTabChange={handleTabChange as any} counts={counts as any} isDark={isDark} />
                    <div className="flex flex-col shrink-0 mt-2 relative">
                        {isLoading && (
                            <div className="absolute inset-0 z-50 bg-black/10 backdrop-blur-sm rounded-sm flex items-center justify-center">
                                <span className={`material-symbols-outlined text-4xl animate-spin ${isDark ? 'text-[#d006f9]' : 'text-[#8c2bee]'}`}>sync</span>
                            </div>
                        )}
                        <BlogModerationFilterBar
                            searchQuery={state.searchQuery}
                            onSearchChange={handleSearchChange}
                            categoryFilter={state.categoryFilter as any}
                            onCategoryChange={handleCategoryChange as any}
                            dateRange={state.dateRange as any}
                            onDateRangeChange={handleDateRangeChange as any}
                            pagination={state.pagination}
                            isDark={isDark} />
                        <BlogModerationTable data={paginatedData as any} activeTab={state.activeTab as any} onReviewPost={handleReviewPost as any} isDark={isDark} />
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
