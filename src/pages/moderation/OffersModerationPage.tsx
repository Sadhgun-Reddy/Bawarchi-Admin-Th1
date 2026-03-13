import React, { useState, useContext, useMemo, useEffect } from 'react';
import { ThemeContext } from '../../components/ThemeProvider';
import { OffersModerationHeader } from './OffersModerationHeader';
import { OffersModerationTabs } from './OffersModerationTabs';
import { OffersDataTable } from './OffersDataTable';
import { ModerationPagination } from './ModerationPagination';
import { OfferSubmission, OffersModerationState, OfferStatus } from './types';

// Mock Data
const MOCK_OFFERS: OfferSubmission[] = [
    {
        id: '#OFF-9281',
        title: 'Diwali Corporate Feast',
        caterer: { name: 'Spice Route Catering', logoUrl: 'https://i.pravatar.cc/150?u=1' },
        discount: { type: 'PERCENTAGE', value: '20% OFF' },
        validity: 'Oct 20 - Nov 10',
        submittedAt: '2 hrs ago',
        status: 'PENDING'
    },
    {
        id: '#OFF-9282',
        title: 'Premium Wedding Package',
        caterer: { name: 'Royal Bites' },
        discount: { type: 'FIXED_PRICE', value: '$500 OFF' },
        validity: 'Nov 01 - Dec 31',
        submittedAt: '3 hrs ago',
        status: 'PENDING'
    },
    {
        id: '#OFF-9283',
        title: 'Summer Getaway Party',
        caterer: { name: 'Fresh Seasons', logoUrl: 'https://i.pravatar.cc/150?u=2' },
        discount: { type: 'FREE_ITEM', value: 'Free Dessert Bar' },
        validity: 'Jun 01 - Aug 31',
        submittedAt: '1 day ago',
        status: 'APPROVED'
    },
    {
        id: '#OFF-9284',
        title: 'Weekend Breakfast Special',
        caterer: { name: 'Morning Glory Caters' },
        discount: { type: 'BUNDLE', value: 'Buy 50 Get 10 Free' },
        validity: 'Ongoing',
        submittedAt: '5 days ago',
        status: 'REJECTED'
    },
    {
        id: '#OFF-9285',
        title: 'Year End Gala Offer',
        caterer: { name: 'Star Catering' },
        discount: { type: 'PERCENTAGE', value: '15% OFF' },
        validity: 'Dec 15 - Dec 31',
        submittedAt: '1 week ago',
        status: 'PENDING'
    }
];

export const OffersModerationPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [state, setState] = useState<OffersModerationState>({
        activeTab: 'PENDING',
        searchQuery: '',
        pagination: {
            currentPage: 1,
            itemsPerPage: 10,
            totalRecords: 0
        }
    });

    const handleTabChange = (tab: OfferStatus) => {
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

    const handleReviewOffer = (offerId: string) => {
        console.log(`Navigating to review protocol for Offer ID: ${offerId}`);
        // In a real app, logic to expand side-panel or navigate
    };

    // Derived State
    const filteredOffers = useMemo(() => {
        return MOCK_OFFERS.filter(offer => offer.status === state.activeTab);
    }, [state.activeTab]);

    const pendingCount = useMemo(() => {
        return MOCK_OFFERS.filter(offer => offer.status === 'PENDING').length;
    }, []);

    // Sync Pagination
    useEffect(() => {
        setState(prev => ({
            ...prev,
            pagination: { ...prev.pagination, totalRecords: filteredOffers.length }
        }));
    }, [filteredOffers.length]);

    const paginatedOffers = useMemo(() => {
        const start = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        return filteredOffers.slice(start, start + state.pagination.itemsPerPage);
    }, [filteredOffers, state.pagination.currentPage, state.pagination.itemsPerPage]);

    return (
        <div className={`relative min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-[#050505]' : 'bg-[#E2E8F0]'}`}>
            {/* Dark Mode Ambient Environment */}
            {isDark && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(127,13,242,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(127,13,242,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
                </div>
            )}

            <div className="relative z-10 w-full h-full p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-[1400px]">
                    <OffersModerationHeader
                        stats={{ totalQueueCount: pendingCount, avgReviewTimeMinutes: 12 }}
                        isDark={isDark}
                    />

                    {/* Main Data Panel with conditional glass/sharp styling */}
                    <div className={`w-full mt-4 flex flex-col p-6 overflow-hidden ${isDark
                            ? 'bg-black/80 backdrop-blur-xl border border-[#7f0df2]/50 shadow-[0_0_30px_rgba(127,13,242,0.1)] rounded-xl'
                            : 'bg-white border border-[#140d1b] sharp-corners shadow-sm'
                        }`}>

                        <OffersModerationTabs
                            activeTab={state.activeTab}
                            onTabChange={handleTabChange}
                            pendingCount={pendingCount}
                            isDark={isDark}
                        />

                        <OffersDataTable
                            data={paginatedOffers}
                            isDark={isDark}
                            onReviewOffer={handleReviewOffer}
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
