export interface PendingCaterer {
    appId: string;
    businessName: string;
    logoUrl?: string;
    ownerName: string;
    location: string;
    experienceYears: number;
    submittedDate: string;
    status: 'PENDING' | 'UNDER_REVIEW' | 'ONBOARDED' | 'REJECTED';
}

export type ApprovalsTab = 'ALL' | 'PENDING' | 'ONBOARDED' | 'REJECTED';

export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface ApprovalsState {
    searchQuery: string;
    activeTab: ApprovalsTab;
    pagination: PaginationState;
}
