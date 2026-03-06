export interface UserDetail {
    id: string;
    name: string;
    avatarUrl?: string; // Optional
    role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
    email: string;
    phone: string;
    location?: string;
    registeredDate: string; // ISO format
    lastLogin: {
        timestamp: string; // ISO format
        ip?: string;
    };
    preferences?: string[];
}

export interface EnquiryRecord {
    id: string;
    event: string;
    date: string; // ISO format
    budget: string; // e.g., "$1,200" or numeric
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface SupportTicket {
    id: string;
    subject: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    date?: string; // ISO format
}

export interface UserAnalytics {
    avgResponseTime: string; // e.g., "4h 20m"
    avgRating: number; // e.g., 4.8
    walletBalance: string; // e.g., "$450.00"
    kycStatus: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
}
