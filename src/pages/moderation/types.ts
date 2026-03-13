export type MenuCategory = 'WEDDING' | 'CORPORATE' | 'EVENTS' | 'KIDS' | 'FESTIVAL' | 'GALA';
export type ModerationStatus = 'PENDING' | 'FLAGGED' | 'APPROVED' | 'REJECTED';

// Root Entity representing the inbound menu item
export interface MenuSubmission {
    id: string; // e.g., "#MN-2049"
    menuName: string;
    caterer: {
        name: string;
        initial?: string;
        indicatorColor?: string; // For Mission Control status dots
    };
    category: MenuCategory;
    itemsCount: number;
    submittedAt: string; // ISO 8601 sequence string
    status: ModerationStatus;
}

// State boundary for the Page Orchestrator Context
export interface ModerationState {
    activeTab: ModerationStatus | 'HISTORY'; // 'HISTORY' encapsulates APPROVED / REJECTED records conceptually
    searchQuery: string;
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalRecords: number;
    };
}

// ==========================================
// OFFERS MODERATION TYPES
// ==========================================

export type OfferStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type DiscountType = 'PERCENTAGE' | 'FIXED_PRICE' | 'FREE_ITEM' | 'BUNDLE';

export interface OfferSubmission {
    id: string; // e.g., "#OFF-9281"
    title: string;
    caterer: {
        name: string;
        logoUrl?: string; // Avatar
    };
    discount: {
        type: DiscountType;
        value: string; // e.g., "20% OFF", "Free Dessert"
    };
    validity: string; // e.g., "Oct 20 - Nov 10"
    submittedAt: string; // ISO format or relative e.g., "2 hrs ago"
    status: OfferStatus;
}

export interface ModerationStats {
    totalQueueCount: number;
    avgReviewTimeMinutes: number;
}

export interface OffersModerationState {
    activeTab: OfferStatus;
    searchQuery: string;
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalRecords: number;
    };
}
