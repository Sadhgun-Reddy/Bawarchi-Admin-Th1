import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuSubmission, OfferSubmission, BlogPostSubmission } from '../pages/moderation/types';
import { PendingCaterer } from '../pages/caterers/pending/types';
import { Complaint } from '../pages/caterers/complaints/types';

// Common Types
export type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';
export type UserStatus = 'VERIFIED' | 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED';

export interface User {
    id: string;
    avatarUrl?: string;
    name: string;
    email: string;
    role: UserRole;
    registrationDate: string;
    status: UserStatus;
}

export type CatererStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'ARCHIVED';

export interface Caterer {
    id: string;
    businessName: string;
    logoUrl?: string;
    sinceYear: string;
    location: string;
    rating: number;
    enquiriesCount: number;
    viewCount: string;
    status: CatererStatus;
}



export interface MockDataContextType {
    performanceData?: any;
    customerReviews?: any[];
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    caterers: Caterer[];
    setCaterers: React.Dispatch<React.SetStateAction<Caterer[]>>;
    blogPosts: BlogPostSubmission[];
    setBlogPosts: React.Dispatch<React.SetStateAction<BlogPostSubmission[]>>;
    menuSubmissions: MenuSubmission[];
    setMenuSubmissions: React.Dispatch<React.SetStateAction<MenuSubmission[]>>;
    offers: OfferSubmission[];
    setOffers: React.Dispatch<React.SetStateAction<OfferSubmission[]>>;
    catererApplications: PendingCaterer[];
    setCatererApplications: React.Dispatch<React.SetStateAction<PendingCaterer[]>>;
    complaints: Complaint[];
    setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

export const MOCK_PERFORMANCE_DATA = {
    resolutionData: [
        { name: 'Mon', resolved: 4, escalated: 1 },
        { name: 'Tue', resolved: 3, escalated: 0 },
        { name: 'Wed', resolved: 5, escalated: 2 },
        { name: 'Thu', resolved: 2, escalated: 0 },
        { name: 'Fri', resolved: 6, escalated: 1 },
        { name: 'Sat', resolved: 1, escalated: 0 },
        { name: 'Sun', resolved: 2, escalated: 0 },
    ],
    resolutionTimeData: [
        { name: 'Week 1', avgTime: 24 },
        { name: 'Week 2', avgTime: 18 },
        { name: 'Week 3', avgTime: 22 },
        { name: 'Week 4', avgTime: 16 },
    ],
    topCaterers: [
        { name: 'Elite Banquets', count: 12, trend: '+2' },
        { name: 'Spice Route Services', count: 8, trend: '-1' },
        { name: 'Fresh Bites Corp', count: 5, trend: '0' },
    ]
};

export const MOCK_CUSTOMER_REVIEWS = [
    { id: 1, caterer: 'Gourmet Spaces Catering', rating: 4, comment: 'Food was great, but delivery was a bit late.', date: '2025-10-14', author: 'Sarah J.' },
    { id: 2, caterer: 'Elite Banquets', rating: 2, comment: 'Food was cold by the time it arrived.', date: '2025-10-15', author: 'Michael C.' },
    { id: 3, caterer: 'Spice Route Services', rating: 5, comment: 'Excellent service and delicious food!', date: '2025-10-10', author: 'Anita D.' },
    { id: 4, caterer: 'Fresh Bites Corp', rating: 1, comment: 'Terrible experience. Missing items.', date: '2025-10-12', author: 'David S.' },
    { id: 5, caterer: 'Gourmet Spaces Catering', rating: 5, comment: 'Best catering service we have ever used.', date: '2025-10-09', author: 'Linda R.' },
];
export const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

const initialUsers: User[] = [
    { id: 'USR-9021', name: 'Michael Ross', email: 'michael.ross@example.com', role: 'ADMIN', registrationDate: new Date(Date.now() - 86400000 * 30).toISOString(), status: 'VERIFIED' },
    { id: 'USR-9022', name: 'Sarah Connor', email: 'sarah.c@techcorp.com', role: 'VENDOR', registrationDate: new Date(Date.now() - 86400000 * 15).toISOString(), status: 'ACTIVE' },
    { id: 'USR-9023', name: 'David Bowman', email: 'dbowman@discovery.com', role: 'CUSTOMER', registrationDate: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'PENDING' },
    { id: 'USR-9024', name: 'Ellen Ripley', email: 'eripley@weyland.com', role: 'VENDOR', registrationDate: new Date(Date.now() - 86400000 * 120).toISOString(), status: 'SUSPENDED' },
    { id: 'USR-9025', name: 'James Holden', email: 'jholden@rocinante.com', role: 'CUSTOMER', registrationDate: new Date().toISOString(), status: 'ACTIVE' },
    { id: 'USR-9026', name: 'Amos Burton', email: 'aburton@baltimore.com', role: 'CUSTOMER', registrationDate: new Date().toISOString(), status: 'INACTIVE' },
];

const initialCaterers: Caterer[] = [
    { id: 'BW-0012', businessName: 'Gourmet Kitchen', sinceYear: '2015', location: 'New York, NY', rating: 4.9, enquiriesCount: 342, viewCount: '12k', status: 'ACTIVE' },
    { id: 'BW-0013', businessName: 'Pasta Palace', sinceYear: '2018', location: 'Chicago, IL', rating: 4.5, enquiriesCount: 120, viewCount: '5.2k', status: 'ACTIVE' },
    { id: 'BW-0014', businessName: 'Spicy Bites', sinceYear: '2021', location: 'Austin, TX', rating: 4.2, enquiriesCount: 85, viewCount: '3.1k', status: 'PENDING' },
    { id: 'BW-0015', businessName: 'Veggie Delights', sinceYear: '2019', location: 'Seattle, WA', rating: 4.7, enquiriesCount: 210, viewCount: '8.4k', status: 'ACTIVE' },
    { id: 'BW-0016', businessName: 'BBQ Nation', sinceYear: '2012', location: 'Dallas, TX', rating: 4.6, enquiriesCount: 450, viewCount: '15.3k', status: 'REJECTED' },
    { id: 'BW-0017', businessName: 'Sweet Tooth Bakery', sinceYear: '2020', location: 'Miami, FL', rating: 4.8, enquiriesCount: 195, viewCount: '6.7k', status: 'ARCHIVED' },
    { id: 'BW-0018', businessName: 'Sushi Master', logoUrl: 'https://i.pravatar.cc/150?u=sushi', sinceYear: '2016', location: 'San Francisco, CA', rating: 4.9, enquiriesCount: 512, viewCount: '18k', status: 'ACTIVE' },
    { id: 'BW-0019', businessName: 'Taco Fiesta', sinceYear: '2022', location: 'Los Angeles, CA', rating: 4.3, enquiriesCount: 45, viewCount: '1.2k', status: 'PENDING' },
];

const initialBlogPosts: BlogPostSubmission[] = [
    { id: 'BLG-001', title: 'Top 10 Catering Trends for 2026', excerpt: 'Discover the latest trends shaping the catering industry this year...', caterer: { name: 'Gourmet Spaces Catering', logoUrl: 'https://i.pravatar.cc/150?u=gourmet', initials: 'GS' }, category: 'TRENDS', submittedDate: '2026-03-10T09:30:00Z', status: 'PENDING' },
    { id: 'BLG-002', title: 'Food Safety Guidelines for Large Events', excerpt: 'Essential safety protocols every caterer should follow...', caterer: { name: 'Safe Serve Co.', initials: 'SS' }, category: 'SAFETY', submittedDate: '2026-03-11T14:15:00Z', status: 'PENDING' },
    { id: 'BLG-003', title: 'Signature Vegan Recipes', excerpt: 'Plant-based dishes that wow your guests...', caterer: { name: 'Green Leaf Catering', logoUrl: 'https://i.pravatar.cc/150?u=green', initials: 'GL' }, category: 'RECIPES', submittedDate: '2026-03-09T10:00:00Z', status: 'APPROVED' },
    { id: 'BLG-004', title: 'Gluten-Free Menu Planning', excerpt: 'How to create delicious gluten-free options...', caterer: { name: 'Healthy Bites', initials: 'HB' }, category: 'DIETARY', submittedDate: '2026-03-08T16:45:00Z', status: 'APPROVED' },
    { id: 'BLG-005', title: 'Starting Your Catering Business', excerpt: 'A comprehensive guide for new caterers...', caterer: { name: 'Business Pro Catering', logoUrl: 'https://i.pravatar.cc/150?u=business', initials: 'BP' }, category: 'BUSINESS', submittedDate: '2026-03-07T09:00:00Z', status: 'REJECTED' }
];


const MOCK_SUBMISSIONS: MenuSubmission[] = [
    {
        id: '#MN-2049',
        menuName: 'Signature Continental Buffet',
        caterer: { name: 'Gourmet Spaces Catering', initial: 'G', indicatorColor: 'bg-emerald-400' },
        category: 'CORPORATE',
        itemsCount: 42,
        submittedAt: '2025-10-15T09:30:00Z',
        status: 'PENDING'
    },
    {
        id: '#MN-2050',
        menuName: 'Artisan Vegan Selection',
        caterer: { name: 'Green Leaf Co.', initial: 'G', indicatorColor: 'bg-emerald-400' },
        category: 'WEDDING',
        itemsCount: 28,
        submittedAt: '2025-10-14T14:15:00Z',
        status: 'PENDING'
    },
    {
        id: '#MN-2045',
        menuName: 'Kids Birthday Special',
        caterer: { name: 'Joyful Bites', initial: 'J', indicatorColor: 'bg-amber-400' },
        category: 'KIDS',
        itemsCount: 15,
        submittedAt: '2025-10-14T10:00:00Z',
        status: 'FLAGGED'
    },
    {
        id: '#MN-2040',
        menuName: 'Diwali Grand Feast',
        caterer: { name: 'Spice Route Services', initial: 'S', indicatorColor: 'bg-emerald-400' },
        category: 'FESTIVAL',
        itemsCount: 55,
        submittedAt: '2025-10-12T16:45:00Z',
        status: 'APPROVED'
    },
    {
        id: '#MN-2038',
        menuName: 'Executive Box Lunches',
        caterer: { name: 'QuickServe Meals', initial: 'Q', indicatorColor: 'bg-rose-400' },
        category: 'CORPORATE',
        itemsCount: 8,
        submittedAt: '2025-10-10T09:00:00Z',
        status: 'REJECTED'
    }
];

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

const MOCK_APPLICATIONS: PendingCaterer[] = [
    { appId: 'APP-1092', businessName: 'Gourmet Spaces', ownerName: 'Alice Chen', location: 'San Francisco, CA', experienceYears: 5, submittedDate: '2026-10-14', status: 'PENDING' },
    { appId: 'APP-1093', businessName: 'Fire Grill BBQ', logoUrl: 'https://i.pravatar.cc/150?u=grill', ownerName: 'Marcus Johnson', location: 'Austin, TX', experienceYears: 8, submittedDate: '2026-10-14', status: 'UNDER_REVIEW' },
    { appId: 'APP-1094', businessName: 'Sushi Master', ownerName: 'Kenji Sato', location: 'New York, NY', experienceYears: 12, submittedDate: '2026-10-15', status: 'ONBOARDED' },
    { appId: 'APP-1095', businessName: 'Vegan Delights', logoUrl: 'https://i.pravatar.cc/150?u=vegan', ownerName: 'Sarah Smith', location: 'Portland, OR', experienceYears: 3, submittedDate: '2026-10-16', status: 'PENDING' },
    { appId: 'APP-1096', businessName: 'Steakhouse Elite', ownerName: 'David Brown', location: 'Chicago, IL', experienceYears: 15, submittedDate: '2026-10-16', status: 'REJECTED' },
    { appId: 'APP-1097', businessName: 'Pasta Palace', ownerName: 'Maria Garcia', location: 'Miami, FL', experienceYears: 6, submittedDate: '2026-10-17', status: 'PENDING' },
];

const MOCK_COMPLAINTS: Complaint[] = [
    {
        id: '#CMP-9021',
        catererName: 'Gourmet Spaces Catering',
        customer: { name: 'Sarah Jenkins', initials: 'SJ', avatarUrl: 'https://i.pravatar.cc/150?u=sarah' },
        issue: { type: 'LATE_DELIVERY', description: 'Order arrived 45 mins late' },
        date: '2025-10-15T14:30:00Z',
        status: 'OPEN'
    },
    {
        id: '#CMP-9022',
        catererName: 'Elite Banquets',
        customer: { name: 'Michael Chen', initials: 'MC' },
        issue: { type: 'FOOD_QUALITY', description: 'Cold appetizers' },
        date: '2025-10-15T09:15:00Z',
        status: 'INVESTIGATING'
    },
    {
        id: '#CMP-9023',
        catererName: 'Spice Route Services',
        customer: { name: 'Anita Desai', initials: 'AD', avatarUrl: 'https://i.pravatar.cc/150?u=anita' },
        issue: { type: 'HYGIENE', description: 'Foreign object in main course' },
        date: '2025-10-14T19:45:00Z',
        status: 'ESCALATED'
    },
    {
        id: '#CMP-9024',
        catererName: 'Fresh Bites Corp',
        customer: { name: 'David Smith', initials: 'DS' },
        issue: { type: 'MISSING_ITEM', description: 'Beverages not delivered' },
        date: '2025-10-13T12:00:00Z',
        status: 'RESOLVED'
    },
    {
        id: '#CMP-9025',
        catererName: 'Gourmet Spaces Catering',
        customer: { name: 'Linda Rodriguez', initials: 'LR' },
        issue: { type: 'STAFF_BEHAVIOR', description: 'Rude serving staff' },
        date: '2025-10-12T18:20:00Z',
        status: 'OPEN'
    }
];

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [caterers, setCaterers] = useState<Caterer[]>(initialCaterers);
    const [blogPosts, setBlogPosts] = useState<BlogPostSubmission[]>(initialBlogPosts);
    const [menuSubmissions, setMenuSubmissions] = useState<MenuSubmission[]>(MOCK_SUBMISSIONS);
    const [offers, setOffers] = useState<OfferSubmission[]>(MOCK_OFFERS);
    const [catererApplications, setCatererApplications] = useState<PendingCaterer[]>(MOCK_APPLICATIONS);
    const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

    return (
        <MockDataContext.Provider value={{
            users, setUsers,
            caterers, setCaterers,
            blogPosts, setBlogPosts,
            menuSubmissions, setMenuSubmissions,
            offers, setOffers,
            catererApplications, setCatererApplications,
            complaints, setComplaints,
            performanceData: MOCK_PERFORMANCE_DATA,
            customerReviews: MOCK_CUSTOMER_REVIEWS
        }}>
            {children}
        </MockDataContext.Provider>
    );
};

export const useMockData = () => {
    const context = useContext(MockDataContext);
    if (context === undefined) {
        throw new Error('useMockData must be used within a MockDataProvider');
    }
    return context;
};
