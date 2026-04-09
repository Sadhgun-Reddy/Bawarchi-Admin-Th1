import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { ModerationHeader } from './ModerationHeader';
import { ModerationTabs } from './ModerationTabs';
import { BlogModerationFilterBar } from './BlogModerationFilterBar';
import { BlogModerationTable } from './BlogModerationTable';
import { ModerationPagination } from './ModerationPagination';
import { BlogPostSubmission, BlogModerationState, BlogStatus, BlogCategory } from './types';

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
    },
];

export const BlogModerationPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [state, setState] = useState<BlogModerationState>({
        activeTab: 'PENDING',
        searchQuery: '',
        categoryFilter: null,
        dateRange: { start: null, end: null },
