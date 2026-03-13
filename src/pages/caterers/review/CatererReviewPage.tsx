import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../components/ThemeProvider';
import { ReviewPageHeader } from './ReviewPageHeader';
import { BusinessInfo } from './BusinessInfo';
import { KitchenSpecs } from './KitchenSpecs';
import { DocumentRepository } from './DocumentRepository';
import { KitchenGallery } from './KitchenGallery';
import { VerificationSidebar } from './VerificationSidebar';
import { ReviewApplication, VerificationState } from './types';

// Mock Data
const MOCK_APPLICATION: ReviewApplication = {
    appId: 'APP-1092',
    businessName: 'Gourmet Spaces Catering',
    ownerName: 'Alice Chen',
    experience: '5',
    capacity: '500+ Plates / Day',
    address: '142 Market St, Floor 2, San Francisco, CA 94103',
    documents: [
        { id: 'fssai', name: 'FSSAI License Record', size: '2.4 MB', url: '#' },
        { id: 'hygiene', name: 'Hygiene Rating Cert', size: '1.1 MB', url: '#' },
        { id: 'tax', name: 'Local Business Tax ID', size: '890 KB', url: '#' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
        'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800&q=80',
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80'
    ]
};

export const CatererReviewPage: React.FC = () => {
    const { appId } = useParams<{ appId: string }>();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [verificationState, setVerificationState] = useState<VerificationState>({
        checklist: {
            fssaiValidated: false,
            addressVerified: false,
            photosInspected: false,
            hygieneMet: false
        },
        remarks: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateChecklist = (key: keyof VerificationState['checklist'], value: boolean) => {
        setVerificationState(prev => ({
            ...prev,
            checklist: { ...prev.checklist, [key]: value }
        }));
    };

    const handleUpdateRemarks = (remarks: string) => {
        setVerificationState(prev => ({ ...prev, remarks }));
    };

    const handleDocumentView = (docId: string, url: string) => {
        console.log(`Opening document ${docId} from ${url}`);
        // Will mount a document viewing modal
    };

    const handleSubmitDecision = (decision: 'APPROVE' | 'REJECT') => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log(`Decision ${decision} recorded for ${appId}`, verificationState);
            setIsSubmitting(false);
            navigate('/admin/caterers/pending');
        }, 1500);
    };

    return (
        <div className={`relative min-h-full w-full p-6 lg:p-8 transition-colors duration-300
      ${isDark ? 'bg-[#050505]' : 'bg-[#E2E8F0]'}
    `}>
            {/* Dark Mode Ambient Overlay */}
            {isDark && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
                {/* Header */}
                <ReviewPageHeader appId={appId || MOCK_APPLICATION.appId} isDark={isDark} />

                <div className="flex flex-col lg:flex-row gap-6 mt-2 relative items-start">
                    {/* 2/3 Column: Details */}
                    <div className="w-full lg:w-2/3 flex flex-col shrink-0">
                        <BusinessInfo application={MOCK_APPLICATION} isDark={isDark} />
                        <KitchenSpecs application={MOCK_APPLICATION} isDark={isDark} />
                        <DocumentRepository documents={MOCK_APPLICATION.documents} onViewDocument={handleDocumentView} isDark={isDark} />
                        <KitchenGallery galleryUrls={MOCK_APPLICATION.gallery} isDark={isDark} />
                    </div>

                    {/* 1/3 Column: Sticky Sidebar Tool */}
                    <div className="w-full lg:w-1/3 shrink-0">
                        <VerificationSidebar
                            appId={appId || MOCK_APPLICATION.appId}
                            verificationState={verificationState}
                            onUpdateChecklist={handleUpdateChecklist}
                            onUpdateRemarks={handleUpdateRemarks}
                            onSubmitDecision={handleSubmitDecision}
                            isSubmitting={isSubmitting}
                            isDark={isDark}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
