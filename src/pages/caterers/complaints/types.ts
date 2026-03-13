export type ComplaintStatus = 'OPEN' | 'INVESTIGATING' | 'ESCALATED' | 'RESOLVED';
export type IssueType = 'LATE_DELIVERY' | 'FOOD_QUALITY' | 'MISSING_ITEM' | 'STAFF_BEHAVIOR' | 'HYGIENE';

export interface ComplaintCustomer {
    name: string;
    avatarUrl?: string; // Optional avatar for the user
    initials: string;   // Fallback initials
}

export interface ComplaintIssue {
    type: IssueType;
    description: string;
}

export interface Complaint {
    id: string; // e.g., "#CMP-9021"
    catererName: string;
    customer: ComplaintCustomer;
    issue: ComplaintIssue;
    date: string; // ISO 8601 string sequence
    status: ComplaintStatus;
}

export interface ComplaintFilters {
    searchQuery: string;
    status: ComplaintStatus | 'all';
    issueType: IssueType | 'all';
}

// State container for the Page Orchestrator
export interface ComplaintsState {
    filters: ComplaintFilters;
    isFilterBarVisible: boolean;
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
    };
}
