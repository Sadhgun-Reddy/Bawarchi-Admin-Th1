export interface ReviewDocument {
    id: string;
    name: string;
    size?: string;
    url: string;
}

export interface ReviewApplication {
    appId: string;
    businessName: string;
    ownerName: string;
    experience: string;
    capacity: string;
    address: string;
    documents: ReviewDocument[];
    gallery: string[]; // Image URLs
}

export interface VerificationState {
    checklist: {
        fssaiValidated: boolean;
        addressVerified: boolean;
        photosInspected: boolean;
        hygieneMet: boolean;
    };
    remarks: string;
}

export interface ReviewSubmission {
    appId: string;
    verification: VerificationState;
    decision: 'APPROVE' | 'REJECT';
}
