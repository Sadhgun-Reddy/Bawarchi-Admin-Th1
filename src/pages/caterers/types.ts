export type CatererStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'ARCHIVED';

export interface Caterer {
    id: string; // e.g., "#BW-0012"
    businessName: string;
    logoUrl?: string;
    sinceYear: string;
    location: string;
    rating: number; // e.g., 4.8
    enquiriesCount: number;
    viewCount: string; // Formatting handled API side or visually (e.g., "3.5k")
    status: CatererStatus;
}

export interface CatererManagementState {
    activeTab: CatererStatus | 'ALL';
    searchQuery: string;
    pagination: {
        currentPage: number;
        totalRecords: number;
        rowsPerPage: number;
    };
}

export interface CatererStats {
    totalApproved: number;
    avgNetworkRating: number;
    totalEnquiriesVolume: number;
    globalProfileViews: string;
}
